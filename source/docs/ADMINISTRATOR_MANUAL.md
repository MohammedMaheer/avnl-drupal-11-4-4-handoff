# AVNL Drupal 11.4.4 Administrator Manual

## Purpose and audience

This guide is for authorized AVNL Site Administrators, Content Editors, creator/publisher roles, and operations staff. It describes the retained administration model after the Drupal 11.4.4 upgrade. Perform training and operational work on staging first; use production only under the organization's approved change process.

## What changed

- Drupal core and dependencies are upgraded to 11.4.4-compatible versions.
- Existing content types, multilingual configuration, media, menus, aliases, search, galleries, archives, roles, and moderation are retained.
- The legacy jCryption login layer and bundled keys are removed. Authentication must use HTTPS.
- Password-history values are one-way hashes.
- Archive configuration is protected by the dedicated `administer archive settings` permission.
- Database credentials, hash salt, trusted hosts, and file/configuration paths are supplied through the protected environment.

## Secure sign-in

Use the existing authorized account and HTTPS staging/production URL. Never share passwords, disable TFA for convenience, place credentials in tickets, or request a password through email/chat. Report unexpected login, lockout, or TFA behavior through the approved security channel. Administrators must not restore jCryption files or keys.

## Dashboard and routine checks

After signing in, review:

- Status report for Drupal/PHP/database/file-system issues
- Recent log messages for new errors or security events
- Cron last-run time and queue health
- Available security updates under the approved maintenance process
- Public/private file capacity and writable-directory health
- Mail, TFA, CAPTCHA, search, consent, and external-service status
- Configuration changes and release notes

Do not enable Devel in production.

## Content workflow

1. Create or locate content using the administrative content listing.
2. Select the correct content type and language.
3. Enter a clear title, structured headings, accessible link text, metadata, publication dates, and required workflow fields.
4. Save a draft and preview it on desktop and mobile.
5. Submit it through the configured moderation/review workflow.
6. Publish only after the responsible publisher approves content, accessibility, attachments, links, and translations.
7. Use revisions for changes; do not duplicate content to bypass workflow.

For news, events, tenders, recruitment notices, circulars, and policy documents, verify dates, expiry/archive behavior, attachment titles, and responsible unit before publication.

## Multilingual content

Create or update the source-language item first, then use Drupal's translation controls. Confirm Hindi titles, body content, menus, metadata, attachments, dates, and publication status. Do not publish an incomplete translation as a substitute for the source language. Check language switching on the public page.

## Media and documents

- Reuse an existing media item when it represents the same asset.
- Use descriptive filenames without unnecessary spaces or special characters for new uploads.
- Provide meaningful alternative text for informative images; mark decorative images according to the editorial standard.
- Provide captions/transcripts for multimedia where required.
- Give PDF/document links descriptive titles and ensure the file itself meets accessibility requirements.
- Replace files through the managed content/media workflow; do not copy files directly into the webroot.
- Verify downloads anonymously after publication.

The final audit identified 41 managed-file references whose exact originals were already missing from the supplied pre-upgrade source. Review the list during staging UAT; do not substitute thumbnails or unrelated same-named assets without content-owner approval.

## Menus, URLs, and aliases

Create menu links only in the correct menu and language. Use concise titles, verify parent/child placement, and avoid placeholder links unless the theme's submenu behavior requires them. Preserve existing aliases when possible. After a change, check breadcrumbs, active-menu state, desktop navigation, mobile navigation, and redirects.

## Search, galleries, and archives

After publishing or replacing content, verify that search returns the expected title and excerpt. Confirm photo/video gallery ordering, captions, thumbnails, playback, consent behavior, and external providers. Archive listings remain at `/archives`. Authorized Site Administrators configure archive content types and retention periods under Configuration using the dedicated archive permission.

## Users, roles, and permissions

Apply least privilege. Assign an existing role that matches the person's job; do not create ad-hoc permissions or share accounts. Review active/blocked status, role assignment, TFA, last access, and separation of creator/publisher responsibilities. Test permission changes on staging and record approval before production import.

## Cache and configuration operations

Routine content changes should not require manual cache clearing. After an approved release or configuration import, an authorized operator may run:

```bash
php -d memory_limit=1G vendor/bin/drush.php cache:rebuild
php -d memory_limit=1G vendor/bin/drush.php status
php -d memory_limit=1G vendor/bin/drush.php updatedb:status
php -d memory_limit=1G vendor/bin/drush.php config:status
```

Do not run `composer update` or import configuration directly on production outside the release process. Never flush a cache service shared with another environment.

## Backup and restore

Back up source, database, public files, private files, and environment configuration as one timestamped release set. Verify readability and retention. A database update is not rolled back by code replacement alone: restore the previous source and its matching database together. Follow `DEPLOYMENT.md` and `ROLLBACK.md` and rehearse on staging.

## Security and privacy rules

- Use HTTPS and existing secret-management mechanisms.
- Never place database dumps, keys, certificates, credentials, server inventories, logs, or backups in the public document root.
- Do not weaken CSP, trusted hosts, file protections, or upload restrictions to resolve a content issue.
- Do not expose verbose errors publicly.
- Apply Drupal/PHP/OS/database security patches through change control.
- Escalate suspected compromise, unauthorized role changes, unusual login activity, or exposed data immediately.

## Troubleshooting and escalation

For a public error, record time, URL, role, language, action, and correlation/log reference without including secrets. Check Drupal logs, PHP/web logs, status report, disk space, cron, mail queues, configuration status, and recent releases. Avoid making untracked production edits. If a release caused a critical failure, use the verified rollback set and escalate to application, infrastructure, database, security, accessibility, or integration owners as appropriate.

## Related documents

- `DEPLOYMENT.md`
- `ROLLBACK.md`
- `docs/08_TEST_REPORT.md`
- `docs/09_FINAL_PACKAGE_VALIDATION.md`
- `docs/TRAINING_GUIDE.md`
- `docs/WARRANTY_SUPPORT_HANDOVER.md`
