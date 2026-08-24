# Warranty and Support Handover

## Warranty basis

The SOW requires a minimum six-month comprehensive warranty after successful deployment. The commercial agreement and AVNL production-acceptance date govern the actual commencement date, inclusions, exclusions, response commitments, and authorized contacts. This handover provides the operating record; it does not replace the executed contract.

## Pre-go-live ownership record

Assign named primary and backup owners for:

- Drupal application and contributed/custom code
- Hosting, web server, PHP, and operating system
- Database and backup/restore
- DNS, TLS, CDN/reverse proxy, and network controls
- Security incidents and vulnerability management
- Accessibility, GIGW/DBIM, privacy, and content quality
- SMTP, TFA, CAPTCHA, search, translation, video, analytics, and other integrations
- Business UAT and change approval

Store names, contact methods, on-call coverage, escalation order, and access method in the organization's protected service system, not in the public source tree.

## Support intake information

Each incident should record environment, time, URL, role, language, steps, expected/actual behavior, business impact, reproducibility, recent change, safe screenshots, correlation/log references, and affected content IDs. Never attach passwords, keys, database dumps, personal data, or unrestricted logs to ordinary tickets.

## Severity and response matrix

Before production acceptance, AVNL and the supplier must record agreed definitions and targets for critical outage/security incident, major functional degradation, limited defect, and service request. Include acknowledgement, workaround, restoration, resolution/update frequency, business-hours/on-call coverage, and escalation contacts. Do not invent targets after an incident begins.

## Warranty services

Subject to the executed agreement, the support plan should cover reproducible upgrade defects, Drupal 11.4.4 compatibility issues, regression correction, custom-module/theme defects, security patches, applicable minor updates, deployment/rollback assistance, and documentation corrections. Security/minor updates must still follow staging, backup, QA, and approval procedures.

## Exclusions and change control

Record how the agreement handles new features, content remediation, third-party outages/API changes, infrastructure failure, unsupported direct production edits, credential loss, unapproved module installation, and regulatory recertification. An exclusion must not be used to avoid investigation of a possible upgrade regression.

## Operational evidence

Maintain release identifiers, Composer lock/checksums, deployment/rollback logs, backup verification, UAT approval, security/accessibility reports, training completion, monitoring results, incidents, root-cause analyses, patches, retests, and acceptance decisions in the approved service repository.

## Warranty closure

Before closure, review unresolved defects, security updates, documentation, recurring incidents, ownership, backup restoration, monitoring, credential/asset custody, and the transition to ongoing maintenance. Obtain written AVNL and supplier confirmation according to the contract.
