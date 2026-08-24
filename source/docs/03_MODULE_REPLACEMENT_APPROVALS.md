# Module Decisions and Approval Record

## Outcome

No enabled business feature was removed or replaced. Composer resolved the active module set on Drupal 11.4.5. The following decisions require the receiving team's awareness:

| Project | Decision | Rationale / approval status |
|---|---|---|
| `views_taxonomy_radios_filter` | Retained with Drupal 11 metadata compatibility patch | No solver-compatible upstream release was available; existing functionality is retained. Client should approve ongoing ownership or replacement in a later project. |
| `captcha_pack` | Retained with Drupal 11 metadata compatibility patch | Enabled CAPTCHA types remain available. Client should approve ongoing ownership pending an upstream Drupal 11 release. |
| `klaro` 3.1.1 | Retained with Composer-managed CSP patch | Empty consent hooks triggered `unsafe-eval`. The patch removes empty hooks and is recorded in `patches.lock.json`; it must remain enabled until upstream resolves the behavior. |
| `youtube` 3.0.0-beta1 | Upgraded to the Drupal 11-compatible beta line | Required by the existing video-gallery field. Validate video playback in staging. |
| `conditional_fields` 4.0.0-alpha6 | Upgraded to Drupal 11-compatible alpha | Existing form logic depends on it. Validate conditional editors in staging. |
| `devel` | Moved to Composer `require-dev` and kept disabled | Development diagnostics remain available to authorized developers, while production `composer install --no-dev` excludes the project. Never enable it in production. |

All other directly required contributed projects resolved to Drupal 11-compatible releases in `composer.lock`. No automatic substitute with a different business workflow was made.
