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
  const topLevelList = nav.querySelector(':scope > ul.menu') || nav.querySelector('ul.menu');
  const topLevelItems = topLevelList
    ? Array.from(topLevelList.children).filter((item) => item.matches('li'))
    : [];

  const getToggleButton = (item) =>
    item.querySelector(
      ':scope > span button[data-drupal-selector="primary-nav-submenu-toggle-button"], :scope > button[data-drupal-selector="primary-nav-submenu-toggle-button"], [data-drupal-selector="primary-nav-submenu-toggle-button"]',
    );

  const getTriggerLink = (item) => item.querySelector(':scope > a');

  const isPlaceholderLink = (link) => {
    if (!link) {
      return false;
    }

    const href = (link.getAttribute('href') || '').trim().toLowerCase();
    return href === '' || href === '#' || href === '#nolink' || href === '#no-link';
  };

  const getTopLevelItem = (element) =>
    element ? topLevelItems.find((item) => item.contains(element)) || null : null;

  let suppressOpenForLink = null;

  const isVisibleLink = (link) => {
      const style = window.getComputedStyle(link);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        link.getClientRects().length > 0 &&
        !link.closest('[aria-hidden="true"]')
      );
  };

  const getSubmenuLinks = (item) =>
    Array.from(item.querySelectorAll(':scope > ul.menu a[href]:not([tabindex="-1"])')).filter(isVisibleLink);

  const getPageFocusableItems = () =>
    Array.from(
      document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [role="button"], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => {
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        element.getClientRects().length > 0 &&
        !element.closest('[aria-hidden="true"]')
      );
    });

  const focusWithoutOpening = (link) => {
    if (!link) {
      return false;
    }

    suppressOpenForLink = link;
    link.focus();
    return true;
  };

  const focusAdjacentPageItem = (fromElement, reverse) => {
    const items = getPageFocusableItems();
    const currentIndex = items.indexOf(fromElement);
    const nextItem = items[currentIndex + (reverse ? -1 : 1)];

    if (nextItem) {
      nextItem.focus();
      return true;
    }

    return false;
  };

  const focusSiblingTopLevelLink = (item, reverse) => {
    const topItems = topLevelItems.filter((candidate) =>
      candidate.querySelector(':scope > a'),
    );
    const currentTopItem = getTopLevelItem(item) || item;
    const currentIndex = topItems.indexOf(currentTopItem);
    const nextItem = topItems[currentIndex + (reverse ? -1 : 1)];
    const nextLink = nextItem && getTriggerLink(nextItem);

    if (nextLink) {
      nextLink.focus();
      return;
    }

    const currentTopLink = getTriggerLink(currentTopItem);
    focusAdjacentPageItem(currentTopLink || nav, reverse);
  };

  const focusCurrentTopLevelLink = (item) => {
    const currentTopItem = getTopLevelItem(item) || item;
    const currentTopLink = getTriggerLink(currentTopItem);
    focusWithoutOpening(currentTopLink);
  };

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

    // Keep the active branch visible while focus moves into it. Closing every
    // submenu here briefly hides the newly focused link, which makes Chrome
    // and Edge move focus back to the document body.
    menuParents.forEach((menuParent) => {
      if (!path.includes(menuParent)) {
        setExpandedState(menuParent, false);
        menuParent.classList.remove('hover', 'is-touch-event');
      }
    });

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

      if (isPlaceholderLink(triggerLink)) {
        triggerLink.addEventListener('click', (event) => {
          event.preventDefault();
          toggleSubNav(item);
        });
      }
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
      if (suppressOpenForLink === link || window.avnlSuppressNextSubmenuOpen) {
        suppressOpenForLink = null;
        window.avnlSuppressNextSubmenuOpen = false;
        return;
      }

      openPathTo(link);
    });

    link.addEventListener('keydown', (event) => {
      const parentItem = link.closest('li');
      const openParent = parentItem && parentItem.closest('li.avnl-keyboard-open, li.focus, li.hover');
      const triggerLink = parentItem && getTriggerLink(parentItem);
      const directSubmenuLinks = parentItem
        ? Array.from(
            parentItem.querySelectorAll(
              ':scope > ul.menu > li > a[href]:not([tabindex="-1"])',
            ),
          ).filter(isVisibleLink)
        : [];

      if (event.key === 'Escape') {
        event.preventDefault();
        closeAllSubNav();
        focusCurrentTopLevelLink(openParent || parentItem);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      // Move into an open submenu explicitly. Chrome and Edge can otherwise
      // lose focus when the legacy focus handler updates the parent classes.
      if (!event.shiftKey && link === triggerLink && directSubmenuLinks.length) {
        event.preventDefault();
        event.stopPropagation();
        toggleSubNav(parentItem, true);
        directSubmenuLinks[0].focus();
        return;
      }

      if (window.avnlSuppressNextSubmenuOpen) {
        window.avnlSuppressNextSubmenuOpen = false;
        closeAllSubNav();
        return;
      }

      if (!openParent || !nav.contains(openParent)) {
        return;
      }

      const submenuLinks = getSubmenuLinks(openParent);
      const firstLink = submenuLinks[0];
      const lastLink = submenuLinks[submenuLinks.length - 1];
      const topLevelLink = getTriggerLink(getTopLevelItem(openParent) || openParent);
      const isTopLevelSubmenu = topLevelItems.includes(openParent);

      // Nested menus stay in the document's natural tab order so focus can
      // continue to the next sibling item in the containing submenu.
      if (!isTopLevelSubmenu) {
        return;
      }

      if (event.shiftKey && link === firstLink) {
        event.preventDefault();
        closeAllSubNav();
        focusWithoutOpening(topLevelLink);
      } else if (!event.shiftKey && link === lastLink) {
        event.preventDefault();
        closeAllSubNav();
        focusSiblingTopLevelLink(openParent, false);
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
