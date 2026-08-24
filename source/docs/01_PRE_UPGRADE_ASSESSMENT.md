# AVNL Drupal 11 Pre-upgrade Assessment

Assessment date: 2026-08-23  
Source archive: `backup_webstaging20082026.zip`  
Database baseline: `staging_db_2026-08-20_12-17.sql`

## Executive assessment

The supplied application is a flat-document-root Drupal 10.5.1 installation. Its Composer project, checked-in core, and lock file all identify Drupal 10.5.1. The target Drupal 11.4.5 release requires PHP 8.3 or later and Symfony 7.4 components.

The upgrade risk is **high**. The current lock file contains numerous contributed extensions whose installed releases explicitly exclude Drupal 11, five custom modules whose metadata stops at Drupal 10, two large custom themes whose metadata stops at Drupal 10, deprecated custom APIs, unsafe raw rendering, embedded cryptographic private keys, production/staging database exports inside the public document root, and runtime cache artifacts under the public files directory.

The original ZIP and the separately supplied SQL dump have been preserved unchanged. Their SHA-256 checksums are recorded in this assessment.

## Verified baseline

| Item | Evidence |
|---|---|
| Drupal document root | `extracted_source/var/www/html/webstaging` |
| Drupal core | 10.5.1 (`core/lib/Drupal.php`, `composer.lock`) |
| Target core | 11.4.5 |
| Target PHP requirement | PHP >=8.3.0 (Drupal 11.4.5 package metadata) |
| Current dependency family | Symfony 6.4; Twig 3.20 |
| Target dependency family | Symfony 7.4; Twig >=3.27 |
| Composer project layout | Flat root; core installed at `core`, modules at `modules/contrib` |
| Database dump | MySQL 8.4.2 dump; 74 MB; 2026-08-20 |
| Public files/config sync | `files`; configuration sync is under an opaque `files/config_.../sync` directory |
| Git | No repository supplied; a local upgrade repository/branch is created only for the working copy |

## Source preservation

| Artifact | SHA-256 |
|---|---|
| `backup_webstaging20082026.zip` | `44506864b2c122ef3cb439b036391c02fd83a9c65cd2403231cdc0a8ba1321e5` |
| `staging_db_2026-08-20_12-17.sql` | `88306a4cde1ba5c2242ce629a734f51c2a78d7a1a16a2a8baca0a6c69fedc4d0` |

## Custom extension inventory

| Component | Existing compatibility declaration | Drupal 11 compatible now | Required action | Risk |
|---|---:|---:|---|---|
| `archive_option` | `^8.8 || ^9 || ^10` | No | Upgrade metadata; remediate controller rendering, routing/access, service usage, and form handling | High |
| `general_section` | `^9 || ^10` | No | Upgrade metadata; replace deprecated APIs and globals; review form/access logic and caching | Critical |
| `general_security_patches` | `^9 || ^10` | No | Replace removed Symfony event class; remove embedded private key design; correct headers/cookies/session behavior | Critical |
| `photo_gallery` | `^8.8 || ^9 || ^10` | No | Upgrade metadata and validate EVA/Colorbox dependencies/configuration | Medium |
| `video_gallery` | `^8.8 || ^9 || ^10` | No | Upgrade metadata and validate EVA/YouTube dependencies/configuration | Medium |
| `avnl` theme | `^9 || ^10` | No | Upgrade metadata; review core library overrides, Twig raw output, preprocess code, JavaScript and accessibility | Critical |
| `avnl_admin` theme | `^9 || ^10` | No | Upgrade metadata; reconcile copied Claro-era templates/libraries with Drupal 11.4.5 | Critical |

## Contributed dependency compatibility snapshot

The following table records installed versions and blockers reported by Composer against Drupal core 11.4.5. “Blocked” means the installed release's declared core constraint excludes Drupal 11; it does not mean the project lacks a newer compatible release.

| Component | Installed version | Drupal 11 at installed version | Action | Risk |
|---|---:|---:|---|---|
| Drupal core/recommended/scaffold/project-message | 10.5.1 | No | Pin all core packages to 11.4.5 and resolve the full dependency graph | High |
| Admin Toolbar | 3.3.0 | Blocked | Upgrade to compatible release | Medium |
| Block Class | 2.0.11 | Blocked | Upgrade to compatible release | Medium |
| CAPTCHA | 2.0.0-beta1 | Blocked | Upgrade to compatible stable release if available | High |
| CTools | 4.0.3 | Blocked | Upgrade to compatible release | High |
| Dropdown Language | 4.0.3 | Blocked | Upgrade to compatible release | Medium |
| Entity Reference Revisions | 1.10.0 | Blocked | Upgrade with Paragraphs | High |
| EVA | 3.0.0 | Blocked | Upgrade and validate custom galleries | High |
| FAQ Field | 7.1.0 | Blocked | Upgrade; validate jQuery UI dependency chain | High |
| Flood Control | 2.3.2 | Blocked | Upgrade | Medium |
| jQuery UI / Accordion | 1.6.0 / 2.0.0 | Blocked | Upgrade or replace only if no supported line exists | High |
| Login Redirect Per Role | 1.9.0 | Blocked | Upgrade | Medium |
| Menu Breadcrumb | 2.0.0-alpha0 | Blocked | Find supported release or document replacement approval | High |
| Menu Link Attributes | 1.3.0 | Blocked | Upgrade | Medium |
| Metatag | 1.22.0 | Blocked | Upgrade with Token | High |
| Paragraphs | 1.15.0 | Blocked | Upgrade with Entity Reference Revisions | High |
| Pathauto | 1.11.0 | Blocked | Upgrade with Token/CTools | High |
| Session Limit | 2.0.0-beta3 | Blocked | Find supported release or document replacement approval | High |
| Sitemap | 2.0.0-beta4 | Blocked | Find supported release or document replacement approval | High |
| SMTP | 1.2.0 | Blocked (`<11`) | Upgrade to Drupal 11-compatible release | High |
| Token | 1.11.0 | Blocked | Upgrade | High |
| Twig Tweak | 3.2.1 | Blocked | Upgrade and review templates for Twig 3.27 | High |
| Views Bulk Operations | 4.2.3 | Blocked | Upgrade | High |
| Weight | 3.4.0 | Blocked | Upgrade | Medium |
| YouTube | 2.0.0 | Blocked | Upgrade and validate video gallery fields/rendering | High |

