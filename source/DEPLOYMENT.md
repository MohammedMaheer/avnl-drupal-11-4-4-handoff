# Staging-First Deployment Runbook

This runbook deploys the AVNL Drupal 11.4.5 handoff to an existing staging environment without rotating or exposing credentials. Stop after staging QA. Production requires a separate approval and fresh backup set.

## 1. Confirm the target

1. Positively identify the staging hostname, document root, database, public/private file paths, release path, web/PHP service, and configuration-sync path.
2. Confirm that none of those resources are shared with production.
3. Record the currently deployed Drupal version and release identifier.
4. Stop immediately if staging and production cannot be distinguished.

## 2. Verify prerequisites

- PHP 8.3 or later with the extensions required by Drupal; APCu and upload-progress are recommended and included in the tested container template.
- Composer 2 and at least 1 GB CLI memory for deployment operations.
- MySQL 8 or compatible MariaDB with transaction isolation set to `READ-COMMITTED`.
- HTTPS, trusted-host configuration, writable public/private files, and non-writable PHP/YAML configuration files.
- Sufficient disk space for the new release plus two complete rollback sets.

Verify `CHECKSUMS.md`, test the database gzip stream, and run Composer validation before deployment.

## 3. Create a matched rollback set

Back up the current staging source, database, public files, private files, configuration sync, `settings.php`, `services.yml`, local settings, environment/secret configuration, scheduled jobs, PHP configuration, and web-server configuration. Verify that the database dump can be read and the file archives can be listed. Do not overwrite the last known-good release.

## 4. Extract the inactive release and preserve credentials

Do not rotate, replace, print, or copy into the release tree any database credential, administrator password, TFA seed/recovery code, Drupal hash salt, SMTP credential, API key, certificate, SSH key, cookie domain, or trusted-host value.

Extract `source/` into a new versioned release directory but do not switch traffic. Keep the target's existing protected environment or secret-store values. Treat `source/.env.example` only as a variable-name reference. Preserve approved staging-specific settings without copying a preview-specific `settings.local.php` onto an unrelated target.

From an account authorized to read the current Drupal settings and write the new release, run:

```bash
NEW_RELEASE_ROOT/scripts/preserve-uat-runtime.sh CURRENT_DRUPAL_ROOT NEW_RELEASE_ROOT
```

This securely captures the current database connection, hash salt, host/path/proxy settings, cookie domain, SMTP configuration, and resolved AVNL/TFA encryption key into the existing private-files area (outside the document root) and creates a non-secret locator in the new release. It does not print values or modify the active site. Confirm the protected file is mode `0640` or stricter and readable by the new release's PHP service identity.

If the platform already provides `AVNL_SMTP_USERNAME`, `AVNL_SMTP_PASSWORD`, `AVNL_ENCRYPTION_KEY`, database variables, and hash salt through a protected secret store, those values take precedence and may be retained unchanged. Do not generate a replacement encryption key during a credential-preserving deployment.

Before database updates, configuration import, or traffic switching, bootstrap the inactive release and verify:

```bash
php -d memory_limit=1G NEW_RELEASE_ROOT/vendor/bin/drush.php \
  --root=NEW_RELEASE_ROOT php:script scripts/verify-uat-runtime.php
```

All checks must pass. If capture or verification fails, stop and keep the current release active.

## 5. Choose the database mode

### Mode A — Existing staging database (default and credential-preserving)

Keep the existing staging database. This preserves administrator users, password hashes, TFA enrollment, staging content, SMTP state, and environment-specific runtime data. Deploy the new source, run Drupal updates, review configuration differences, and import approved configuration.

### Mode B — Full preview clone (explicit authorization required)

Import `database/avnl_drupal11_4_5_final_2026-08-24.sql.gz` only when the authorized owner has requested a full clone or isolated restore. Importing replaces the target database contents, including users, password hashes, content, and configuration. For security, the delivered copy contains no active sessions, copied TFA seeds/recovery data, SMTP credentials, or encryption-key material. Configure protected environment secrets and enroll authorized administrators in TFA after the isolated restore. Never use this preview database as a production database.

Do not combine parts of two databases. For production, upgrade a fresh authorized production clone during the approved maintenance window instead of importing this staging snapshot.

## 6. Deploy source atomically

1. Enable maintenance mode on staging only.
2. Use the already extracted and runtime-verified release from section 4; do not overwrite the active document root.
3. Retain the generated runtime locator and protected-file access established in section 4. Do not copy secret values into tracked source files.
4. Merge `source/files/` with staging public files without deleting newer target uploads.
5. Deploy private files outside the public document root.
6. Install exactly the locked production dependencies:

   ```bash
   composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
   composer validate --no-check-publish
   composer audit --no-interaction
   ```

7. Do not run `composer update` on the target.
8. Set `sites/default/services.yml` and `sites/default/settings.php` readable by PHP but non-writable by the web-service account. Never use permission `777`.
9. Switch the staging release pointer only after preflight validation succeeds.

## 7. Apply Drupal updates and configuration

Use the target's normal PHP/Drush entry point. The tested sequence is:

```bash
php -d memory_limit=1G vendor/bin/drush.php updatedb -y
php -d memory_limit=1G vendor/bin/drush.php updatedb:status
php -d memory_limit=1G vendor/bin/drush.php config:status
php -d memory_limit=1G vendor/bin/drush.php config:import -y
php -d memory_limit=1G vendor/bin/drush.php cache:rebuild
php -d memory_limit=1G vendor/bin/drush.php cron
php -d memory_limit=1G vendor/bin/drush.php status
php -d memory_limit=1G vendor/bin/drush.php core:requirements --severity=1
```

Before configuration import, export the target's active configuration and review the diff. Confirm that approved staging-only mail, trusted-host, integration, consent, security, and role settings are preserved by protected overrides or explicitly reconciled.

Required results are Drupal 11.4.5, successful bootstrap/database connection, no pending database updates, no unexplained configuration differences, and no Drupal status warnings.

## 8. Clear only staging caches

Rebuild Drupal caches after source deployment, database work, and configuration import. Clear generated CSS/JavaScript and any staging-only reverse-proxy cache. Restart PHP/Apache only if isolated to staging and required to activate PHP extensions or OPcache changes. Never flush or restart a service shared with production.

## 9. Staging QA

Verify at minimum:

- Homepage, login, search, sitemap, robots, English/Hindi routes, navigation, assets, downloads, archives, galleries, and responsive layouts.
- Existing administrator login and TFA; do not reset credentials merely to perform deployment.
- Creator/publisher roles, moderation, media/files, aliases, menus, forms, CAPTCHA, SMTP, consent, cron, search indexing, and translation status.
- Database updates, configuration status, filesystem permissions, local `js-cookie`, APCu, upload progress, transaction isolation, password hashing, trusted hosts, security headers, and recent logs.
- Composer audit and Drupal update status.
- Browser console, broken resources, server errors, and accessibility smoke checks.

Record results and unresolved acceptance items. Do not solve or bypass CAPTCHA outside an approved test case.

## 10. Complete staging only

Disable maintenance mode only after smoke tests pass, rebuild caches once more, and verify the homepage and login page anonymously. Leave staging available for AVNL UAT and stop. Do not deploy to production until AVNL provides explicit written approval after UAT, security/compliance review, rollback rehearsal, and a fresh production database/files backup.

## 11. Failure handling

On a critical failure, stop the deployment and follow `ROLLBACK.md`. Restore the previous source, matching database backup, configuration, and affected files together. Do not attempt a code-only rollback after database updates, and never use production as a troubleshooting target.
