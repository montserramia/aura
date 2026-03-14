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
        }
      });
    }
  };

})(Drupal);
