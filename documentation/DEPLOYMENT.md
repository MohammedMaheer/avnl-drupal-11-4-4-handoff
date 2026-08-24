# Deployment Runbook

This release must be rehearsed and accepted on staging before any production cutover. Source, database, public files, private files, and environment configuration form one release set and must be backed up and rolled back together.

## 1. Preflight

1. Read `UPGRADE_REPORT.md`, `03_MODULE_REPLACEMENT_APPROVALS.md`, `08_TEST_REPORT.md`, and `09_FINAL_PACKAGE_VALIDATION.md`.
2. Positively identify the staging hostname, document root, database, public/private file paths, and release directory. Stop if staging and production cannot be distinguished.
3. Verify PHP 8.3 or later, Composer 2, required PHP extensions, MySQL 8 or a compatible MariaDB release, HTTPS, and at least 1 GB of available PHP CLI memory for deployment commands.
4. Verify the package and database checksums before extraction or import.
5. Obtain the documented module/patch approvals before production. Approval may remain a staging acceptance item during rehearsal.

## 2. Back up staging

Create timestamped, restorable backups of the current staging source, database, public files, private files, `settings.php`, any local settings file, environment configuration, and relevant web-server configuration. Verify that each backup is readable. Never overwrite the last known-good release.

## 3. Preserve staging secrets

Staging deployment must preserve existing credential and secret values exactly. Do not rotate, regenerate, reveal, or replace database credentials, API keys, certificates, SSH keys, hash salt, or administrator passwords during the rehearsal. `.env.example` is a variable-name reference only and must never overwrite real values.

If the receiving environment does not already provide the required `AVNL_*` variables, stop and have the authorized infrastructure owner map the existing values into the protected environment or secret store. Do not write secrets into the release tree or command history.

Any production credential or historical TLS-key rotation is a separately approved security operation. It is not part of the staging source replacement.

## 4. Deploy source and files

1. Enable maintenance mode on staging only.
2. Extract into a new release directory; do not extract directly over the active document root.
3. Deploy `source/` while preserving staging-only secret configuration.
4. Merge public files without deleting newer staging uploads. Keep private files outside the public document root.
5. Apply the server's existing least-privilege ownership and permission policy. Do not use `777`.
6. Install exactly the locked production dependencies:

   ```bash
   composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
   ```

   Do not run `composer update`. Confirm that the locked Klaro patch is applied.

## 5. Deploy database

For the staging handoff rehearsal, import `database/avnl_drupal11_4_4_final_2026-08-24.sql.gz` into the backed-up staging database using the environment's protected connection method. Do not put credentials in commands or logs.

For a later production cutover, do not reuse an old staging database. Upgrade a fresh production database clone during the approved maintenance window and preserve its matching deployment-time backup.

## 6. Run Drupal deployment commands

The supplied Views configuration exceeds a 128 MB CLI memory limit during some rebuild/update operations. Use the tested 1 GB CLI profile for deployment commands without changing the web runtime memory limit:

```bash
php -d memory_limit=1G vendor/bin/drush.php updatedb -y
php -d memory_limit=1G vendor/bin/drush.php config:import -y
php -d memory_limit=1G vendor/bin/drush.php cache:rebuild
php -d memory_limit=1G vendor/bin/drush.php updatedb:status
php -d memory_limit=1G vendor/bin/drush.php config:status
php -d memory_limit=1G vendor/bin/drush.php status
```

Required results: Drupal 11.4.4, successful bootstrap and database connection, no pending updates, and no unexplained configuration differences.

## 7. Clear staging-only caches

Rebuild Drupal caches after source deployment, database import, and configuration import. Clear aggregated staging CSS/JavaScript and any staging-only reverse-proxy or application cache. Do not flush Redis, Memcached, Varnish, CDN, PHP OPcache, or another service unless it is confirmed to be isolated from production. Never restart a service shared with production.

## 8. Quality assurance

Execute the complete staging matrix in `08_TEST_REPORT.md` and `TRAINING_GUIDE.md`, including anonymous pages, existing administrator login, every editorial role, moderation, media/file operations, multilingual publishing, search, archives, galleries, forms, mail, TFA, CAPTCHA, cron, external services, mobile layouts, accessibility, logs, and security headers.

Review the 41 pre-existing unresolved managed-file references recorded in `04_DATA_INTEGRITY_REPORT.md`. Confirm with content owners whether the affected records are stale, unpublished, or require source files from an external archive.

## 9. Complete staging deployment

Disable staging maintenance mode only after smoke checks pass. Rebuild caches once more, verify the homepage and login page, review PHP/web/Drupal logs, and leave staging available for AVNL UAT. Stop before production. Production requires separate written approval after UAT, compliance/security sign-off, verified rollback rehearsal, and change authorization.

## 10. Failure handling

On a critical failure, stop; restore the previous source and its matching database backup; restore environment-specific configuration and affected files; rebuild caches; and verify the previous staging site. Follow `ROLLBACK.md`. Never use production as a troubleshooting target.
