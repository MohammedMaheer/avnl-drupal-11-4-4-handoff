# AVNL Drupal 11 Upgrade Report

## Result

The supplied Drupal 10.5.1 site has been upgraded to Drupal 11.4.5 on an isolated restore of the supplied database. Composer resolves successfully, Drupal bootstraps, database updates and cache rebuild complete, active configuration is exported, and no known Composer security advisories are reported.

## Major changes

- Core and dependency ecosystem upgraded to Drupal 11.4.5 / Symfony 7.4 / Twig 3.28; PHP requirement is >=8.3.
- Five custom modules and two custom themes remediated for Drupal 11.
- Contributed projects upgraded in `composer.lock`; three exceptional compatibility decisions are recorded in `03_MODULE_REPLACEMENT_APPROVALS.md`.
- Legacy client-side RSA credential handling and embedded keys removed; passwords/history use Drupal hashing and HTTPS.
- Settings sanitized and environment-driven; full configuration exported.
- Added a target-side, non-disclosing credential-preservation workflow so an existing UAT database connection, hash salt, SMTP setup, trusted hosts/paths/proxy settings, cookie domain, and TFA encryption key carry into the new release without rotation or inclusion in the ZIP.
- Removed a hard-coded staging cookie domain and active preview-only proxy override from the generic source.
- Cache-killing custom behavior removed; search and archive defects repaired.
- Corrected final static-analysis defects in archive labels, AJAX FormState access/return types, mobile uniqueness validation, password-history handling, Drupal time usage, query parameterization, Views query type safety, and Twig email formatting.
- Restored Drupal-generated JavaScript settings on feedback/enquiry templates, removing a stale copied anonymous-user settings/permission hash while retaining the page-specific UI scripts.
- Public handoff tree cleaned of keys, dumps, server inventories, and generated caches.

## Limitations

Production was not modified. Authenticated workflow, external integration, formal accessibility/GIGW, penetration, cross-browser, and production load tests require staging credentials/infrastructure and receiving-team approval. They are listed in `08_TEST_REPORT.md` and do not represent known Drupal 11 code blockers.
