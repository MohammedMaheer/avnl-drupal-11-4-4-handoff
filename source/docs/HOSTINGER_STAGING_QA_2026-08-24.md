# Hostinger Staging QA and Remediation Report — 24 August 2026

## Decision

**READY FOR USER ACCEPTANCE TESTING ON STAGING. NOT YET APPROVED FOR PRODUCTION PROMOTION.**

The confirmed staging defects were remediated and retested. Drupal, the upgraded database, exported configuration, HTTPS proxy, English and Hindi public routes, CAPTCHA, search, managed files, and static assets are operational. No existing credentials, hash salt, production system, or production data were changed.

Production promotion remains gated by an authorized administrator acceptance test and by a fresh, matching production database/files snapshot if exact current-content parity is required. No authorized production database or filesystem access was available. The upgraded database therefore remains based on the supplied 20 August 2026 staging export plus the remediation changes documented below. Public-site scraping is not a safe replacement for a transactional database and matching files export.

## Resolved findings

### Image CAPTCHA

- Root cause was stale font hashes and preview paths for a removed duplicate CAPTCHA 2.0.9 directory.
- The font map and selected fonts were rebuilt for the installed CAPTCHA 2.0.10 paths, configuration was exported, and caches were rebuilt.
- `/user/login` now renders an image CAPTCHA. The generator returns HTTP 200 with `image/jpeg`, and the browser refresh control works without adding a Drupal error.

### Hindi URL negotiation

- Added and exported the `hi: hi` path prefix.
- `/hi` and `/hi/hamaarae-baarae-maen` now return HTTP 200 and render Hindi content.

### Recruitment alias

- The English recruitment alias was moved from unpublished node 726 to published node 810.
- `/hiring-professionals-fixed-term-contract-basis-avnl-ambarnath-mpf` now returns HTTP 200.

### PDF link and image alternatives

- The archive EOI link was changed to the valid absolute public-files path and returns HTTP 200.
- Descriptive alternative text was added to the AVNL logo and Indian national flag.

### Managed-file integrity

- A cross-entity scan showed that only four missing files were attached to published content. Matching originals or equivalent duplicate versions were recovered from the supplied backup.
- All four restored resources return HTTP 200 with the expected PDF/JPEG/PNG MIME type.
- Forty-one missing, unreferenced migration leftovers were removed from the file-entity table after a fresh backup. These included three obsolete temporary/security-test entries.
- Final result: 1,414 managed-file records and zero missing managed public/private files.

## Remaining observations

- Seven inline SVG rectangles reuse the ID `Bounding box`; unique IDs are recommended when that legacy SVG markup is next edited.
- `/core/install.php` returns the safe `Drupal already installed` screen. Proxy-level blocking remains optional defense in depth.
- The host has limited memory headroom and no swap; production sizing and monitoring should account for this.
- Exact current-production content parity cannot be certified until an authorized fresh production database dump and matching public/private files snapshot are supplied.

## Passed checks

### Drupal, database, and configuration

- Drupal 11.4.5 and PHP 8.5.9 bootstrap successfully.
- Both Drupal and MariaDB containers are running; MariaDB reports healthy.
- The initial remediation validated all 360 tables. The final Drupal 11.4.5 snapshot contains 359 after cleanly uninstalling deprecated History; a fresh restore confirmed the final totals.
- No pending database updates, no configuration drift, and maintenance mode is disabled.
- Drupal requirements report contains no error-severity items.
- 440 node entities, 515 published node-language rows, 70 media entities, 1,414 managed-file records, and 707 aliases are present.

### Dependencies and source

- Composer metadata is valid. Exact Drupal 11.4.5 constraints produce expected schema-advice warnings only.
- Composer reports no known security advisories.
- Custom PHP syntax checks and platform requirement checks passed in the original package validation.
- No deployable private keys, SQL dumps, DDEV settings, or credential artifacts are present in public source paths.
- Existing Hostinger credentials and hash salt were preserved and were not printed or copied into documentation.

### HTTP, TLS, browser, and load

- HTTP redirects to HTTPS; TLS hostname verification passes.
- HSTS, CSP, frame, MIME-sniffing, referrer, and permissions-policy headers are present.
- TRACE, PUT, and DELETE are rejected.
- Search, feedback, login, password-reset, English content, and Hindi content pages render.
- Login CAPTCHA generation and refresh pass interactive browser QA.
- AVNL logo and Indian national flag have descriptive alternatives.
- Post-remediation full crawl: 238/238 navigable pages and 1,191/1,191 generated resource/alternate references returned HTTP 200; no broken pages, broken assets, mixed content, or crawl-limit truncation was found.
- Post-remediation smoke test at concurrency five: 50/50 returned HTTP 200, average 0.075 seconds, maximum 0.438 seconds.
- No new error-or-worse Drupal log entries were recorded after the remediation test marker.

### Backup and export

- A pre-remediation database and runtime/configuration backup was created at `/opt/avnl-drupal-preview/backups/pre-remediation-20260824` and verified before changes.
- The final staging database export passed gzip integrity and SHA-256 verification before packaging.
- Delivered database SHA-256: `7e1239a114e7d7a18657c024d703403e33c269bcc176cb33b499dd613362d97e`.

## Manual acceptance tests required before production

- Successful administrator login using an existing authorized account and CAPTCHA.
- Authenticated administration pages, content edit/save, media upload, cache clear, and logout.
- Feedback submission and delivery confirmation using an approved test recipient.
- SMTP delivery, password-reset email, and any third-party integrations.
- Hindi navigation/content review by a Hindi-speaking content owner.
- Mobile-device visual review on physical iOS and Android devices.
- Content-owner comparison against a fresh authorized production database/files snapshot.

Production must not be promoted until the client reviews staging and explicitly approves the production change window.
