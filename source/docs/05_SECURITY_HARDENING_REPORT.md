# Security Hardening Report

## Completed

- Removed the public jCryption endpoint, 1024-bit private/public key pair, browser-side credential encryption, and all active theme references. HTTPS is now the only transport-security boundary.
- Converted legacy password-history values to one-way Drupal hashes and added a schema definition for clean installations.
- Replaced the global cache-disabling/redirecting response subscriber with conservative headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- Preserved Drupal cache metadata instead of forcing every response to private/no-store.
- Removed embedded database credentials and hash salt from `settings.php`; deployment secrets are environment-driven and documented in `.env.example`.
- Added environment-driven trusted hosts, file locations, private/temp paths, logging level, and configuration-sync path.
- Restricted archive administration to a dedicated permission and eliminated raw HTML assembly in its public controller.
- Removed SQL dumps, TLS key/CSR files, server/IP/login inventory, generated Twig PHP, and aggregate caches from the public handoff tree. They remain recoverable under the workspace `excluded_from_handoff` folder and in the untouched source ZIP.
- Composer audit: no known security advisories.
- CSP remains enforced without adding `unsafe-eval`; a Composer-managed Klaro patch prevents empty hooks from being evaluated.

## Deployment controls

- Rotate the exposed historical TLS key and provision the replacement only in the web server/secret store.
- Set `expose_php=Off`; the PHP development server used for validation adds `X-Powered-By` after the application response.
- Enforce HTTPS and HSTS at the edge after all production hostnames are confirmed.
- Deny script execution in public uploads and deny all web access to private/config/backup directories.
- Restrict CORS to the approved production origin; the supplied staging configuration currently names `https://staging.avnl.org`.
- Keep Drupal, OS, PHP, database, and web-server security updates in the normal patch cycle.

Secrets, identities, password hashes, and operational addresses are intentionally absent from this report.