Installed projects not listed as current Composer blockers still require security and functional validation. The source tree also contains contributed directories that are not direct root requirements (`captcha_pack`, `encrypt`, `geolocation`, `jquery_ui_autocomplete`, `jquery_ui_menu`, `key`, `real_aes`, `securimage`, and `vendor_stream_wrapper`); database/config inspection will determine whether they are enabled, transitive dependencies, stale copies, or manually added code.

## PHP and Drupal 11 code blockers

- `general_section.module` imports removed/deprecated APIs such as `SafeMarkup`, uses `REQUEST_TIME`, and contains live `drupal_set_message()` calls.
- Custom modules rely extensively on global service location (`\Drupal::...`), superglobals, procedural redirects, and unvalidated raw request state; these require targeted compatibility and security remediation without changing business rules.
- `general_security_patches` subscribes with the removed Symfony `FilterResponseEvent`; Drupal 11/Symfony 7 requires `ResponseEvent`.
- The custom security module ships a 1024-bit RSA private key and exposes an encryption endpoint to users with `access content`. This is not an acceptable secret-management or authorization boundary.
- The response subscriber removes Drupal's frame protection, disables caching globally, emits a fake `Server` value, sets an HttpOnly flag to false, and performs a header/exit redirect from an event subscriber. These behaviors require replacement with supported response/session mechanisms.
- Theme templates contain multiple `|raw` render paths for page and node titles. Each path requires source-specific safety review; raw output must not be retained merely for compatibility.
- Both themes copy and override a substantial amount of Drupal core theme behavior. Drupal 11.4.5 library removals/renames and template changes are a significant regression risk.

## Security and handoff concerns

| Finding | Risk | Planned handling |
|---|---|---|
| `avnl.key` in web root | Critical | Exclude from distributable source; require environment-managed TLS key on destination server; rotate the exposed key |
| `rsa_1024_priv.pem` in custom module | Critical | Remove embedded private key mechanism; replace with supported transport/session security; rotate any related material |
| SQL and compressed SQL inside web root | Critical | Preserve only outside the public document root; exclude from deployment package |
| Server/IP/login inventory text files in web root | High | Inspect for operational sensitivity; exclude unless proven application-required |
| Generated PHP/Twig cache under `files/php` | High | Remove from final handoff; ensure public files cannot execute PHP |
| Real settings/secrets likely present | Critical | Convert deployable settings to environment-driven values and provide sanitized examples; never document values |
| Devel package in production requirements | Medium | Determine enabled status; move to development-only tooling or remove from production handoff if unused |

## Database risks

- The authoritative supplied baseline is a MySQL 8.4.2 dump; an older database copy also exists inside the source archive and must not be mistaken for the current baseline.
- Upgrade validation must run on an isolated restored copy. The original SQL must not be edited.
- Content moderation, multilingual content, media, aliases, custom fields, custom roles, CAPTCHA sessions, audit trails, and custom tables (`login_attampt`, `categories_messages`, `categories_questions`) are present and require integrity checks.
- Database updates are not assumed reversible; production rollback must restore the pre-upgrade database and file set together with the previous code release.

## Initial upgrade strategy

1. Restore the separately supplied 2026-08-20 dump to an isolated local database and record entity/configuration totals.
2. Pin Drupal core packages to 11.4.5 and PHP to >=8.3, then resolve contributed dependencies explicitly.
3. Upgrade custom extension metadata only after source compatibility fixes are applied.
4. Replace the embedded cryptographic/session workaround and sanitize deployment configuration.
5. Run Drupal database updates and cache rebuild against the isolated baseline.
6. Compare post-upgrade entity/content totals to the baseline, export configuration, and run security/static/functional checks.
7. Package only deployment-required source/configuration and public assets; keep databases, private keys, caches, and local tooling outside the public document root.

## Initial acceptance risks

The project is **not ready for handoff** at this stage. The highest risks are the Drupal 11 dependency graph, the custom security module, copied custom themes, database-update validation, embedded secrets, and the absence of a clean environment-driven deployment settings layer. These items are addressed in the subsequent upgrade phases and final reports.
