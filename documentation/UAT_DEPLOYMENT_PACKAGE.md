# AVNL UAT Deployment Package

Use the Git tag `avnl-drupal-11.4.5-uat-deployment-2026-08-26` for a normal UAT code deployment.

This deployment tag intentionally excludes these full-handoff payloads:

- `database/`
- `files/`
- `source/files/`
- `source/sites/default/files/`

Those exclusions are a safety control. The deployment must keep the existing UAT database, uploaded files, credentials, TFA enrollment, SMTP configuration, hash salt and other host-specific runtime values.

The root `CHECKSUMS.sha256` in the complete handoff describes the complete handoff tree. It is not used to validate the reduced UAT deployment tag. Validate the deployment tag with `git fsck --full`, confirm the protected paths above are absent, and confirm the checked-out ref is the named immutable UAT deployment tag.

Do not import the reference database or copy packaged uploaded files into UAT during the normal deployment. Use an inactive versioned release, matched backups, an atomic switch, Drupal database/configuration updates, cache clearing, QA and rollback as described in `CODEX_UAT_STAGING_DEPLOYMENT_PROMPT.md`.

Stop after UAT is working and tested. Production requires separate approval and fresh production backups.
