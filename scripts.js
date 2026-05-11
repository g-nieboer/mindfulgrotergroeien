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

  /* ---- Contact form: validation & Formsubmit AJAX submission ---- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const statusEl = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitBtnDefaultText = submitBtn ? submitBtn.textContent : '';
    const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/0e439ade1d645b9c04dbeb08c9957ec3';

    function setStatus(kind, message) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = 'form-status form-status-' + kind;
      statusEl.hidden = false;
    }
    function clearStatus() {
      if (!statusEl) return;
      statusEl.hidden = true;
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearStatus();

      const data = new FormData(contactForm);
      const name = (data.get('naam') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('telefoon') || '').toString().trim();
      const subject = (data.get('voor-wie') || '').toString().trim();
      const message = (data.get('bericht') || '').toString().trim();
      const honey = (data.get('_honey') || '').toString();

      if (!name || !email || !message) {
        setStatus('error', 'Vul alstublieft uw naam, e-mailadres en bericht in.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setStatus('error', 'Vul een geldig e-mailadres in.');
        return;
      }
      if (honey) {
        setStatus('success', 'Bedankt, uw bericht is verstuurd.');
        contactForm.reset();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.textContent = 'Bezig met versturen...';
      }

      try {
        const res = await fetch(FORMSUBMIT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            Naam: name,
            'E-mail': email,
            Telefoon: phone || '(niet opgegeven)',
            'Voor wie': subject || '(niet opgegeven)',
            Bericht: message,
            _subject: 'Contactaanvraag van ' + name,
            _template: 'table',
            _captcha: 'false',
            _replyto: email,
          }),
        });
        const json = await res.json().catch(() => ({}));
        const ok = res.ok && (json.success === 'true' || json.success === true);
        if (ok) {
          setStatus('success', 'Bedankt! Uw bericht is verstuurd. Janneke neemt zo snel mogelijk contact met u op.');
          contactForm.reset();
        } else {
          throw new Error((json && json.message) || ('HTTP ' + res.status));
        }
      } catch (err) {
        setStatus('error', 'Er ging iets mis bij het versturen. Probeer het opnieuw of mail rechtstreeks naar mindfulgrotergroeien@gmail.com.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = submitBtnDefaultText;
        }
      }
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
