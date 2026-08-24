# Credential and Environment Preservation

## Default staging deployment

Keep the target staging database and protected environment configuration. Deploy source into a new release, preserve the active runtime settings, run database updates, review/import approved configuration, rebuild caches, and perform QA. This preserves target administrator accounts, password hashes, TFA enrollment, content, database credentials, SMTP credentials, Drupal hash salt, and environment-specific settings.

## Recommended automatic preservation

After extracting the new source into an inactive release directory, run:

```bash
NEW_RELEASE_ROOT/scripts/preserve-uat-runtime.sh CURRENT_DRUPAL_ROOT NEW_RELEASE_ROOT
```

Replace the two root placeholders with the current and newly extracted Drupal document roots. The command uses the current site's own Drupal bootstrap and therefore does not ask for or change any credential. It captures, without displaying values:

- database connection settings;
- Drupal hash salt;
- trusted hosts, file paths, configuration/translation paths, and approved reverse-proxy settings;
- current session cookie domain, including an intentionally empty value;
- complete SMTP configuration, including its existing username/password;
- the resolved 256-bit AVNL/TFA encryption key.

The protected payload is written outside the document root, normally in the existing private-files directory, with mode `0640`. A non-secret locator is generated in the new release and is ignored by Git. An existing payload is moved to a timestamped, mode-`0600` recovery copy. No value is written to terminal output.

Before importing configuration, run the verifier through the new release:

```bash
php -d memory_limit=1G NEW_RELEASE_ROOT/vendor/bin/drush.php \
  --root=NEW_RELEASE_ROOT php:script scripts/verify-uat-runtime.php
```

Every check must report `PASS`. Confirm the PHP/web-service identity can read the protected file. Stop if capture or verification fails; do not generate a replacement TFA key and do not reset administrator credentials.

Explicit `AVNL_*` environment values remain supported and take precedence over captured values. This lets a managed secret store remain authoritative where one is already in use.

## Files that must never overwrite real target values

- `.env` or secret-store data
- `settings.local.php` or equivalent protected overrides
- database/server credential files
- SSH keys, TLS private keys, and API credentials
- host-specific trusted-host, cookie-domain, proxy, mail, and file-path settings

`source/.env.example` lists variable names and placeholders only. The generic handoff no longer contains an active `settings.local.php`; the Hostinger preview-specific proxy override is retained only as `deployment/hostinger-preview/settings.local.php.example` and is mounted by that preview template.

The handoff intentionally blanks `smtp_username` and `smtp_password` in exported configuration. It also changes the Drupal/TFA key provider from configuration storage to the protected `AVNL_ENCRYPTION_KEY` environment variable. The automatic preservation command supplies runtime-only config overrides for those values, or the deployment platform may continue using `AVNL_SMTP_USERNAME`, `AVNL_SMTP_PASSWORD`, and `AVNL_ENCRYPTION_KEY`. Live values are never put back into the distributable ZIP.

## Recovery and cleanup

Keep the protected runtime file and any `.previous-*` copy with the matched UAT rollback set. After UAT acceptance and rollback-window expiry, remove superseded copies using the client's approved secure-deletion/retention procedure. Do not copy these files into the repository or a general backup archive.

## Database import warning

The packaged database is a sanitized preview snapshot. Importing it replaces the target's users, password hashes, content, configuration, and other database state. Copied TFA enrollment/recovery data, active sessions, SMTP credentials, encryption-key material, and operational configuration-audit snapshots are removed. Use it only for an authorized isolated restore or full staging clone. Never import it merely to deploy source code.

## Production boundary

Production promotion requires a fresh production database/files backup and separate written approval. Do not reuse the packaged preview database for production and do not reset or rotate production credentials as part of a source deployment.
