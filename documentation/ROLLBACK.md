# Rollback Runbook

Database updates are not rolled back by copying old PHP over an upgraded database. Treat code, database, public files, private files, and environment configuration as one release unit.

Trigger rollback for failed bootstrap/update, material data mismatch, authentication/editorial outage, broken critical public journeys, security regression, or unacceptable performance.

1. Put the site in maintenance mode or remove it from the load balancer.
2. Stop cron, queues, and writes.
3. Restore the complete pre-upgrade code release and its matching Composer vendor tree.
4. Restore the verified pre-upgrade database backup.
5. Restore the matching public/private file snapshots and prior environment/edge configuration.
6. Rebuild caches with the old release, test login/homepage/business-critical journeys, and return traffic only after approval.
7. Preserve failed-release logs and database backup for investigation; do not merge post-cutover writes into the old database without an approved reconciliation plan.

The untouched supplied archive and SQL dump remain the development baseline; production rollback must use fresh deployment-time backups.

