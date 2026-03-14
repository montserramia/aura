/**
 * @file
 * Amagar la regió highlighted quan està buida
 */

(function (Drupal) {
  'use strict';

  Drupal.behaviors.auraHideEmptyHighlighted = {
    attach: function (context, settings) {
      // Trobar totes les regions highlighted
      const highlightedRegions = context.querySelectorAll('.region-highlighted, .highlighted');

      highlightedRegions.forEach(function(region) {
        // Comprovar si té contingut visible
        const hasVisibleContent = region.querySelector(':scope > *:not(.hidden):not(:empty), :scope > *:not(.hidden) > *:not(:empty)');
        
        // Si no té contingut visible, amagar-ho
        if (!hasVisibleContent) {
          region.style.setProperty('display', 'none', 'important');
          region.style.setProperty('visibility', 'hidden', 'important');
          region.style.setProperty('height', '0', 'important');
          region.style.setProperty('margin', '0', 'important');
          region.style.setProperty('padding', '0', 'important');
          
          // També amagar el contenidor pare (.highlighted)
          const parentHighlighted = region.closest('.highlighted');
          if (parentHighlighted && parentHighlighted !== region) {
            parentHighlighted.style.setProperty('display', 'none', 'important');
            parentHighlighted.style.setProperty('visibility', 'hidden', 'important');
            parentHighlighted.style.setProperty('height', '0', 'important');
            parentHighlighted.style.setProperty('margin', '0', 'important');
            parentHighlighted.style.setProperty('padding', '0', 'important');
          }
        }
      });
    }
  };

  // Comportament per al botó de compartir als teasers
  Drupal.behaviors.auraTeaserShare = {
    attach: function (context, settings) {
      const shareToggles = context.querySelectorAll('.share-toggle');
      
      shareToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          const shareOptions = this.nextElementSibling;
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          
          // Tancar tots els altres
          document.querySelectorAll('.share-options').forEach(function(opt) {
            if (opt !== shareOptions) {
              opt.setAttribute('hidden', '');
            }
          });
          document.querySelectorAll('.share-toggle').forEach(function(t) {
            if (t !== this) {
              t.setAttribute('aria-expanded', 'false');
            }
          });
          
          // Toggle actual
          if (isExpanded) {
            shareOptions.setAttribute('hidden', '');
            this.setAttribute('aria-expanded', 'false');
          } else {
            shareOptions.removeAttribute('hidden');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      });
      
      // Tancar menús en clicar fora
      document.addEventListener('click', function() {
        document.querySelectorAll('.share-options').forEach(function(opt) {
          opt.setAttribute('hidden', '');
        });
        document.querySelectorAll('.share-toggle').forEach(function(toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  };

})(Drupal);
