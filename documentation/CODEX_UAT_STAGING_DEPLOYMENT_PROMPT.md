# Codex Prompt — Credential-Preserving AVNL UAT Deployment

Paste everything below into Codex on the authorized UAT deployment computer.

---

You are the deployment operator for the AVNL Drupal 11.4.5 handoff. Deploy and validate it on the existing UAT/staging environment only. Do not deploy to production.

## Non-negotiable safety rules

1. Do not change, reset, rotate, reveal, print, log, or replace any database credential, administrator password, TFA enrollment/seed/recovery code, SMTP credential, Drupal hash salt, API key, certificate, SSH credential, session/cookie setting, encryption key, or secret-store value.
2. Use and upgrade the existing UAT database in place. Do not import the packaged database during the normal deployment.
3. Do not change production, production DNS, production files, production databases, production caches, production services, or any resource shared with production.
4. Do not assume a hostname, filesystem path, database name, service name, document root, or release layout. Discover them from the current UAT system using read-only checks.
5. Stop if UAT cannot be positively distinguished from production or if any target resource is shared with production.
6. Never display secret values in terminal output or the final report.
7. Use an inactive versioned release and an atomic release switch. Preserve the previous release and a matched rollback set.
8. Do not run `composer update` on the server.
9. Do not disable CAPTCHA or TFA, and do not reset an account merely to make testing pass.
10. Stop after UAT deployment and QA. Production requires a separate written approval and fresh production backups.

## Preferred long-distance transfer

Pull the credential-preserving UAT deployment tag directly with Git. This tag contains the application source and deployment documentation but intentionally excludes the packaged database and packaged uploaded-content trees. That prevents a routine code deployment from replacing the existing UAT database or user files. Git verifies transferred objects cryptographically and makes a failed fetch safely retryable.

```bash
cd "DOWNLOAD_DIRECTORY"
mkdir -p avnl-drupal-11.4.5-uat-deployment
cd avnl-drupal-11.4.5-uat-deployment
git init
git remote add origin https://github.com/MohammedMaheer/avnl-drupal-11-4-4-handoff.git
git fetch --depth 1 origin tag avnl-drupal-11.4.5-uat-deployment-2026-08-26
git checkout --detach FETCH_HEAD
git rev-parse --verify HEAD
git fsck --full
```

Confirm that all four protected payload paths are absent from this deployment tag:

```bash
test ! -e database
test ! -e files
test ! -e source/files
test ! -e source/sites/default/files
```

If the clone or fetch is interrupted, retain the partial Git directory and retry the fetch for the same tag. Do not switch to an unpinned branch. Stop if `git fsck` or any protected-path test fails.

If GitHub is blocked, transfer the prepared deployment folder from an authorized computer with resumable SSH:

```bash
rsync -azP --partial --append-verify \
  LOCAL_DEPLOYMENT_PACKAGE_ROOT/ \
  AUTHORIZED_UAT_USER@UAT_HOST:AUTHORIZED_UPLOAD_DIRECTORY/
```

Do not place any transfer package or database under a publicly served directory. The full handoff, database snapshot and uploaded-content copy remain available only for reference and disaster recovery; they are not normal UAT deployment inputs.

## Execution procedure

### 1. Read the handoff instructions

Use or move the verified cloned folder into a new inactive release parent. Do not copy over the live UAT tree.

Set these values from discovered UAT facts:

```bash
export PACKAGE_ROOT="DISCOVERED_CLONED_UAT_DEPLOYMENT_DIRECTORY"
export NEW_DRUPAL_ROOT="$PACKAGE_ROOT/source"
export CURRENT_DRUPAL_ROOT="DISCOVERED_CURRENT_UAT_DRUPAL_ROOT"
export PHP_BIN="DISCOVERED_APPROVED_PHP_CLI"
```

Read completely before changing UAT:

- `00_READ_ME_FIRST.md`, if supplied with the folder;
- `README.md`;
- `SECURITY.md`;
- `documentation/DEPLOYMENT.md`;
- `documentation/UAT_DEPLOYMENT_PACKAGE.md`;
- `documentation/CREDENTIAL_PRESERVATION.md`;
- `documentation/ROLLBACK.md`;
- `documentation/TEST_REPORT.md`;
- `documentation/SOW_TRACEABILITY_MATRIX.md`.

Verify the Git deployment package:

```bash
cd "$PACKAGE_ROOT"
git fsck --full
test ! -e database
test ! -e files
test ! -e source/files
test ! -e source/sites/default/files
composer --working-dir=source validate --no-check-publish
composer --working-dir=source audit --no-interaction
```

Stop on any Git-integrity failure, unexpected protected payload, or security advisory. Do not run the complete handoff's root checksum manifest against the reduced deployment tag.

### 2. Discover and record UAT

Using read-only checks, determine and record:

- current UAT hostname and document root;
- current Drupal version and release identifier;
- current PHP/Drush entry points and web-service identity;
- existing UAT database and database engine/version, without printing credentials;
- public/private files and configuration-sync paths;
- current release-pointer mechanism;
- UAT-only PHP/web/database/cache services;
- disk space;
- current database-update, configuration and requirements status.

