/**
 * Article Statistics and Interactions
 * - Track view count
 * - Handle like button
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.articleStats = {
    attach: function (context, settings) {
      // Increment view count (només si és vista completa, no teaser)
      if (settings.articleStats && settings.articleStats.nid) {
        var nid = settings.articleStats.nid;
        
        // Marcar com a vist per evitar múltiples comptatges en la mateixa sessió
        var viewedKey = 'article_viewed_' + nid;
        if (!sessionStorage.getItem(viewedKey)) {
          sessionStorage.setItem(viewedKey, '1');
          
          // Fer petició AJAX per incrementar el comptador
          fetch('/aura/track-view/' + nid, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nid: nid }),
          })
          .then(function (response) {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error tracking view');
          })
          .then(function (data) {
            // Actualitzar el comptador visualment
            var statCount = document.querySelector('.stat-views .stat-count');
            if (statCount && data.new_count !== undefined) {
              statCount.textContent = data.new_count;
            }
          })
          .catch(function (error) {
            console.log('View tracking:', error);
          });
        }
      }

      // Handle like button
      var likeBtn = once('like-btn', '.like-btn', context);
      if (likeBtn.length > 0) {
        likeBtn.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            
            var nid = settings.articleStats ? settings.articleStats.nid : null;
            if (!nid) return;

            // Enviar like via AJAX
            fetch('/aura/track-like/' + nid, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nid: nid }),
            })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Error tracking like');
            })
            .then(function (data) {
              // Actualitzar el comptador
              var likeCount = btn.querySelector('.like-count');
              if (likeCount && data.new_count !== undefined) {
                likeCount.textContent = data.new_count;
              }
              
              // Toggle classe visual de "liked"
              btn.classList.toggle('is-liked');
              
              // Guardar estat a localStorage (per usuaris anònims)
              var likedKey = 'article_liked_' + nid;
              if (btn.classList.contains('is-liked')) {
                localStorage.setItem(likedKey, '1');
              } else {
                localStorage.removeItem(likedKey);
              }
            })
            .catch(function (error) {
              console.log('Like tracking:', error);
            });
          });

          // Check if user already liked this article (localStorage)
          var likedKey = 'article_liked_' + settings.articleStats.nid;
          if (localStorage.getItem(likedKey)) {
            btn.classList.add('is-liked');
          }
        });
      }
    },
  };
})(Drupal, once);
