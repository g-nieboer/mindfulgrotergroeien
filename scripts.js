/* ============================================================
   Mindful Groter Groeien — Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ---- Sticky header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile hamburger menu ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu when clicking a non-dropdown link
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !link.classList.contains('nav-dropdown-toggle')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile dropdown toggling
    navMenu.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          toggle.parentElement.classList.toggle('open');
        }
      });
    });
  }

  /* ---- Testimonial Carousel ---- */
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let currentIndex = 0;
    let autoRotate = null;
    const AUTO_ROTATE_DELAY = 5000;

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, slides.length - getVisibleCount());
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const total = getMaxIndex() + 1;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Ga naar recensie ${i + 1}`);
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
          resetAutoRotate();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const visibleCount = getVisibleCount();
      const slideWidth = 100 / visibleCount;
      const offset = -currentIndex * slideWidth;
      track.style.transform = `translateX(${offset}%)`;

      // Update slide widths
      slides.forEach((slide) => {
        slide.style.flex = `0 0 calc(${slideWidth}% - ${(visibleCount - 1) * 1.5 / visibleCount}rem)`;
      });

      // Update dots
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goNext() {
      const max = getMaxIndex();
      currentIndex = currentIndex >= max ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function goPrev() {
      const max = getMaxIndex();
      currentIndex = currentIndex <= 0 ? max : currentIndex - 1;
      updateCarousel();
    }

    function startAutoRotate() {
      autoRotate = setInterval(goNext, AUTO_ROTATE_DELAY);
    }

    function resetAutoRotate() {
      clearInterval(autoRotate);
      startAutoRotate();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); resetAutoRotate(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); resetAutoRotate(); });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', startAutoRotate);

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
        resetAutoRotate();
      }
    });

    // Window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        buildDots();
        updateCarousel();
      }, 150);
    });

    buildDots();
    updateCarousel();
    startAutoRotate();
  }

  /* ---- Tabs ---- */
  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('.tab-btn');
    const panels = tabs.querySelectorAll('.tab-panel');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = tabs.querySelector(`.tab-panel[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ---- Intersection Observer for fade-in animations ---- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
  }

  /* ---- Contact form: basic validation & mailto fallback ---- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = (data.get('naam') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('telefoon') || '').toString().trim();
      const subject = (data.get('voor-wie') || '').toString().trim();
      const message = (data.get('bericht') || '').toString().trim();

      if (!name || !email || !message) {
        alert('Vul alstublieft uw naam, e-mailadres en bericht in.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Vul een geldig e-mailadres in.');
        return;
      }

      const body =
        `Naam: ${name}%0D%0A` +
        `E-mail: ${email}%0D%0A` +
        `Telefoon: ${phone}%0D%0A` +
        `Voor wie: ${subject}%0D%0A%0D%0A` +
        `Bericht:%0D%0A${encodeURIComponent(message)}`;

      const mailto = `mailto:mindfulgrotergroeien@gmail.com?subject=${encodeURIComponent('Contactaanvraag van ' + name)}&body=${body}`;
      window.location.href = mailto;
    });
  }

  /* ---- Set active nav link based on current page ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    }
  });
})();
