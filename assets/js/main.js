/* ===== CustomCraft Studio - JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initPricingToggle();
  initPortfolioFilter();
  initContactForm();
});

/* ===== Navigation ===== */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Shrink shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Set active nav link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ===== Pricing Toggle ===== */
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  if (!toggle) return;

  const labels = toggle.closest('.pricing-toggle')?.querySelectorAll('span');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('bundle');
    
    // Update active label
    labels?.forEach(span => span.classList.toggle('active'));

    // Toggle price display
    document.querySelectorAll('.pricing-card').forEach(card => {
      const individual = card.querySelector('.price-individual');
      const bundlePrice = card.querySelector('.price-bundle');
      
      if (individual && bundlePrice) {
        const isBundle = toggle.classList.contains('bundle');
        individual.style.display = isBundle ? 'none' : '';
        bundlePrice.style.display = isBundle ? '' : 'none';
      }
    });
  });
}

/* ===== Portfolio Filter ===== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-masonry .portfolio-item');
  
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = '#9CAF88';
      
      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });
}
