<?php

declare(strict_types=1);

use Drupal\Core\Database\Database;
use Drupal\Core\Site\Settings;

/**
 * @file
 * Verifies preserved UAT runtime values without displaying them.
 */

$checks = [];
$checks['database'] = (int) Database::getConnection()->query('SELECT 1')->fetchField() === 1;
$checks['hash_salt'] = Settings::getHashSalt() !== '';
$checks['trusted_hosts'] = (array) Settings::get('trusted_host_patterns', []) !== [];
$checks['private_files'] = is_string(Settings::get('file_private_path')) && Settings::get('file_private_path') !== '';

$smtp = \Drupal::config('smtp.settings');
$checks['smtp_host'] = (string) $smtp->get('smtp_host') !== '';
$checks['smtp_username'] = (string) $smtp->get('smtp_username') !== '';
$checks['smtp_password'] = (string) $smtp->get('smtp_password') !== '';

$key_value = NULL;
if (\Drupal::hasService('key.repository')) {
  $key = \Drupal::service('key.repository')->getKey('avnl_encryption_key');
  $key_value = $key?->getKeyValue(TRUE);
}
$checks['tfa_encryption_key'] = is_string($key_value) && strlen($key_value) === 32;

$failed = [];
foreach ($checks as $name => $passed) {
  fwrite(STDOUT, sprintf("%-24s %s\n", $name, $passed ? 'PASS' : 'FAIL'));
  if (!$passed) {
    $failed[] = $name;
  }
}
if ($failed !== []) {
  throw new RuntimeException('UAT runtime verification failed. Do not import configuration or switch traffic.');
}
fwrite(STDOUT, "No credential values were displayed.\n");
