  // ============ MOBILE NAV TOGGLE ============
  (function(){
    var btn = document.getElementById('navToggle');
    var menu = document.getElementById('navLinks');
    if(!btn || !menu) return;
    btn.addEventListener('click', function(){
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  })();

  // ============ CURSOR ============
  (function(){
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    if(!dot || !ring) return;
    var rx=0,ry=0,tx=0,ty=0;
    document.addEventListener('mousemove', function(e){
      tx = e.clientX; ty = e.clientY;
      dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
    });
    function loop(){
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();
    document.querySelectorAll('a, button, [data-hover]').forEach(function(el){
      el.addEventListener('mouseenter', function(){ ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function(){ ring.classList.remove('hover'); });
    });
    document.addEventListener('mouseleave', function(){
      dot.style.opacity=0; ring.style.opacity=0;
    });
    document.addEventListener('mouseenter', function(){
      dot.style.opacity=1; ring.style.opacity=1;
    });
  })();

  // ============ PROGRESS BAR ============
  (function(){
    var bar = document.getElementById('progress');
    if(!bar) return;
    function update(){
      var st = window.scrollY;
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      var pct = dh > 0 ? (st / dh) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, {passive:true});
    update();
  })();

  // ============ REVEAL ON SCROLL ============
  (function(){
    var els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(ent){
        if(ent.isIntersecting){ ent.target.classList.add('in'); io.unobserve(ent.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -50px 0px'});
    els.forEach(function(e){ io.observe(e); });
  })();

  // ============ NAV ACTIVE STATE (multi-page) ============
  (function(){
    var cur = window.location.pathname.split('/').pop() || 'index.html';
    var items = [];
    document.querySelectorAll('.nav-links a[data-nav]').forEach(function(a){
      var parts = a.getAttribute('href').split('#');
      var file = parts[0] || cur;
      if(file !== cur) return;
      items.push({a:a, el: parts[1] ? document.getElementById(parts[1]) : null});
    });
    function update(){
      var pos = window.scrollY + 120, current = null;
      items.forEach(function(i){ if(i.el && i.el.offsetTop <= pos) current = i; });
      if(!current){ current = items.filter(function(i){ return !i.el; })[0] || null; }
      items.forEach(function(i){ i.a.classList.toggle('active', i === current); });
    }
    window.addEventListener('scroll', update, {passive:true});
    update();
  })();

  // ============ TIMELINE TOGGLE ============
  (function(){
    var btn = document.getElementById('tlToggle');
    var tl = document.getElementById('timeline');
    if(!btn || !tl) return;
    btn.addEventListener('click', function(){
      btn.classList.toggle('open');
      tl.classList.toggle('open');
      btn.querySelector('span:first-child').textContent = tl.classList.contains('open') ? 'Collapse News' : 'Recent News';
    });
  })();

  // ============ PUBLICATION FILTERS ============
  (function(){
    var btns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('#pubs .pub-card');
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        btns.forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        var f = b.getAttribute('data-filter');
        cards.forEach(function(c){
          var show = (f === 'all') ||
                     (c.getAttribute('data-status') === f) ||
                     (c.getAttribute('data-year') === f);
          c.style.display = show ? '' : 'none';
        });
      });
    });
  })();

  // ============ COPY EMAIL ============
  (function(){
    var btn = document.getElementById('copyEmail');
    if(!btn) return;
    btn.addEventListener('click', function(){
      navigator.clipboard.writeText('auntorchakma@gmail.com').then(function(){
        var orig = btn.textContent; btn.textContent = 'Copied \u2713';
        setTimeout(function(){ btn.textContent = orig; }, 1600);
      }).catch(function(){
        btn.textContent = 'auntorchakma@gmail.com';
      });
    });
  })();
