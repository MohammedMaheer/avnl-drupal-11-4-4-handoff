# Drupal 11.4.5 Status Remediation and Final QA

Date: 24 August 2026  
Environment: dedicated Hostinger AVNL preview  
Production impact: none

## Outcome

The preview was upgraded from Drupal 11.4.4 to 11.4.5 and the reported status findings were remediated. The final Drupal requirements command returned an empty warning/error set. Maintenance mode is disabled and the release remains available for AVNL staging acceptance.

## Changes completed

- Updated `drupal/core`, `drupal/core-recommended`, Composer scaffold, and project message to 11.4.5.
- Updated Admin Audit Trail to 1.0.12 and ran its database updates.
- Updated Session Limit to Drupal 11-compatible 3.0.0 after reviewing the 2.x/3.x code differences.
- Uninstalled deprecated core History; final state is disabled and exported configuration matches active configuration.
- Installed JS Cookie 3.0.5 locally at `libraries/js-cookie/dist/js.cookie.min.js`; Drupal no longer needs the CDN fallback for this library.
- Protected `sites/default/services.yml`; the PHP web account confirmed it is non-writable.
- Set MariaDB transaction isolation to `READ-COMMITTED` and made the setting persistent in the tested container definition.
- Installed and enabled APCu 5.1.28 and PECL upload-progress 2.0.2.
- Configured Argon2id for new/rehashed passwords; existing compatible hashes remain valid and upgrade after successful authentication.
- Set Drupal's HTML5 validation compatibility switch to `FALSE` for Drupal 12 behavior testing. Rendered forms carry `novalidate`; Drupal server-side validation remains authoritative.
- Refreshed update metadata and confirmed all installed projects are current for their Drupal-compatible release lines.
- Checked 44 Hindi translation projects; 30 available translation files were imported, adding 126 and updating 2,873 strings.
- Completed the search index to 100% with zero remaining items.
- Rebuilt caches, ran cron, and confirmed no pending database updates or configuration drift.

## Translation exceptions

Upstream Hindi files were not available for several projects, including selected jQuery UI integrations, JS Cookie, and Twig Tweak. Drupal safely skipped two malformed strings in the upstream Drupal core Hindi file. These are upstream content limitations, not application failures, and do not create a Drupal warning/error requirement.

## Final verification

| Check | Result |
|---|---|
| Drupal core | 11.4.5 |
| Bootstrap/database | Successful/connected |
| Pending database updates | None |
| Configuration drift | None |
| Requirements warnings/errors | None |
| Composer advisories | None reported |
| Search index | 100% |
| Homepage/login/search/sitemap/robots | HTTP 200 |
| Browser console on homepage/login | No errors observed |
| Local JS Cookie requirement | Passed |
| APCu/upload progress | Loaded |
| Database isolation | `READ-COMMITTED` |
| Configuration files | Non-writable by web account |
| New runtime errors after final QA | Zero |

## Data totals in the delivered database

| Item | Count |
|---|---:|
| Database tables | 359 |
| Nodes | 440 |
| Content translation rows | 730 |
| Published rows | 515 |
| Users | 75 |
| Active users | 4 |
| Media entities | 70 |
| Managed files | 1,414 |
| Path aliases | 707 |

The packaged database contains sensitive user/content state, including user records and password hashes. Before packaging, active sessions, TFA seeds/recovery data, SMTP credentials, encryption-key material, runtime caches/logs, and configuration-audit snapshots containing historical secrets were removed. A fresh restore confirmed 359 tables, 730 content-translation rows, 75 users, 1,414 managed files, zero TFA user-data rows, and zero sessions. The database is supplied for authorized isolated restoration/full-clone testing and must not be placed under a public document root or in a public repository.

## Backups

Verified pre-change and post-change database/runtime backup sets were created on the preview host. The delivered database export is the verified post-change snapshot. Production was neither accessed nor modified.
