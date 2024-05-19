<?php
// @formatter:off
/**
 * Plugin Name: DearPDF Lite
 * Description: PDF Viewer for WordPress
 * Version: 2.0.38
 *
 * Text Domain: dearpdf-lite
 * Author: DearHive
 * Author URI: http://dearhive.com/
 *
 */
// @formatter:on

// Do not allow direct file access
if (!defined('ABSPATH')) {
  exit('Direct script access denied.');
}

require_once dirname( __FILE__ ) . '/dearpdf.php';

//Load the DearPDF Plugin Class
$dearpdf = DearPDF::get_instance();

function dearpdf_lite_plugin_activated() {
  
  deactivate_plugins( 'dearpdf-pro/dearpdf-pro.php' );
  
}
/**
 * Load plugin textdomain.
 */
function dearpdf_lite_load_textdomain() {
  load_plugin_textdomain( 'dearpdf-lite', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}

add_action( 'init', 'dearpdf_lite_load_textdomain' );

register_activation_hook( __FILE__, 'dearpdf_lite_plugin_activated' );
