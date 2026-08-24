# Receiving Deployment Team Actions

- Obtain approvals listed in `03_MODULE_REPLACEMENT_APPROVALS.md`.
- For an existing UAT upgrade, run the packaged runtime-preservation command before configuration import; this keeps existing credentials unchanged without manually recovering or re-entering them.
- For a new isolated clone only, provision the documented `AVNL_*` secrets/paths because the sanitized database intentionally contains no deployable secrets or copied TFA enrollment.
- Rotate the historical TLS certificate key; configure HTTPS/HSTS and `expose_php=Off`.
- Rehearse `DEPLOYMENT.md` and `ROLLBACK.md` with fresh production snapshots.
- Complete role-based UAT, external integration tests, accessibility/GIGW review, security assessment, and capacity test.
- Obtain business, security, accessibility, infrastructure, and change-management sign-off before production cutover.
- Deliver training and establish the contractual support/warranty record.
