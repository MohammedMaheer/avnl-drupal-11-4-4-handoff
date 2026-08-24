# Hostinger Staging Deployment Report

## Deployment status

The Drupal 11.4.5 handoff was deployed to the dedicated AVNL preview stack at:

- `https://drupal.187-127-162-233.sslip.io/`

Production at `https://avnl.co.in/` was not changed. Existing Hostinger database credentials and the existing Drupal hash salt were preserved; values are stored only in the protected runtime environment file and are not recorded in this handoff.

> **QA addendum, 24 August 2026:** The deeper-QA findings were remediated and retested. CAPTCHA, Hindi routing, the recruitment alias, the archive PDF link, accessibility alternatives, and managed-file integrity now pass. Staging is ready for client UAT; production remains subject to explicit approval and a fresh production data/files snapshot when exact current-content parity is required. See `HOSTINGER_STAGING_QA_2026-08-24.md`.

## Final runtime

- Drupal 11.4.5
- PHP 8.5.9
- MariaDB 11.4
- Drush 13.7.6
- Block Class 4.0.2
- CAPTCHA 2.0.10

## Deployment corrections

- Removed a duplicate obsolete `captcha_2_0_9` source directory that caused Drupal to select the wrong project version.
- Updated Block Class from unsupported 2.0.12 to the supported 4.0.2 upgrade path for sites coming from 2.x.
- Applied the pending `node.field_products_inner_image` field-storage definition update while retaining all 45 field records.
- Installed Drupal's complete private-files `.htaccess` protection and corrected public readability of `robots.txt`.
- Rebuilt caches and refreshed Drupal's project/update metadata.
- Rebuilt CAPTCHA font configuration for 2.0.10 and enabled the Hindi `/hi` prefix.
- Corrected the recruitment alias, archive PDF URL, logo/flag alternatives, and four published-content file gaps.
- Removed 41 verified-unreferenced stale file entities after a fresh rollback backup.

## Verified final state

- Drupal bootstrap and database connection: successful
- Pending database updates: none
- Configuration differences: none
- Maintenance mode: disabled
- Drupal requirements errors: none
- Composer security advisories: none
- Runtime errors recorded after cutover: none
- HTTPS and HTTP-to-HTTPS redirect: working
- Homepage, primary content routes, login/password forms, PDF delivery, and `robots.txt`: working
- CAPTCHA image generation/refresh and English/Hindi routes: working
- Managed-file audit: 1,414 records, zero missing managed public/private files
- The application port is bound only to localhost and is exposed through the existing Nginx HTTPS proxy.

The supplied database is a validated upgrade snapshot, not a live production database export. Therefore, staging does not contain production content added after the snapshot, including newer 2026 notices and menu changes. A fresh production database/files synchronization is required during a separately approved production cutover if exact current-content parity is required.

## Rollback backups on Hostinger

- Full pre-upgrade rollback set: `/opt/avnl-drupal-preview/backups/pre-full-upgrade-20260823T085801Z`
- Pre-Block-Class database backup: `/opt/avnl-drupal-preview/backups/pre-block-class-4-upgrade-20260823T0950Z`
- Pre-remediation database/runtime backup: `/opt/avnl-drupal-preview/backups/pre-remediation-20260824`

Both backup sets were integrity checked. Do not use them on production without first confirming the intended target database and document root.
