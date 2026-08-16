(function(){
  'use strict';

  // Navbar collapse (replaces Bootstrap's collapse plugin)
  var toggle = document.querySelector('.navbar-toggle');
  if (toggle){
    var target = document.querySelector(toggle.getAttribute('data-target'));
    if (target){
      toggle.addEventListener('click', function(){
        var open = target.classList.toggle('in');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }

  // Share box
  document.addEventListener('click', function(e){
    var link = e.target.closest('.article-share-link');
    if (link){
      e.preventDefault();
      var id = 'article-share-box-' + link.getAttribute('data-id');
      var box = document.getElementById(id);

      if (box && box.classList.contains('on')){
        box.classList.remove('on');
        return;
      }

      document.querySelectorAll('.article-share-box.on').forEach(function(b){
        b.classList.remove('on');
      });

      if (!box){
        var url = link.getAttribute('data-url');
        var encodedUrl = encodeURIComponent(url);
        box = document.createElement('div');
        box.id = id;
        box.className = 'article-share-box';
        box.innerHTML =
          '<input class="article-share-input" value="' + url + '">' +
          '<div class="article-share-links">' +
            '<a href="https://x.com/intent/post?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" rel="noopener" title="X"></a>' +
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" rel="noopener" title="Facebook"></a>' +
            '<a href="https://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" rel="noopener" title="Pinterest"></a>' +
          '</div>';
        document.body.appendChild(box);
        box.addEventListener('click', function(ev){
          ev.stopPropagation();
        });
        box.querySelector('.article-share-input').addEventListener('click', function(){
          this.select();
        });
      }

      var rect = link.getBoundingClientRect();
      box.style.top = (rect.top + window.scrollY + 25) + 'px';
      box.style.left = (rect.left + window.scrollX) + 'px';
      box.classList.add('on');
      e.stopPropagation();
      return;
    }

    if (!e.target.closest('.article-share-box')){
      document.querySelectorAll('.article-share-box.on').forEach(function(b){
        b.classList.remove('on');
      });
    }
  });

  // Responsive tables for post/page content
  document.querySelectorAll('.article-entry table').forEach(function(table){
    if (table.closest('.table-responsive') || table.closest('figure.highlight')) return;
    table.classList.add('table');
    var wrap = document.createElement('div');
    wrap.className = 'table-responsive';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
})();
