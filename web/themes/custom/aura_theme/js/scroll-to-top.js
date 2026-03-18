/**
 * @file
 * Botó flotant per tornar a dalt amb animació suau.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.auraScrollToTop = {
    attach: function (context) {
      once('aura-scroll-to-top', '.scroll-to-top', context).forEach(function (btn) {
        var threshold = 300;

        window.addEventListener('scroll', function () {
          if (window.scrollY > threshold) {
            btn.classList.add('is-visible');
          } else {
            btn.classList.remove('is-visible');
          }
        }, { passive: true });

        btn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  };

})(Drupal, once);
