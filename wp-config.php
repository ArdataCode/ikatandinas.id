<?php

//Begin Really Simple SSL session cookie settings
@ini_set('session.cookie_httponly', true);
@ini_set('session.cookie_secure', true);
@ini_set('session.use_only_cookies', true);
//END Really Simple SSL cookie settings
define( 'WP_CACHE', false ); 
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', "landingu_iktaandinasss");
/** MySQL database username */
define('DB_USER', "landingu_iktaandnas");
/** MySQL database password */
define('DB_PASSWORD', "Ardata2024");
/** MySQL hostname */
define('DB_HOST', "localhost");
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
 * Authentication Unique Keys and Salts.
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 */
trim(('wp-salt.php'));
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';
/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('FS_METHOD','direct');
define('WPLANG', '');
define('FS_CHMOD_DIR', (0775 & ~ umask()));
define('FS_CHMOD_FILE', (0664 & ~ umask()));
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define( 'WP_DEBUG', false );
#define( 'WP_PLUGIN_DIR', '/home/ujianori/ikatandinas.id/wp-content/plugins' );
define( 'DUPLICATOR_AUTH_KEY', ')#GIwU+H}1qwlmnTG3)Lcfw!J83t_JAOP.R4.[*`NW~dCde>8gEQc@AdM<K[>d-D' );
define( 'AUTH_KEY', 'LMxYmcya9Cmj9xbbTdz9H8MKR5NByvQnIFBz915LahbyjwKLBbsI6GwrqTKc9qxo' );
define( 'SECURE_AUTH_KEY', 'x8A9EQior5uPSLQhKeUpeGBos9L8mHumG54UJ7GCLgTzQBFQbmT26Kj9KccXJFX8' );
define( 'LOGGED_IN_KEY', 'HIQhFxfABQ4LLbnaL2CuFgMs5NCnabAg21yvVwfsAW9eG4L71BhanN1QGtp69jpC' );
define( 'NONCE_KEY', 'V9W9x3FBGEbGhB3pTrecHprFD7oVWwja2BNLAPg08EcGV7fyEpzoztMYjsbu0K0I' );
define( 'AUTH_SALT', 'jm90stptp2eYTyTA6X8Bo7yprc69I2or69pSu85LLq0T2B7wtJFsB2110peF5V4w' );
define( 'SECURE_AUTH_SALT', 'LrsAGLSMhp32pa95eun3fUgBV9xg6wRpV7dpnJ7u0Bq9HpM3JK4gigQuLdPn59Jc' );
define( 'LOGGED_IN_SALT', 'MV0JBa4TIzKA4Ww2Ub7B7dg8x1IYAdiWB5PDDcIdrEPLf51bAW8WDtKMdxwhwffW' );
define( 'NONCE_SALT', 'RqQV7Aq3vDzCKqtxgxmCJGguFSg7eh5ILVnreWMcXsgWaExh3I8pXJ5DSD1MPJux' );
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
        define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');