<?php

/**
 * @file
 * Post update functions for avnl.
 */

/**
 * Sets the default `base_primary_color` value of avnl's theme settings.
 */
function avnl_post_update_add_avnl_primary_color() {
  \Drupal::configFactory()->getEditable('avnl.settings')
    ->set('base_primary_color', '#1b9ae4')
    ->save();
}
