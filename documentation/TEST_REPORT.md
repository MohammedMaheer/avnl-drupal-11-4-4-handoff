# Test Report

This status table uses the required result vocabulary. Detailed evidence and corrected failures are in `08_TEST_REPORT.md`, `09_FINAL_PACKAGE_VALIDATION.md`, and the dated staging QA reports.

| Test | Result | Evidence/notes |
|---|---|---|
| Drupal boot | PASS | Drupal 11.4.5 booted against the upgraded and fresh-restored sanitized database |
| Composer validation | PASS | Valid composer.json/lock; exact core pins produce advisory warnings only |
| Composer security audit | PASS | No known dependency advisories reported on 2026-08-24 recheck |
| Locked production install | PASS | `composer install --no-dev --dry-run` resolved with no install/update operation required |
| Database updates | PASS | Upgrade hooks completed; fresh restore reported no pending updates |
| Cache rebuild | PASS | Completed on tested staging/fresh restore |
| Configuration import/status | PASS | No drift on validated restore; 3,411 YAML files parse; three sync copies match |
| Custom PHP syntax | PASS | 14 custom/theme PHP-like files, zero failures |
| Custom static analysis | PASS | Drupal-aware PHPStan level 5, zero errors |
| Functional tests | PASS | Executed public routes, search, archives, login/reset rendering, files, CAPTCHA rendering and bilingual routes passed |
| Authenticated editorial workflows | MANUAL VALIDATION REQUIRED | Requires authorized UAT accounts and business-role test data |
| Regression tests | PASS | Executed homepage/search/archive/assets/mobile/browser-console regression scope passed |
| Cross-browser matrix | MANUAL VALIDATION REQUIRED | Complete final Chrome/Firefox/Edge/Safari and device matrix on receiving UAT |
| Mobile/responsive | PASS | Tested at 390 × 844 with no horizontal overflow and working mobile navigation |
| Security checks | PASS | Composer audit, source/config secret scan, key removal, permission/settings review, PHPStan and security headers checked |
| Penetration test | MANUAL VALIDATION REQUIRED | Requires deployed authorized environment and security team |
| Accessibility checks | MANUAL VALIDATION REQUIRED | Engineering/automated smoke passed; full screen-reader, keyboard, contrast and content audit remains |
| GIGW/DBIM certification | MANUAL VALIDATION REQUIRED | Engineering checklist supplied; formal competent-authority review remains |
| Performance checks | MANUAL VALIDATION REQUIRED | Caching/search/staging timing reviewed; production-topology capacity/load test remains |
| Content integrity | PASS | Baseline/final totals recorded; 1,414 final managed files with zero missing managed paths |
| Database package integrity | PASS | Gzip test and SHA-256 match the delivered artifact |
| UAT credential-preservation logic | PASS | Captured settings, environment precedence and unreadable-file fail-closed behavior passed controlled tests |
| Real UAT credential capture | MANUAL VALIDATION REQUIRED | Must run on the receiving UAT before config import; offline package contains no live values |
| SMTP delivery/TFA login/CAPTCHA submission/external services | MANUAL VALIDATION REQUIRED | Requires existing target secrets, accounts and authorized external calls |
| AVNL UAT/approval | MANUAL VALIDATION REQUIRED | Required before any production promotion |
| Production deployment | BLOCKED | Deliberately excluded until UAT, fresh backups and written AVNL approval |
