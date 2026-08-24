# Repository Guide

## Purpose

This private repository is the complete AVNL Drupal 11.4.5 staging handoff. It contains the upgraded application, uploaded public files, final remediated staging database, checksums, deployment/rollback instructions, QA evidence, administrator material, and SOW traceability documentation.

## Important starting points

- `README.md` — release identity and package overview.
- `documentation/DEPLOYMENT.md` — controlled staging deployment sequence.
- `documentation/ROLLBACK.md` — rollback requirements and sequence.
- `documentation/HOSTINGER_STAGING_QA_2026-08-24.md` — latest remediation and QA decision.
- `documentation/QA_CRAWL_RESULTS_2026-08-24.json` — machine-readable final crawl summary.
- `documentation/DEPLOYMENT_TEAM_ACTIONS.md` — receiving-team responsibilities.
- `SECURITY.md` — confidentiality and secret-handling rules.
- `CHECKSUMS.sha256` — comprehensive per-file integrity manifest.
- `CHECKSUMS.md` — checksum verification instructions.

## Repository layout

```text
source/          Complete Drupal 11.4.5 code, Composer dependencies, themes, modules, and public files
database/        Sanitized gzip-compressed preview database for isolated restore/full clone
configuration/   Final configuration sync and available translations
files/private/   Private-file directory structure for deployment outside the web root
deployment/      Tested Hostinger preview runtime templates
documentation/   Deployment, rollback, QA, security, compliance, training, and support guides
```

## Integrity verification

From the repository root, run `shasum -a 256 -c CHECKSUMS.sha256`. Every file must report `OK`. The database gzip stream must also pass a gzip integrity test before any authorized import.

## Deployment rules

1. Deploy to staging first and preserve the target environment's existing credentials and Drupal hash salt.
2. Create matched database/source/files backups before changing the target.
3. Install the locked dependencies; do not run `composer update` during deployment.
4. Preserve the existing staging database by default. Import the packaged sanitized database only for an explicitly authorized isolated restore or full clone.
5. Run Drupal database updates, configuration import, cache rebuild, requirements checks, and the documented QA suite.
6. Stop after staging and obtain client acceptance before any production action.

## Database provenance

The delivered database is based on the supplied 20 August 2026 staging export plus the verified 24 August remediation changes. It is sanitized to remove active sessions, copied TFA data, SMTP/encryption secrets, runtime logs/caches, and configuration-audit snapshots. It is not represented as a fresh production export. Exact current-production parity requires an authorized fresh production database dump and matching public/private files snapshot.

## Large repository note

The repository is intentionally large because the requested handoff includes Composer dependencies and uploaded public files. Avoid rewriting history or committing generated cache trees. Future releases should add only reviewed source/configuration changes and required content binaries.
