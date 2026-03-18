/**
 * @file
 * Scroll suau per als enllaços del menú primary navigation
 * Quan es clica un enllaç amb anchor (#id), fa scroll suau fins al bloc
 */

(function (Drupal) {
  'use strict';

  Drupal.behaviors.auraSmoothScroll = {
    attach: function (context, settings) {
      // Seleccionar enllaços del menú que apunten a una secció de la mateixa pàgina.
      const menuLinks = context.querySelectorAll('#primary-navigation a[href*="#"]');
      
      menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          const rawHref = this.getAttribute('href');

          if (!rawHref || rawHref.indexOf('#') === -1) {
            return;
          }

          const currentUrl = new URL(window.location.href);
          const linkUrl = new URL(rawHref, window.location.origin);

          // Només fem scroll suau si el link apunta a la pàgina actual.
          if (linkUrl.pathname !== currentUrl.pathname) {
            return;
          }

          const targetId = linkUrl.hash;
          if (!targetId) {
            return;
          }

          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Calcular l'offset del header fix (si n'hi ha)
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 0;
            
            // Posició del target
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - 20; // 20px extra d'espai
            
            // Fer scroll suau
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Actualitzar la URL sense fer scroll
            history.pushState(null, null, targetId);
          }
        });
      });
    }
  };

})(Drupal);
