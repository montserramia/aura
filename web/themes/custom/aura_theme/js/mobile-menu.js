/**
 * @file
 * Toggle per al menú mòbil (hamburguesa)
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.auraMobileMenu = {
    attach: function (context, settings) {
      var navigation = document.getElementById('primary-navigation');
      if (!navigation) {
        return;
      }

      once('aura-mobile-menu-toggle', '.mobile-menu-toggle', context).forEach(function (toggle) {
        toggle.addEventListener('click', function () {
          var isOpen = navigation.classList.contains('is-open');

          if (isOpen) {
            navigation.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
          } else {
            navigation.classList.add('is-open');
            toggle.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
          }
        });
      });

      once('aura-mobile-menu-links', '#primary-navigation a', context).forEach(function (link) {
        link.addEventListener('click', function () {
          var toggle = document.querySelector('.mobile-menu-toggle');
          if (!toggle) {
            return;
          }
          navigation.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        });
      });
    }
  };

})(Drupal, once);
