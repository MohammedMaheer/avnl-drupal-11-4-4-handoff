General Security Patches
========================

This custom Drupal 11 module adds form validation, feedback/enquiry throttling,
password-history hashing, and conservative response security headers.

Transport security
------------------
Credentials and form data must be protected by HTTPS at the web server or load
balancer. The former jCryption browser-side RSA implementation, its public
endpoint, and bundled private key were removed during the Drupal 11 upgrade.
They must not be restored.

Deployment requirements
-----------------------
* Enforce HTTPS and HSTS at the edge after validating every deployed hostname.
* Keep Drupal trusted-host patterns and secrets in environment configuration.
* Retain Drupal's default cache headers; do not globally disable page caching.
* Apply the web-server header baseline documented in docs/05_SECURITY_HARDENING_REPORT.md.
* Test login, registration, password change, feedback, and online enquiry in
  staging before production deployment.

Password history
----------------
The login_attampt table name is retained for data compatibility. Its pass column
contains only one-way password hashes. Update 11001 converts legacy plaintext
values during deployment.
