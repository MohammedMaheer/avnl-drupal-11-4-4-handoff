# Final Package Validation Report

Validation date: 2026-08-24

## Acceptance baseline

The supplied five-page SOW was rendered and reviewed. This audit covers the handoff package's code, database, documentation, recoverability, local application behavior, and traceability. It does not replace AVNL UAT, formal accessibility/GIGW certification, penetration testing, production load testing, training attendance, contractual warranty activation, or production approval.

## Passed gates

- ZIP structure and compressed-data integrity.
- Database gzip integrity and documented SHA-256 checksum.
- Composer JSON/lock validity, dry-run install, and advisory audit.
- Exact Drupal core 11.4.5 and Drush 13.7.6 lock resolution.
- Custom PHP syntax and fresh Upgrade Status analysis with no Drupal 11 API blockers.
- Drupal-aware PHPStan level 5 completed with no custom-module errors after final legacy-code remediation.
- Fresh import of the delivered SQL into a new empty MariaDB database.
- Drupal bootstrap/database connection, cache rebuild, no pending updates, and no configuration differences on that fresh restore.
- Final sanitized-database restore: 359 tables, 730 content-translation rows, 75 users, 1,414 managed files, zero active sessions, and zero copied TFA user-data rows.
- Exported SMTP credentials and Drupal/TFA encryption-key material were removed; the fresh restore booted successfully using protected environment injection and matched the delivered configuration sync exactly.
- Critical data totals: 730 content translations, 515 published rows, 75 users, 4 active users, 70 media items, 1,414 clean managed-file records, and 707 aliases.
- Managed-file integrity: zero missing managed public/private files after restoring four published-content assets and deleting 41 verified-unreferenced stale records.
- Hostinger staging: CAPTCHA generation/refresh, Hindi `/hi` routing, recruitment alias, archive PDF link, image alternatives, database table checks, and concurrent smoke testing passed.
- Password-history verification: 11 one-way hashes and nine empty historical rows; no plaintext values.
- HTTP 200 and clean response bodies for homepage, login, archives, search, and sitemap.
- Desktop and 390 × 844 mobile rendering, semantic landmarks, H1, skip link, mobile controls, no horizontal overflow, and no browser-console errors.
- Cache/security response headers, including Dynamic Page Cache hit and enforced CSP.
- Sensitive-name/content scan and removal of the unnecessary DDEV-only settings override.
- Full project/config secret scan found no runtime secret file, SSH/private key, plaintext administrator/database password, SMTP secret, or Drupal/TFA encryption-key material outside the intentionally sensitive password-hash/content database scope. Upstream Drush/geolocation examples contain publicly shipped key-shaped placeholder literals, and EVA contains a 33-byte test-selector `.env`; none is target credential material.
- Existing UAT secrets no longer require manual recovery: the target-side preservation script captures current values into protected storage without displaying them, the new settings layer loads them through a non-secret locator, and explicit secret-store environment variables take precedence.
- No generic source file forces `staging.avnl.org`, the preview IP, or preview reverse-proxy ranges. Preview-only proxy configuration is isolated under `deployment/hostinger-preview/`.
- All 3,411 synchronized YAML files parsed and all three distributed configuration directories are byte-identical.
- SOW traceability and named compatibility, security-audit, deployment, rollback, administrator, training, and support materials.

## Remaining acceptance constraints

- Retained patched/pre-release projects require documented approval and targeted functional UAT.
- Authenticated/editorial roles, SMTP, TFA, form delivery, uploads, multilingual moderation, external services, full browser matrix, assistive technology, penetration testing, and production-scale load testing require authorized client UAT.
- Exact current-content parity requires a fresh authorized production database dump and matching public/private files snapshot.
- Deployment commands must use the documented 1 GB PHP CLI memory profile; 128 MB is insufficient for some Views rebuild operations.
- The runtime-preservation command must be executed and verified on the real existing UAT target before configuration import; real values are intentionally unavailable to an offline package test.

## Verdict

The handoff has been deployed and technically validated on the Hostinger staging stack and is ready for AVNL acceptance testing. No honest engineering process can guarantee that a future production deployment cannot fail; readiness remains conditional on the documented platform prerequisites, verified backups, preserved secrets, a fresh production data/files snapshot, and client approval. Production was not changed.
