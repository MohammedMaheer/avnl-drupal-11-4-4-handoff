# AVNL Drupal 11.4.5 Complete Handoff

This folder is the consolidated staging/UAT delivery package dated 25 August 2026.

## Begin here

1. Read `START_HERE_AVNL_ZIP_STAGING_DEPLOYMENT_GUIDE_2026-08-25.docx`.
2. Review `documentation/DEPLOYMENT.md`, `documentation/CREDENTIAL_PRESERVATION.md`, and `documentation/ROLLBACK.md`.
3. Verify the folder using `sha256sum -c CHECKSUMS.sha256` on Linux or `shasum -a 256 -c CHECKSUMS.sha256` on macOS.
4. Deploy to staging only and preserve the staging server's existing database, administrator accounts, TFA enrollment, SMTP credentials, encryption key, hash salt, trusted hosts, paths, and other runtime settings.
5. Do not import the packaged database during a normal in-place staging upgrade. It is supplied only for an explicitly authorized isolated restore or full preview clone.
6. Stop after staging QA and AVNL UAT. Production requires separate written approval and fresh production backups.

## Contents

- `source/` — complete Drupal 11.4.5 application and locked dependencies.
- `database/` — sensitive sanitized preview database snapshot.
- `configuration/` — validated configuration sync and translations.
- `files/` — private-file structure supplied with the handoff.
- `deployment/` — preview/deployment reference assets.
- `documentation/` — deployment, rollback, QA, security, training, support, and traceability records.
- `START_HERE_AVNL_ZIP_STAGING_DEPLOYMENT_GUIDE_2026-08-25.docx` — detailed command-by-command ZIP deployment manual.
- `documentation/CODEX_UAT_STAGING_DEPLOYMENT_PROMPT.md` — environment-neutral prompt for Codex on the authorized UAT deployment computer.
- `CHECKSUMS.sha256` — SHA-256 digest for every handoff file except the checksum manifest itself.

## Confidentiality

The source contains no plaintext live credential or private key. The database snapshot remains sensitive because it contains user records, password hashes, email-like values, configuration, and content. Keep the package restricted to authorized AVNL and deployment personnel.
