(function (Drupal, once) {
  Drupal.behaviors.avnlDisablePassword = {
    attach: function (context) {
      once('avnlDisablePassword', 'input[name="pass"]', context).forEach(function (el) {
        // Disable autocomplete (stops password managers)
        el.setAttribute('autocomplete', 'new-password');
        // Block paste, copy, cut, drop, and right-click
        ['paste', 'copy', 'cut', 'drop', 'contextmenu'].forEach(evt => {
          el.addEventListener(evt, e => e.preventDefault());
        });
        // Block keyboard shortcuts (Ctrl/Cmd + V/C/X)
        el.addEventListener('keydown', function (e) {
          if ((e.ctrlKey || e.metaKey) && ['v', 'c', 'x'].includes(e.key.toLowerCase())) {
            e.preventDefault();
          }
        });
      });
    }
  };
})(Drupal, once);