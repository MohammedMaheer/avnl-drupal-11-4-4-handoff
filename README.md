# AVNL Drupal 11.4.4 Handoff

This folder contains the deployment-ready AVNL website upgrade from Drupal 10.5.1 to Drupal 11.4.4.

## Contents

- `source/` — complete upgraded Drupal source, Composer dependencies, custom modules, themes, exported configuration, and environment example.
- `database/` — final remediated staging database export in gzip-compressed SQL format.
- `documentation/` — assessment, deployment, rollback, security, testing, administrator, training, support, and handoff guides.
- `CHECKSUMS.md` — integrity checksums for the database export and Composer lock file.
- `REPOSITORY_GUIDE.md` — repository structure, integrity, and controlled deployment workflow.
- `SECURITY.md` — confidentiality, credential handling, and private reporting rules.

## Release identity

- Drupal version: 11.4.4
- Required PHP version: 8.3 or later
- Source branch: `upgrade/drupal-11-4-4`
- Source commit: `3f6debc`
- Package finalized: 2026-08-24

## Start here

Read `documentation/DEPLOYMENT.md` before deploying. The source and database must be backed up, deployed, and rolled back as a matched pair. Configure all secrets through the target environment; do not place credentials in source files.

The package excludes Git history, generated CSS/JavaScript/PHP caches, and quarantined legacy sensitive files. Public uploaded content required by the site remains included in `source/files/`.

The database is based on the supplied 20 August 2026 staging export and the verified 24 August remediation changes. Exact current-production content requires an authorized fresh production database dump and matching files snapshot; none was available or modified during this staging work.
