# Installed Project List

Authoritative versions are locked in `composer.lock`. Key direct projects after upgrade:

| Project | Version |
|---|---:|
| Drupal core/recommended/scaffold/project-message | 11.4.5 |
| Drush | 13.7.6 |
| Admin Audit Trail | 1.0.12 |
| Admin Toolbar | 3.6.3 |
| Block Class | 4.0.2 |
| CAPTCHA | 2.0.10 |
| CSP | 2.2.4 |
| CTools | 4.1.1 |
| Entity Reference Revisions | 1.14.0 |
| EVA | 3.1.2 |
| FAQ Field | 8.0.1 |
| Flood Control | 3.0.1 |
| Geolocation | 3.15.0 |
| Klaro | 3.1.1 |
| Metatag | 2.2.0 |
| Paragraphs | 1.23.0 |
| Pathauto | 1.15.0 |
| Session Limit | 3.0.0 |
| SMTP | 1.4.0 |
| TFA | 1.12.0 |
| Token | 1.17.0 |
| Twig Tweak | 3.4.2 |
| Views Bulk Operations | 4.4.7 |
| YouTube | 3.0.0-beta1 |

Custom modules: `archive_option`, `general_section`, `general_security_patches`, `photo_gallery`, and `video_gallery`. Custom themes: `avnl` and `avnl_admin`. Devel and Upgrade Status are development-only dependencies and are uninstalled from the delivered active configuration; production installation uses `composer install --no-dev`.

The deprecated Drupal core History module is disabled and absent from the active extension configuration.
