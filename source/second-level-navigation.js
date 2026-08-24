/**
 * @file
 * Keyboard and pointer support for AVNL main navigation submenus.
 */

(function () {
  const nav =
    document.getElementById('block-avnl-main-menu') ||
    (document.getElementById('nav') &&
      document.getElementById('nav').closest('nav'));

  if (!nav) {
    return;
  }

  const menuParents = Array.from(nav.querySelectorAll('li')).filter((item) =>
    item.querySelector(':scope > ul.menu'),
  );

  const getToggleButton = (item) =>
    item.querySelector(
      ':scope > span button[data-drupal-selector="primary-nav-submenu-toggle-button"], :scope > button[data-drupal-selector="primary-nav-submenu-toggle-button"]',
    );

  const getTriggerLink = (item) => item.querySelector(':scope > a');

  const isDesktopNav = () => {
    if (window.Drupal && Drupal.olivero && Drupal.olivero.isDesktopNav) {
      return Drupal.olivero.isDesktopNav();
    }

    return window.matchMedia('(min-width: 1200px)').matches;
  };

  const setDirectSubmenuLinksTabbable = (item, enabled) => {
    item.querySelectorAll(':scope > ul.menu > li > a').forEach((link) => {
      if (enabled) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  };

  const setExpandedState = (item, expanded) => {
    const triggerLink = getTriggerLink(item);
    const toggleButton = getToggleButton(item);

    item.classList.toggle('avnl-keyboard-open', expanded);
    item.classList.toggle('focus', expanded);

    if (triggerLink) {
      triggerLink.setAttribute('aria-haspopup', 'true');
      triggerLink.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggleButton.setAttribute('tabindex', '-1');
      toggleButton.setAttribute('aria-hidden', 'true');
    }

    if (expanded) {
      setDirectSubmenuLinksTabbable(item, true);
    } else {
      item.querySelectorAll(':scope > ul.menu a').forEach((link) => {
        link.setAttribute('tabindex', '-1');
      });
    }
  };

  function closeAllSubNav() {
    menuParents.forEach((item) => {
      setExpandedState(item, false);
      item.classList.remove('hover', 'is-touch-event');
    });
  }

  function toggleSubNav(item, toState) {
    if (!item || !item.querySelector(':scope > ul.menu')) {
      return;
    }

    const expanded =
      typeof toState === 'boolean'
        ? toState
        : !item.classList.contains('avnl-keyboard-open');

    if (expanded && isDesktopNav()) {
      menuParents.forEach((otherItem) => {
        if (otherItem !== item && !otherItem.contains(item)) {
          setExpandedState(otherItem, false);
          otherItem.classList.remove('hover');
        }
      });
    }

    setExpandedState(item, expanded);
  }

  const openPathTo = (element) => {
    const path = [];
    let item = element.closest('li');

    while (item && nav.contains(item)) {
      path.unshift(item);
      item = item.parentElement.closest('li');
    }

    closeAllSubNav();

    path.forEach((pathItem) => {
      if (pathItem.querySelector(':scope > ul.menu')) {
        setExpandedState(pathItem, true);
      }
    });
  };

  menuParents.forEach((item) => {
    const triggerLink = getTriggerLink(item);
    const toggleButton = getToggleButton(item);

    if (triggerLink) {
      triggerLink.setAttribute('aria-haspopup', 'true');
      triggerLink.setAttribute('aria-expanded', 'false');
    }

    if (toggleButton) {
      toggleButton.setAttribute('tabindex', '-1');
      toggleButton.setAttribute('aria-hidden', 'true');
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleSubNav(item);
      });
    }

    item.addEventListener(
      'touchstart',
      () => {
        item.classList.add('is-touch-event');
      },
      { passive: true },
    );

    item.addEventListener('mouseover', () => {
      if (isDesktopNav() && !item.classList.contains('is-touch-event')) {
        item.classList.add('hover');
        toggleSubNav(item, true);
      }
    });

    item.addEventListener('mouseout', () => {
      if (isDesktopNav() && !item.contains(document.activeElement)) {
        item.classList.remove('hover');
        toggleSubNav(item, false);
      }
    });
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('focus', () => {
      openPathTo(link);
    });

    link.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAllSubNav();
        link.focus();
      }
    });
  });

  document.addEventListener('focusin', (event) => {
    if (!nav.contains(event.target)) {
      closeAllSubNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
      closeAllSubNav();
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeAllSubNav();
    }
  });

  closeAllSubNav();

  if (window.Drupal) {
    Drupal.olivero = Drupal.olivero || {};
    Drupal.olivero.toggleSubNav = toggleSubNav;
    Drupal.olivero.closeAllSubNav = closeAllSubNav;
    Drupal.olivero.areAnySubNavsOpen = () =>
      menuParents.some((item) => item.classList.contains('avnl-keyboard-open'));
  }
})();