Run the current site's Drush status commands using its approved PHP executable. Positively confirm all discovered resources are UAT-only.

### 3. Create a matched rollback set

Before changing UAT, create a new timestamped protected backup containing:

- current UAT source;
- current UAT database dump;
- public files;
- private files;
- active configuration export;
- `settings.php`, `services.yml`, local settings and non-secret environment definitions;
- current secret-store/runtime configuration references;
- cron, web/PHP configuration and release pointer.

Verify the database gzip and list every archive. Do not overwrite the previous known-good rollback set.

### 4. Install the locked inactive release

```bash
cd "$NEW_DRUPAL_ROOT"
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
composer validate --no-check-publish
composer audit --no-interaction
```

Do not run `composer update`.

### 5. Preserve all UAT runtime credentials automatically

Run this before configuration import, database updates or traffic switching:

```bash
"$NEW_DRUPAL_ROOT/scripts/preserve-uat-runtime.sh" \
  "$CURRENT_DRUPAL_ROOT" \
  "$NEW_DRUPAL_ROOT"
```

The command must capture the active UAT database connection, Drupal hash salt, trusted hosts, file/configuration paths, approved proxy settings, current session-cookie domain, SMTP configuration and resolved AVNL/TFA encryption key without displaying them. It must write the protected payload outside the document root and create only a non-secret locator inside the new release.

Verify through the new release:

```bash
"$PHP_BIN" -d memory_limit=1G "$NEW_DRUPAL_ROOT/vendor/bin/drush.php" \
  --root="$NEW_DRUPAL_ROOT" \
  php:script scripts/verify-uat-runtime.php
```

Every check must report `PASS`. If capture or verification fails, stop and leave the current UAT release active.

### 6. Preserve UAT uploads and configuration

Merge current UAT public files into the new public-files directory without `--delete`. Keep private files outside the public document root. Confirm the new PHP/web-service identity can write public files and read private files and the protected runtime payload.

Export active UAT configuration to the rollback set and review the differences against the supplied configuration. Confirm UAT-specific mail, integrations, paths, trusted hosts, cookie settings, roles, workflows, consent and security settings are intentionally preserved or reconciled.

### 7. Enable UAT maintenance mode and switch atomically

Enable maintenance mode on UAT only and rebuild the current UAT cache. Activate the inactive release with the platform's existing atomic symlink/release-pointer method. Do not overwrite or delete the known-good release.

Retain the generated `sites/default/avnl.runtime-locator.php` in the activated release.

### 8. Apply Drupal updates

From the activated new Drupal root:

```bash
cd "$NEW_DRUPAL_ROOT"
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php updatedb -y
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php updatedb:status
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php config:status
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php config:import -y
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php cache:rebuild
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php cron
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php status
"$PHP_BIN" -d memory_limit=1G vendor/bin/drush.php core:requirements --severity=1
```

Required result: Drupal 11.4.5, successful database bootstrap, no pending database update, no unexplained configuration drift and no severity-1 requirements error.

### 9. Apply secure permissions and clear UAT-only caches

Make `sites/default/settings.php` and `sites/default/services.yml` readable by PHP but non-writable by the web-service identity. Protect `sites/default`, the locator, private files and the runtime-secret payload. Never use `777`.

Rebuild Drupal caches, clear generated CSS/JavaScript and clear only UAT-specific reverse-proxy/OPcache layers through the platform's approved mechanism. Do not restart or flush a service shared with production.

### 10. Complete QA

Keep maintenance mode enabled while testing:

- Drupal version, database updates, configuration status and requirements;
- homepage, login, search, sitemap and robots;
- existing administrator login and existing TFA without reset/re-enrollment;
- English/Hindi routes, navigation, breadcrumbs and responsive layouts;
- CSS, JavaScript, images, fonts, documents and downloads;
- news, notices, tenders, careers, products, units, archives and galleries;
- enquiry, feedback, contact, authentication and CAPTCHA forms;
- SMTP using the existing protected credential;
- creator/publisher roles, moderation, media/uploads, aliases and menus;
- cron, search indexing, consent and trusted hosts;
- local `js-cookie`, History-disabled state and security headers;
- recent Drupal/PHP/database/web logs and browser console;
- accessibility smoke checks.

Do not reset credentials or bypass CAPTCHA/TFA to pass QA.

### 11. Release UAT and stop

If every critical check passes, rebuild caches, disable UAT maintenance mode, rebuild caches again, and verify the homepage/login anonymously plus administrator login/TFA one final time. Leave UAT online for AVNL review and stop. Do not promote to production.

If a critical check fails, restore the previous release and, when database/configuration updates ran, restore the matching database, configuration and affected files as one set. Never perform a source-only rollback after incompatible database updates.

### 12. Produce the deployment report

Report:

- old/new release and Drupal versions;
- verified Git tag and commit;
- backup identifiers and verification;
- runtime-preservation result without values;
- database/configuration/cache/permissions results;
- QA items as `PASS`, `FAIL`, or `MANUAL VALIDATION REQUIRED`;
- errors and rollback status;
- confirmation that all UAT credentials/TFA settings were unchanged;
- confirmation that production was untouched.

Continue until UAT is either fully deployed and tested or safely restored. Do not claim success without evidence.

---
