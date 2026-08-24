#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 CURRENT_DRUPAL_ROOT NEW_RELEASE_DRUPAL_ROOT" >&2
  exit 64
fi

current_root="$(cd "$1" && pwd -P)"
new_root="$(cd "$2" && pwd -P)"

if [[ ! -f "$current_root/vendor/bin/drush.php" ]]; then
  echo "Current release Drush was not found." >&2
  exit 66
fi
if [[ ! -f "$new_root/sites/default/settings.php" ]]; then
  echo "New AVNL Drupal release was not found." >&2
  exit 66
fi

chmod u+w "$new_root/sites/default"
restore_permissions() {
  chmod u-w "$new_root/sites/default" 2>/dev/null || true
}
trap restore_permissions EXIT

AVNL_TARGET_RELEASE_ROOT="$new_root" \
  php -d memory_limit=1G "$current_root/vendor/bin/drush.php" \
  --root="$current_root" \
  php:script "$new_root/scripts/capture-uat-runtime.php"

restore_permissions
trap - EXIT
echo "Runtime preservation completed. No credential values were printed."
