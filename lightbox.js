(function () {
  'use strict';

  var overlay = document.getElementById('lb-overlay');
  if (!overlay) return;

  var imgEl    = document.getElementById('lb-img');
  var caption  = document.getElementById('lb-caption');
  var counter  = document.getElementById('lb-counter');
  var closeBtn = document.getElementById('lb-close');
  var prevBtn  = document.getElementById('lb-prev');
  var nextBtn  = document.getElementById('lb-next');

  var triggers = Array.from(document.querySelectorAll('.lb-trigger'));
  var items = triggers.map(function (img) {
    return {
      src: img.getAttribute('src'),
      caption: img.dataset.caption || img.getAttribute('alt') || ''
    };
  });
  var current = 0;

  function show(i) {
    current = (i + items.length) % items.length;
    var item = items[current];
    imgEl.src = item.src;
    caption.textContent = item.caption;
    counter.textContent = (current + 1) + ' / ' + items.length;
  }

  function open(i) {
    show(i);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(function (img, i) {
    img.addEventListener('click', function () { open(i); });
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });
  if (closeBtn) closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });
}());
