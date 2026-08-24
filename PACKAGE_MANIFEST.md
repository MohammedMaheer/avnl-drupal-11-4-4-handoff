# Package Manifest

Release: AVNL Drupal 11.4.5 Final Handoff  
Finalized: 24 August 2026

| Path | Purpose | Deployment treatment |
|---|---|---|
| `source/` | Complete tested Drupal document root | Deploy into a new versioned release; preserve protected target environment settings |
| `source/files/` | Public uploaded files and synchronized fallback configuration/translations | Merge files without deleting newer target uploads |
| `database/*.sql.gz` | Sanitized post-remediation preview database | Sensitive; isolated restore/full clone only unless explicitly approved |
| `configuration/sync/` | Final active Drupal configuration export | Review target diff before import |
| `configuration/translations/` | Available downloaded translation packages | Copy to the configured non-public translations path |
| `files/private/` | Private-file directory structure | Keep outside public document root |
| `deployment/hostinger-preview/` | Tested container/server templates | Adapt to the receiving platform; never overwrite its real `.env` |
| `source/scripts/preserve-uat-runtime.sh` | One-command preservation of existing UAT runtime credentials/settings | Run from the current release before config import; no values are printed |
| `source/scripts/verify-uat-runtime.php` | Non-disclosing post-capture validation | Run through new-release Drush before configuration import |
| `documentation/` | Deployment, rollback, QA, security, operations, and acceptance evidence | Read before deployment |
| `CHECKSUMS.md` | SHA-256 integrity manifest | Verify before extraction/import |
| `SECURITY.md` | Confidentiality and secret-handling requirements | Mandatory |

## Excluded from the package

- Git history and repository credentials
- Runtime `.env`, SMTP credentials, Drupal/TFA encryption-key material, and other secret-store values
- SSH private keys, certificates, API tokens, plaintext passwords, and Drupal hash salt
- Generated runtime caches and temporary build artifacts
- Host-level backup directories
- Production database/files, because no fresh authorized production snapshot was supplied
- Active sessions, copied TFA seeds/recovery data, SMTP secrets, encryption-key material, and operational configuration-audit snapshots

The adjacent ZIP checksum is stored in a separate `.sha256` file so the archive can be verified before extraction.
