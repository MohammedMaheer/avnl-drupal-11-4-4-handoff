# Final Requirements Re-audit

Validation date: 2026-08-24

## Sources reviewed

- The complete five-page `sow-avnlwebsite-upgradation.docx`, rendered and visually inspected page by page.
- The supplied 26-phase Drupal upgrade brief, treated as project requirements rather than executable instructions.
- The final source, Composer graph, three configuration-sync copies, sanitized database stream, deployment templates, and all handoff Markdown/JSON evidence.

## Corrections made during this re-audit

1. Removed a generic-source cookie-domain assignment fixed to `staging.avnl.org`.
2. Removed the active Hostinger-preview `settings.local.php` from the generic Drupal release and retained it only as a preview template mounted by the preview Compose file.
3. Added `preserve-uat-runtime.sh`, `capture-uat-runtime.php`, and `verify-uat-runtime.php`. Together they capture the existing UAT database connection, hash salt, trusted hosts/paths/proxy settings, cookie domain, SMTP configuration, and resolved TFA key into protected storage outside webroot without displaying values.
4. Kept environment/secret-store variables as the highest-precedence source, so an existing managed deployment remains unchanged.
5. Normalized the stale configuration copy under `sites/default/files` to the canonical final export. All three delivered sync copies are now byte-identical.
6. Replaced the abbreviated SoW matrix with the mandatory implementation/files/evidence/status/server-action/manual-action traceability format.
7. Fixed custom-code runtime defects revealed by Drupal-aware PHPStan, including an undefined archive label, invalid FormState access, reversed uniqueness logic, removed `REQUEST_TIME`, interpolated time-window SQL, unsafe Views query assumptions, and Twig replacement logic.
8. Corrected the test-report statement about the 41 stale file records so it agrees with the final database and data-integrity report.
9. Restored Drupal's generated `js-bottom-placeholder` on the feedback and online-enquiry page templates and removed a stale hard-coded anonymous `drupalSettings`/permission-hash block.

## Re-executed technical gates

| Gate | Result |
|---|---|
| Drupal core version | PASS — 11.4.5 |
| Composer validation | PASS with intentional exact-version advisory warnings |
| Composer advisory audit | PASS — no known advisories reported |
| Locked production install dry run | PASS |
| Custom/theme PHP-like syntax | PASS — 14 files, zero failures |
| Drupal-aware PHPStan level 5 | PASS — zero custom-module errors |
| Configuration YAML parse | PASS — 3,411 files, zero failures |
| Three-way configuration parity | PASS — byte-identical |
| Database gzip integrity | PASS |
| Deprecated History enabled check | PASS — not enabled |
| Broken symbolic links | PASS — zero |
| Generic target/domain hard-coding | PASS — zero in active settings/runtime scripts |
| Custom/config private/cloud-key markers | PASS — zero |
| Captured-runtime settings behavior | PASS — controlled non-secret fixture |
| Environment-over-captured precedence | PASS — controlled non-secret fixture |
| Missing/unreadable runtime file | PASS — settings fail closed before bootstrap |
| Special form-page Drupal settings | PASS — generated placeholders restored; no hard-coded permission hash remains |

## Credential handoff decision

Live keys and credentials were **not** restored to the source or ZIP. Doing so would expose them, bind the package to the wrong environment, and violate the supplied security requirements. The automatic target-side capture makes an existing UAT deployment direct without requiring the receiving team to know, rotate, or manually re-enter those values. The real UAT run remains a mandatory pre-import gate because an offline package cannot prove access to another computer's protected secret store.

## Remaining non-source acceptance items

- AVNL role-based UAT and visual/brand approval.
- Real SMTP/TFA/CAPTCHA/form/external-integration checks on the receiving UAT environment.
- Cross-browser/device matrix and full assistive-technology WCAG evaluation.
- Formal DBIM/GIGW/accessibility/security certification, penetration testing, and production-scale load testing.
- Fresh matched production source/database/files backup, rollback rehearsal, change approval, and separate production cutover.
- Administrator training attendance/sign-off and contractual warranty activation.

These items are not marked complete elsewhere in the package merely because instructions or templates exist.
