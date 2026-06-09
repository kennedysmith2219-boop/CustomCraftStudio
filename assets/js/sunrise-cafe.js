/* ===== Sunrise Cafe - JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initMenuFilter();
  initContactForm();
  initInstaFeed();
});

/* ===== Navigation ===== */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
    });
  });

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

/* ===== Menu Filter (menu page) ===== */
function initMenuFilter() {
  const catBtns = document.querySelectorAll('.menu-cat-btn');
  const sections = document.querySelectorAll('.menu-section');
  
  if (catBtns.length === 0) return;

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      sections.forEach(section => {
        if (filter === 'all' || section.dataset.category === filter) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
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

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = '#9CAF88';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });
}

/* ===== Instagram Feed Simulator ===== */
function initInstaFeed() {
  const container = document.querySelector('.instagram-grid');
  if (!container) return;

  // Sample Instagram-style posts
  const posts = [
    { emoji: '☕', label: 'Morning brew' },
    { emoji: '🥐', label: 'Fresh croissant' },
    { emoji: '🌅', label: 'Sunrise corner' },
    { emoji: '🍰', label: 'Daily special' },
    { emoji: '🌸', label: 'Spring blooms' },
    { emoji: '🥗', label: 'Healthy bites' },
    { emoji: '🍪', label: 'Fresh cookies' },
    { emoji: '☕', label: 'Latte art' }
  ];

  // Check if this is a static page (no client-side rendering)
  const existingChildren = container.children;
  if (existingChildren.length >= posts.length) return;

  // For the home page, the posts are hardcoded in HTML
  // This just adds hover labels
  container.querySelectorAll('.insta-post').forEach((post, i) => {
    if (posts[i]) {
      post.setAttribute('title', `@sunrisecafe — ${posts[i].label}`);
    }
  });
}