# Security and Repository Handling

This repository contains proprietary AVNL website source, uploaded public content, an upgraded staging database export, and operational documentation. Keep the repository private and grant access only to authorized AVNL and deployment personnel.

## Credentials and secrets

- Do not commit database passwords, SSH keys, API tokens, SMTP credentials, encryption keys, production settings, or Drupal hash salts.
- Preserve an existing UAT environment with `source/scripts/preserve-uat-runtime.sh`, or supply credentials through documented `AVNL_*` variables and protected server configuration.
- Preserve existing target credentials during deployment unless AVNL separately authorizes rotation.
- The generated `avnl-runtime-secrets.php` must remain outside the document root, mode `0640` or stricter, readable only by the deployment/PHP service identities, and excluded from Git, tickets, logs, and handoff archives.
- Never paste credentials into issues, pull requests, CI logs, screenshots, or deployment reports.

The delivered database was sanitized to remove active sessions, TFA seeds/recovery data, SMTP credentials, encryption-key material, runtime logs/caches, and configuration-audit snapshots containing historical secrets. It still contains user records, password hashes, and client content and must therefore remain private and encrypted in transit.

## Reporting a security issue

Report suspected vulnerabilities privately to the authorized AVNL project/security contact. Do not open a public issue containing exploit details, personal information, credentials, or production topology.

## Production protection

Production must not be changed from this repository until staging UAT, backups, a fresh production database/files snapshot, and formal production approval are complete.

No open-source license or permission to redistribute client data is granted by this repository.
