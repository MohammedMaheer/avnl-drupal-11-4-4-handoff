<?php

declare(strict_types=1);

use Drupal\Core\Database\Database;
use Drupal\Core\Site\Settings;

/**
 * @file
 * Captures the existing UAT runtime settings without displaying secret values.
 *
 * Run this script through the CURRENT site's Drush before importing the new
 * release configuration. AVNL_TARGET_RELEASE_ROOT must point to the extracted
 * new release's Drupal root.
 */

if (!class_exists(Settings::class) || !class_exists(Database::class) || !\Drupal::hasService('config.factory')) {
  throw new RuntimeException('This script must run through a bootstrapped Drupal/Drush site.');
}

$target_root_input = getenv('AVNL_TARGET_RELEASE_ROOT');
if ($target_root_input === FALSE || trim($target_root_input) === '') {
  throw new RuntimeException('AVNL_TARGET_RELEASE_ROOT must point to the extracted new Drupal release.');
}

$target_root = realpath($target_root_input);
if ($target_root === FALSE || !is_file($target_root . '/sites/default/settings.php')) {
  throw new RuntimeException('The target release is not a valid extracted AVNL Drupal root.');
}

$target_site_dir = $target_root . '/sites/default';
if (!is_writable($target_site_dir)) {
  throw new RuntimeException('The target sites/default directory must be writable during the preservation step.');
}

$connection_info = Database::getConnectionInfo('default')['default'] ?? [];
$database = [];
foreach (['database', 'username', 'password', 'host', 'port', 'prefix', 'unix_socket'] as $name) {
  if (array_key_exists($name, $connection_info)) {
    $database[$name] = $connection_info[$name];
  }
}
foreach (['database', 'username', 'host'] as $required_name) {
  if (!isset($database[$required_name]) || $database[$required_name] === '') {
    throw new RuntimeException("Unable to capture the active database setting: {$required_name}.");
  }
}

$runtime_settings = [];
foreach ([
  'trusted_host_patterns',
  'file_public_path',
  'file_private_path',
  'file_temp_path',
  'config_sync_directory',
  'locale_translation_path',
  'reverse_proxy',
  'reverse_proxy_addresses',
  'reverse_proxy_trusted_headers',
] as $name) {
  $value = Settings::get($name);
  if ($value !== NULL) {
    $runtime_settings[$name] = $value;
  }
}

$hash_salt = Settings::getHashSalt();
$smtp = \Drupal::config('smtp.settings')->getRawData();

$encryption_key = NULL;
if (\Drupal::hasService('key.repository')) {
  $key = \Drupal::service('key.repository')->getKey('avnl_encryption_key');
  if ($key !== NULL) {
    $encryption_key = $key->getKeyValue(TRUE);
  }
}
if (!is_string($encryption_key) || $encryption_key === '') {
  throw new RuntimeException('The existing AVNL/TFA encryption key could not be resolved; no file was written.');
}

$secret_file = getenv('AVNL_RUNTIME_SECRETS_FILE');
if ($secret_file === FALSE || trim($secret_file) === '') {
  $private_path = $runtime_settings['file_private_path'] ?? '';
  if (is_string($private_path) && str_starts_with($private_path, 'private://')) {
    $resolved_private_path = \Drupal::service('file_system')->realpath('private://');
    $private_path = is_string($resolved_private_path) ? $resolved_private_path : '';
  }
  if (!is_string($private_path) || $private_path === '' || !str_starts_with($private_path, DIRECTORY_SEPARATOR)) {
    $private_path = dirname($target_root) . '/private';
  }
  $secret_file = rtrim($private_path, DIRECTORY_SEPARATOR) . '/avnl-runtime-secrets.php';
}

$secret_dir = dirname($secret_file);
if (!is_dir($secret_dir) && !mkdir($secret_dir, 0750, TRUE) && !is_dir($secret_dir)) {
  throw new RuntimeException('Unable to create the protected runtime-secrets directory.');
}
$resolved_secret_dir = realpath($secret_dir);
if ($resolved_secret_dir === FALSE || str_starts_with($resolved_secret_dir . DIRECTORY_SEPARATOR, $target_root . DIRECTORY_SEPARATOR)) {
  throw new RuntimeException('The runtime-secrets file must be stored outside the Drupal document root.');
}
if (is_link($secret_file)) {
  throw new RuntimeException('Refusing to replace a symbolic-link runtime-secrets file.');
}

$payload = [
  'format' => 1,
  'captured_at_utc' => gmdate(DATE_ATOM),
  'database' => $database,
  'hash_salt' => $hash_salt,
  'settings' => $runtime_settings,
  'session_cookie_domain' => (string) ini_get('session.cookie_domain'),
  'smtp' => $smtp,
  'encryption_key_base64' => base64_encode($encryption_key),
];

$secret_contents = "<?php\n\n// Generated on the target. Never commit or transfer this file.\nreturn "
  . var_export($payload, TRUE) . ";\n";
$secret_temp = $secret_file . '.tmp-' . bin2hex(random_bytes(6));
if (file_put_contents($secret_temp, $secret_contents, LOCK_EX) === FALSE) {
  throw new RuntimeException('Unable to write the protected runtime-secrets file.');
}
chmod($secret_temp, 0640);
if (is_file($secret_file)) {
  $previous_file = $secret_file . '.previous-' . gmdate('Ymd-His');
  if (!rename($secret_file, $previous_file)) {
    throw new RuntimeException('Unable to preserve the previous runtime-secrets file.');
  }
  chmod($previous_file, 0600);
}
if (!rename($secret_temp, $secret_file)) {
  throw new RuntimeException('Unable to activate the protected runtime-secrets file.');
}

$locator_file = $target_site_dir . '/avnl.runtime-locator.php';
$locator_contents = "<?php\n\n// Generated during UAT deployment; contains no credential value.\nreturn "
  . var_export($secret_file, TRUE) . ";\n";
$locator_temp = $locator_file . '.tmp-' . bin2hex(random_bytes(6));
if (file_put_contents($locator_temp, $locator_contents, LOCK_EX) === FALSE) {
  throw new RuntimeException('Unable to write the runtime-secrets locator.');
}
chmod($locator_temp, 0640);
if (!rename($locator_temp, $locator_file)) {
  throw new RuntimeException('Unable to activate the runtime-secrets locator.');
}

$loaded_payload = require $secret_file;
if (!is_array($loaded_payload) || ($loaded_payload['format'] ?? NULL) !== 1) {
  throw new RuntimeException('Runtime-secrets verification failed.');
}

fwrite(STDOUT, "AVNL UAT runtime preservation: PASS\n");
fwrite(STDOUT, "Captured without disclosure: database connection, hash salt, host/path/proxy settings, cookie domain, SMTP configuration, and TFA encryption key.\n");
fwrite(STDOUT, "Protected file: {$secret_file}\n");
fwrite(STDOUT, "Locator installed in the new release. Verify PHP can read the protected file before switching traffic.\n");
