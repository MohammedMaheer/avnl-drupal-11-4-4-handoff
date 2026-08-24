# AVNL Database Baseline

Baseline captured: 2026-08-23  
Source: separately supplied `staging_db_2026-08-20_12-17.sql`  
Dump metadata: MySQL 8.4.2, database name `avnl_web`  
Validation database: isolated local restore; the source dump was not modified

## Integrity totals

| Dataset | Baseline count |
|---|---:|
| Content rows (`node_field_data`) | 730 |
| Published content | 515 |
| Unpublished content | 215 |
| User rows (includes anonymous/system row) | 75 |
| Active user rows | 4 |
| Blocked user rows | 71 |
| Taxonomy terms | 111 |
| Menu links | 461 |
| Media | 70 |
| Managed files | 1,455 |
| URL aliases | 707 |
| Comments | 0 |
| Admin audit-trail rows | 49,939 |
| `login_attampt` rows | 20 |
| `categories_messages` rows | 26 |
| `categories_questions` rows | 22 |

No redirect table is present in this database.

## Content by type and publication status

| Content type | Published | Unpublished | Total |
|---|---:|---:|---:|
| Acts & policies | 7 | 7 | 14 |
| Article | 0 | 1 | 1 |
| AVNL directory | 6 | 24 | 30 |
| Awards & achievements | 47 | 14 | 61 |
| Careers/vacancies | 88 | 91 | 179 |
| Circulars | 0 | 5 | 5 |
| eCitizen downloads | 2 | 0 | 2 |
| Events | 16 | 1 | 17 |
| FAQs | 2 | 1 | 3 |
| Footer logo | 10 | 0 | 10 |
| Holiday list | 2 | 0 | 2 |
| Home-page banner | 4 | 13 | 17 |
| Inner-banner management | 19 | 4 | 23 |
| Key profiles | 10 | 2 | 12 |
| News | 17 | 0 | 17 |
| Notices | 8 | 1 | 9 |
| Notification | 7 | 5 | 12 |
| Online enquiry | 1 | 9 | 10 |
| Our units | 17 | 3 | 20 |
| Page | 111 | 2 | 113 |
| Photo gallery | 41 | 2 | 43 |
| Products | 79 | 5 | 84 |
| Related link (`releted_link`) | 9 | 1 | 10 |
| Tenders | 8 | 18 | 26 |
| Verticals | 4 | 0 | 4 |
| Video gallery | 0 | 6 | 6 |
| **Total** | **515** | **215** | **730** |

## Media

| Media bundle | Published | Total |
|---|---:|---:|
| Document | 59 | 59 |
| Image | 9 | 9 |
| Video | 2 | 2 |
| **Total** | **70** | **70** |

## Taxonomy terms

| Vocabulary | Terms |
|---|---:|
| AVNL directory category | 7 |
| AVNL tenders category | 18 |
| Awards/achievements category | 4 |
| eCitizen downloads category | 5 |
| Event category | 3 |
| Feedback type | 4 |
| Key profiles category | 20 |
| Our unit category | 15 |
| Photo gallery category | 1 |
| Production units | 2 |
| Products category | 18 |
| Verticals | 14 |
| **Total** | **111** |

## Menu links

| Menu | Links |
|---|---:|
| Account | 4 |
| Administrator menu | 48 |
| Footer | 19 |
| Left site menu | 8 |
| Main | 336 |
| Popup menu | 46 |
| **Total** | **461** |

## Enabled custom extensions and themes

The database enables all five supplied custom modules: `archive_option`, `general_section`, `general_security_patches`, `photo_gallery`, and `video_gallery`.

Enabled themes recorded in active configuration are `olivero`, `claro`, `avnl`, and `avnl_admin`. The custom front-end and administration themes are therefore both part of the upgrade-critical path.

## Enabled contributed modules outside root Composer requirements

Active configuration enables the following projects/submodules that are present in the source tree but are not all represented as direct root requirements: `actions_permissions`, `captcha_pack`, `conditional_fields`, `encrypt`, `geolocation`, `jquery_ui_autocomplete`, `jquery_ui_menu`, `key`, `real_aes`, `tfa`, and `views_taxonomy_radios_filter`. Their source and dependency status must be reconciled during Composer resolution; an enabled project must not be lost merely because it was omitted from the root manifest.

## Post-upgrade comparison gate

The data-integrity report must compare these same tables and groupings after Drupal database updates. Any difference must be explained by a documented update hook or corrected before handoff. The target is no loss of nodes, users, terms, media, files, aliases, menu links, role assignments, or custom-table rows.

Sensitive values such as usernames, email addresses, password hashes, tokens, keys, sessions, and configuration secrets were intentionally excluded from this document.
