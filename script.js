/* ============================================================
   2 SISTERS & A LEASH — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL ──────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── HAMBURGER ───────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ── SCROLL REVEAL ───────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children of same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        siblings.forEach((el, idx) => {
          if (el === entry.target) {
            setTimeout(() => el.classList.add('visible'), idx * 100);
          }
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── SMOOTH SCROLL ───────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── CONTACT FORM ────────────────────────────────────────────
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending... 🐾';
      btn.disabled = true;
      setTimeout(() => {
        btn.style.display = 'none';
        successMsg.classList.add('show');
        form.reset();
      }, 1200);
    });
  }

  // ── ACTIVE NAV LINK ON SCROLL ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => activeObserver.observe(s));

  // ── LOGO PARALLAX (subtle) ──────────────────────────────────
  const logoRing = document.querySelector('.logo-ring');
  if (logoRing) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        logoRing.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }, { passive: true });
  }

  // ── TESTIMONIAL HOVER TILT ───────────────────────────────────
  document.querySelectorAll('.testi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── SERVICE CARD SPARKLE ─────────────────────────────────────
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .25s cubic-bezier(.34,1.56,.64,1), background .35s, box-shadow .35s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = '';
    });
  });

  // ── COUNTER ANIMATION ───────────────────────────────────────
  function animateCounter(el, target, suffix = '', duration = 1200) {
    const start = 0;
    const step = (timestamp) => {
      if (!step.startTime) step.startTime = timestamp;
      const progress = Math.min((timestamp - step.startTime) / duration, 1);
      const val = Math.floor(progress * target);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat-num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        if (text.includes('200')) animateCounter(el, 200, '+');
        else if (text.includes('5')) el.textContent = '5★';
        else if (text.includes('3')) el.textContent = '3 yrs';
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));

  // ── PRICING CARD HOVER BOUNCE ─────────────────────────────────
  document.querySelectorAll('.price-card:not(.featured)').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = '';
    });
  });

  // ── NEIGHBORHOOD TAG WAVE ─────────────────────────────────────
  const tags = document.querySelectorAll('.tag');
  tags.forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 40}ms`;
  });

  // ── PAW TRAIL ANIMATION ON SCROLL ────────────────────────────
  window.addEventListener('scroll', () => {
    const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.querySelectorAll('.paw').forEach((paw, i) => {
      paw.style.opacity = Math.max(0, 0.5 - scrollPct * 3);
    });
  }, { passive: true });

  console.log('🐾 2 Sisters & a Leash — Site Ready!');
});