# Performance Review

The upgrade preserves Drupal Page Cache, Dynamic Page Cache, BigPipe, CSS aggregation, and JavaScript aggregation. Custom code that forced zero cache lifetime on the primary menu, breadcrumbs, and inner-banner block was removed; Drupal cache contexts/tags now control invalidation.

Local warm-cache HTTP smoke timings on the isolated database were: homepage 0.10 s, login 0.26 s, archives 0.08 s, search 0.07 s, and sitemap 0.18 s. These are development-machine observations, not production capacity benchmarks.

The homepage returned `Cache-Control: max-age=86400, public` and a Dynamic Page Cache hit during validation. Production should add PHP OPcache, HTTP/2 or HTTP/3, compression, a reverse proxy/CDN as approved, database slow-query monitoring, log rotation, and capacity/load tests using expected traffic and infrastructure.

