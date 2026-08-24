# AVNL Drupal 11.4.5 Final Handoff

This package contains the validated AVNL corporate website upgrade from Drupal 10.5.1 to Drupal 11.4.5. The packaged source matches the release tested on the dedicated Hostinger preview on 24 August 2026. Production was not changed.

## Package contents

- `source/` — complete Drupal application, locked Composer dependencies, custom code, contributed extensions, public files, local third-party libraries, and environment-driven settings.
- `database/` — gzip-compressed, sanitized post-remediation preview database for an authorized isolated restore or full staging clone.
- `configuration/sync/` — final exported Drupal configuration with no active/sync drift.
- `configuration/translations/` — downloaded translation packages available from Drupal's upstream service.
- `files/private/` — private-file directory structure; deploy outside the public document root.
- `deployment/hostinger-preview/` — tested Docker, Apache, PHP/APCu, upload-progress, and MariaDB isolation templates. Adapt paths and existing secrets to the receiving platform.
- `documentation/` — assessment, deployment, rollback, QA, security, administrator, training, support, and traceability material.
- `CHECKSUMS.md` — SHA-256 integrity manifest for critical artifacts.

## Validated release state

- Drupal core: 11.4.5
- Drush: 13.7.6
- Tested PHP: 8.5.9; package requirement: PHP 8.3 or later
- Tested database: MariaDB 11.4.12 with `READ-COMMITTED`
- Database updates: none pending
- Configuration drift: none
- Drupal status warnings: none
- Composer security advisories: none reported
- Search index: 100%
- Maintenance mode: disabled
- Public smoke routes: homepage, login, search, sitemap, and robots returned HTTP 200

## Deployment rule

Read `documentation/DEPLOYMENT.md` before touching a server. Deploy to staging first and stop after staging QA for AVNL review.

The default credential-preserving deployment updates the source and the existing target database in place. It does **not** import the packaged preview database. Before configuration import, run `source/scripts/preserve-uat-runtime.sh` with the current and new Drupal roots. The script copies the existing target's database connection, hash salt, host/path/proxy settings, cookie domain, SMTP configuration, and resolved TFA encryption key into a protected file outside the document root and installs a non-secret locator in the new release. It never prints credential values. Existing `AVNL_*` secret-store variables remain supported and take precedence.

This process preserves administrator accounts, password hashes, TFA enrollment, content, and existing UAT credentials without embedding live values in the source or ZIP. Run `source/scripts/verify-uat-runtime.php` through the new release's Drush before configuration import or traffic switching.

Use the packaged database only for an explicitly authorized isolated restore or full staging clone. Importing it replaces the target database contents. User password hashes are retained, while active sessions, TFA seeds/recovery data, SMTP credentials, and encryption-key material are intentionally removed; authorized administrators must enroll TFA for the restored environment.

## Confidentiality

The source tree contains no runtime `.env` file, SSH key, plaintext database password, plaintext administrator password, Drupal hash salt, SMTP credential, or encryption-key material. An upstream contributed-module test fixture contains only non-secret test selectors. The database export is still sensitive because Drupal databases contain user records, password hashes, configuration, and content. Keep the entire package private, encrypted in transit, and available only to authorized AVNL/deployment personnel.

## Data currency

The database is based on the supplied 20 August 2026 staging export plus verified remediation through 24 August 2026. It is not represented as a fresh production database. Exact production parity requires an authorized fresh production database and matching public/private files snapshot during a separately approved production change.
