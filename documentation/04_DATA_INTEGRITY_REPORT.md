# Data Integrity Report

Validation date: 2026-08-24

The supplied 2026-08-20 database was restored into an isolated MariaDB database, upgraded through Drupal APIs, and compared with the pre-upgrade totals. No content loss was detected.

| Dataset | Before | After | Result |
|---|---:|---:|---|
| Content translations (`node_field_data`) | 730 | 730 | Match |
| Published / unpublished | 515 / 215 | 515 / 215 | Match |
| Content entity IDs (`node`) | 440 | 440 | Match |
| Users | 75 | 75 | Match |
| Active / blocked users | 4 / 71 | 4 / 71 | Match |
| Taxonomy translations / entity IDs | 111 / 62 | 111 / 62 | Match |
| Menu-link translations / entity IDs | 461 / 273 | 461 / 273 | Match |
| Media | 70 | 70 | Match |
| Managed files | 1,455 | 1,455 | Match |
| URL aliases | 707 | 707 | Match |
| Custom password-history rows | 20 | 20 | Match |

Schema changes were limited to Drupal/contributed update hooks and custom update `general_security_patches_update_11001`. That update converted 11 legacy plaintext password-history values to one-way Drupal password hashes; nine empty historical values remained empty. No password value was logged or documented.

Core removed two permissions that no longer exist (`translate inner_banner_management node`) from affected roles. The Site Admin role received the new, restricted `administer archive settings` permission. A stale `chatbot` schema key was removed because the module is not enabled or present.

`drush updatedb:status` reports no pending updates. The upgraded validation dump is delivered outside the web root.

## Physical public-file remediation

The initial upgraded database contained 1,455 file entities. A package-level audit found 45 absent paths. A full scan of every Drupal file/image field showed that four were attached to published content; matching originals or equivalent duplicate versions were recovered from the supplied backup. The other 41 were verified-unreferenced migration leftovers, including three temporary/security-test records, and were removed after a fresh backup.

The final database contains 1,414 managed-file records and zero missing managed public/private files. All 360 database tables passed integrity checks. The cleanup is documented separately from the upgrade's zero-loss before/after comparison.

Final dump: `database/avnl_drupal11_4_4_final_2026-08-24.sql.gz`  
SHA-256: `d04d4dc914ac6409617bb1af130544c693c69a4a21663335ceb373367c409d6e`
