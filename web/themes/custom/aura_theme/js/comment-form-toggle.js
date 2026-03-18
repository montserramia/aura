(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.auraCommentFormToggle = {
    attach: function (context) {
      once('aura-comment-form-toggle', '.article-comments', context).forEach(function (section) {
        var toggleLink = section.querySelector('.comment-toggle-link');
        if (!toggleLink) {
          return;
        }

        var form = section.querySelector('.comment-form-wrapper form.comment-form') ||
          section.querySelector('.comment-form-wrapper form[id*="comment-form"]');

        if (!form) {
          toggleLink.style.display = 'none';
          return;
        }

        form.classList.add('is-collapsed');

        var openForm = function () {
          form.classList.remove('is-collapsed');
          toggleLink.setAttribute('aria-expanded', 'true');
          toggleLink.textContent = Drupal.t('Tanca el formulari de comentari');
        };

        var closeForm = function () {
          form.classList.add('is-collapsed');
          toggleLink.setAttribute('aria-expanded', 'false');
          toggleLink.textContent = Drupal.t('Escriu el teu comentari');
        };

        closeForm();

        toggleLink.addEventListener('click', function (event) {
          event.preventDefault();
          if (form.classList.contains('is-collapsed')) {
            openForm();
            var firstInput = form.querySelector('textarea, input[type="text"], input[type="email"]');
            if (firstInput) {
              firstInput.focus();
            }
          }
          else {
            closeForm();
          }
        });

      });
    }
  };
})(Drupal, once);
