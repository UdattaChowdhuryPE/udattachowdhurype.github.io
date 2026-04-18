/* Portfolio — JS */
(function () {
  'use strict';

  // ---- Theme Toggle ----
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;

  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ---- Mobile Nav Toggle ----
  var navToggle = document.getElementById('navToggle');
  var navRight = document.getElementById('navRight');
  var nav = document.getElementById('nav');

  if (navToggle && navRight) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navRight.classList.toggle('active');
    });

    navRight.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navRight.classList.remove('active');
      });
    });
  }

  // ---- Scroll-triggered animations ----
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  var staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var siblings = entry.target.parentElement.querySelectorAll(
          '.highlight-row, .paper-row, .exp, .paper-full, .side-project, .timeline-item'
        );
        var idx = Array.prototype.indexOf.call(siblings, entry.target);
        entry.target.style.transitionDelay = (idx * 80) + 'ms';
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .page-header').forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.highlight-row, .paper-row, .exp, .paper-full, .side-project, .timeline-item').forEach(function (el) {
    staggerObserver.observe(el);
  });

  // ---- Timeline draw-itself line ----
  var timelineContainer = document.querySelector('.timeline-container');
  var timelineTrack = document.querySelector('.timeline-track');
  if (timelineContainer && timelineTrack) {
    var maxTrackHeight = 0;

    function computeMaxTrackHeight() {
      var dots = timelineContainer.querySelectorAll('.timeline-dot');
      var lastDot = dots[dots.length - 1];
      if (!lastDot) return;
      var lastItem = lastDot.parentElement;
      var lastDotCenter = lastItem.offsetTop + lastDot.offsetTop + lastDot.offsetHeight / 2;
      maxTrackHeight = lastDotCenter - timelineTrack.offsetTop;
    }

    function updateTimelineTrack() {
      var rect = timelineContainer.getBoundingClientRect();
      var totalHeight = timelineContainer.offsetHeight;
      var scrolled = -rect.top + window.innerHeight * 0.7;
      var progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
      timelineTrack.style.height = Math.min(progress * totalHeight, maxTrackHeight) + 'px';
    }

    computeMaxTrackHeight();
    window.addEventListener('scroll', updateTimelineTrack, { passive: true });
    window.addEventListener('resize', function () { computeMaxTrackHeight(); updateTimelineTrack(); }, { passive: true });
    updateTimelineTrack();
  }

  // ---- Rotating Hero Text ----
  var rotatingEl = document.getElementById('rotatingText');
  if (rotatingEl) {
    var phrases = [
      'a Product Manager.',
      'a community builder.',
      'a growth optimizer.',
      'a strategist.',
      'a consumer tech enthusiast.',
      'a data-driven leader.'
    ];
    var idx = 0;

    setInterval(function () {
      // Slide up and fade out
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(-10px)';

      setTimeout(function () {
        idx = (idx + 1) % phrases.length;
        rotatingEl.textContent = phrases[idx];
        // Position below, then animate in
        rotatingEl.style.transform = 'translateY(10px)';
        // Force reflow so the browser registers the new position
        void rotatingEl.offsetHeight;
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
      }, 400);
    }, 3000);
  }
})();
