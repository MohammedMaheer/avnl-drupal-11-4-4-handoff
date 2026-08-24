# AVNL Drupal 11.4.5 Training Guide

## Training objective

Prepare AVNL administrators, editors, creator/publisher roles, and operations staff to use the upgraded site safely without changing the established information architecture or bypassing governance. Conduct all exercises on staging with non-production accounts and sample content.

## Required participants

- Site Administrator
- Content Editor
- Each configured creator and publisher/moderator role
- Media/document owner
- Operations/hosting support
- Security and accessibility/content-compliance representatives

## Prerequisites

- Staging deployment and smoke tests completed
- Existing role-specific training accounts available
- TFA/CAPTCHA/mail integrations available or explicitly simulated
- Sample content, image, accessible PDF, translation, gallery item, and expiring notice prepared
- `ADMINISTRATOR_MANUAL.md`, `DEPLOYMENT.md`, and `ROLLBACK.md` distributed
- Attendance and issue records opened in the approved organizational system

## Module 1 — Drupal 11.4.5 orientation

Explain the upgraded platform, retained editorial structure, changed login security, environment-driven secrets, archive permission, Composer-managed dependencies, and the separation between staging acceptance and production approval. Demonstrate the dashboard, content listing, status report, logs, and help resources.

Practical check: each participant signs in with the existing staging account, confirms the correct role, and identifies the areas they are authorized to use.

## Module 2 — Content and moderation

Demonstrate creating, editing, previewing, revising, submitting, approving, publishing, unpublishing, scheduling/expiry where configured, and viewing revision history. Cover pages, news/events, tenders, recruitment notices, circulars, and policy/document content.

Practical check: a creator drafts and submits sample content; the correct publisher reviews accessibility, links, dates, metadata, and attachments and then publishes it.

## Module 3 — Multilingual publishing

Demonstrate translation creation, language-specific fields, menus, aliases, attachments, moderation, and language switching. Explain that source and translation publication states may differ and both require review.

Practical check: create or update a Hindi translation, publish through the correct workflow, and verify both language variants anonymously.

## Module 4 — Media, documents, and galleries

Demonstrate media reuse, image alternative text, captions, accessible document titles, PDF replacement, photo/video gallery management, thumbnails, consent behavior, and external-video playback.

Practical check: upload an approved sample image and document, add meaningful metadata/alternative text, use them in sample content, and verify anonymous delivery on desktop and mobile.

## Module 5 — Navigation, aliases, search, and archives

Demonstrate menu placement and language, parent/child links, aliases, breadcrumbs, search verification, archive settings, and archive listings. Explain placeholder-link behavior and the need to test desktop and mobile menus.

Practical check: add a temporary staging-only menu link, verify navigation and search, then remove it through the normal workflow. Test `/archives` and a configured retention rule without affecting real content.

## Module 6 — Users, roles, and security

Demonstrate user activation/blocking, least-privilege role assignment, separation of creator/publisher duties, TFA, login monitoring, and escalation. Explain prohibited actions: shared accounts, password disclosure, credential resets without authorization, enabling Devel in production, weakening CSP, or placing secrets/backups in the webroot.

Practical check: review a sample user's effective role and demonstrate the approval path for a role change without modifying a real user's credentials.

## Module 7 — Operations, cache, cron, and logs

Demonstrate status report, recent logs, cron/queues, disk/file-path checks, mail/integration monitoring, configuration status, cache rebuild, and post-release smoke checks. Use the documented 1 GB PHP CLI profile for deployment operations.

Practical check: on staging, run authorized read-only status commands and a cache rebuild, then verify homepage, login, search, archives, sitemap, and logs. Do not flush shared infrastructure caches.

## Module 8 — Backup, restore, and rollback

Explain matched source/database/file/environment backups, checksum verification, maintenance mode, atomic release switching, rollback triggers, and why code-only rollback is unsafe after database updates.

Practical check: review a timestamped staging backup set and walk through the rollback checklist. Perform a restore rehearsal only under the infrastructure owner's approved exercise plan.

## Module 9 — Accessibility, compliance, and content quality

Cover headings, link purpose, keyboard operation, focus, alternative text, contrast, zoom/reflow, captions/transcripts, accessible PDFs, Hindi completeness, form errors, privacy/consent, external links, and GIGW/DBIM obligations.

Practical check: review sample content with keyboard-only navigation and the organization's accessibility tools; record and correct defects on staging.

## Training evidence

Use `TRAINING_COMPLETION_RECORD.md`. Record attendance, role, modules completed, exercise results, questions, defects, owners, due dates, retests, material version, trainer confirmation, and authorized AVNL sign-off. Training is not complete merely because this guide exists.

## Exit criteria

- Every required role attended or has an approved make-up plan.
- Required practical exercises passed or accepted corrective actions are tracked.
- Participants know the secure escalation and rollback routes.
- Materials were delivered and versioned.
- The authorized AVNL representative signed the completion record.
