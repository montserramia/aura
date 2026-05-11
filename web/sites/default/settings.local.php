<?php

$databases['default']['default'] = [
  'database' => 'aura_drupal',
  'username' => 'aura_Admin',
  'password' => 'M0nts3rramia',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

$settings['hash_salt'] = 'b5217f7761ae7551f638fe2dd569fb6601ac2c7616029184981d70eda1136cc0';

/**
 * Configuració de rutes de fitxers per a Producció (AURA Security Standard)
 */
$settings['file_private_path'] = '/home/aura-ai.eu/public_html/private';
$settings['file_temp_path'] = '/home/aura-ai.eu/public_html/tmp';

// Assegura que els patrons de confiança incloguin el domini principal
$settings['trusted_host_patterns'] = [
  '^aura-ai\.eu$',
  '^www\.aura-ai\.eu$',
  '^stats\.aura-ai\.eu$', // Afegim també el subdomini de stats per seguretat
];

$settings['config_sync_directory'] = '../config/sync';

$settings['trusted_host_patterns'] = [
  '^aura-ai\.eu$',
  '^www\.aura-ai\.eu$',
  '^stats\.aura-ai\.eu$',
];

$config['locale.settings']['translation']['use_source'] = 'remote_and_local';
$config['locale.settings']['translation']['import_enabled'] = FALSE;
