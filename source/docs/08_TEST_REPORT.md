# Upgrade Test Report

## Passed

- Drupal 11.4.4 bootstrap and database connection.
- Full database update run; no pending updates.
- Cache rebuild.
- Composer resolution, validation, lock install, and security audit.
- PHP syntax checks for custom modules/themes.
- Upgrade Status scan: no Drupal 11 API blockers in five custom modules or two custom themes. Remaining notices concern Drupal 12 readiness or optional uninstalled layout/tour libraries.
- Database integrity comparison with zero content/entity loss.
- Browser smoke: homepage, login, archives, search, and sitemap returned HTTP 200.
- Search regression discovered during QA was fixed and retested.
- Fresh-browser homepage/search produced no console errors after cache refresh.
- Mobile check at 390 × 844: mobile menu exposed and document width did not overflow the viewport.
- Security headers/CSP and public cache behavior inspected.
- Final-package restore test: the delivered gzip SQL was imported into a brand-new empty MariaDB database and the packaged source booted successfully against it.
- Final-package browser test: desktop and 390 × 844 mobile rendering passed with no horizontal overflow or browser-console errors; homepage, login, archives, search, and sitemap returned HTTP 200.
- Physical managed-file comparison confirmed that 41 unresolved `public://` paths pre-date the upgrade and were not removed by packaging; see `04_DATA_INTEGRITY_REPORT.md`.

## Failed and corrected

- Initial database update needed an unlimited CLI memory profile for the large Views configuration set.
- Initial search route failed because custom code replaced the entire Drupal search form with an empty array. The form is restored.
- Klaro empty hooks conflicted with CSP; a reproducible Composer patch now removes the empty hook keys.
- External jQuery Easing initially loaded before its dependency; the theme library now declares `core/jquery`.

## Not performed / staging UAT required

Authenticated role-by-role editorial workflows, SMTP delivery, TFA enrollment/login, CAPTCHA solving, real enquiry/feedback submissions, file upload edge cases, translations, moderation transitions, scheduled cron, external Bhashini/Google/YouTube services, link checking, cross-browser matrix, assistive-technology testing, penetration testing, and production load testing were not performed because they require credentials, external services, authorized test data, or target infrastructure.

The PHP built-in development server does not decode percent-encoded spaces before its static-file existence check. Five homepage/footer assets with spaces in their filenames therefore report as broken only under that development router even though the physical files are present. Apache/Nginx staging QA must confirm their normal delivery; this is not treated as a production-server result.
