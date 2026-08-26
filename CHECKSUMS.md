# Integrity Verification

`CHECKSUMS.sha256` contains a SHA-256 digest for every file in this handoff except the checksum manifest itself. Paths are relative to the handoff folder.

The consolidated delivery also includes `00_READ_ME_FIRST.md` and the command-by-command Word manual `START_HERE_AVNL_ZIP_STAGING_DEPLOYMENT_GUIDE_2026-08-25.docx`; both are covered by the regenerated checksum manifest.

Verify from the extracted handoff directory:

```bash
shasum -a 256 -c CHECKSUMS.sha256
gzip -t database/avnl_drupal11_4_5_final_2026-08-24.sql.gz
composer --working-dir=source validate --no-check-publish
composer --working-dir=source audit --no-interaction
```

Every checksum must report `OK`, the database gzip test must exit successfully, and Composer must report no security advisories. Exact Drupal core constraints may produce Composer schema-advice warnings; they are intentional to make the release reproducible.

The ZIP archive has an adjacent `.sha256` file because the archive checksum is calculated only after packaging.
