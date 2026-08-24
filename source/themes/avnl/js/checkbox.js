/**
 * @file
 * Customization of checkbox.
 */


(function() {
  if (typeof Drupal !== 'undefined' && Drupal.theme) {
    /**
     * Constructs a checkbox input element.
     *
     * @return {string}
     *   A string representing a DOM fragment.
     */
    Drupal.theme.checkbox = function() {
      return '<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox"/>';
    };
  }
})();
