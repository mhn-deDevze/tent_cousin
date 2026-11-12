/**
 * ستائر ومجالس عبدالرحمن - Complete Interactive & Mobile Scripts
 * Exact replication of https://curtainsriyadh.com/
 * Phone: 0540793568 | WhatsApp: https://wa.me/966540793568
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroSlider();
  initGalleryLightbox();
  initContactForm();
  initPageAnimations();
});

/* Mobile Drawer Navigation */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle, .mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer-menu, .mobile-drawer');
  const overlay = document.querySelector('.mobile-overlay, .mobile-nav-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn, .drawer-close');
  const menuLinks = document.querySelectorAll('.mobile-menu-items a, .mobile-nav-list a, .mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  overlay.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Hero Ken-Burns Slider */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-section, .elementor-widget-slides');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide, .swiper-slide');
  const prevBtn = slider.querySelector('.slider-arrow-btn.prev, .elementor-swiper-button-prev, .slider-prev');
  const nextBtn = slider.querySelector('.slider-arrow-btn.next, .elementor-swiper-button-next, .slider-next');
  const dots = slider.querySelectorAll('.slider-dot, .swiper-pagination-bullet');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideDuration = 5000;

  function updateSlideState() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlideState();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlideState();
  }

  function goToSlide(idx) {
    currentIndex = idx;
    updateSlideState();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetAutoplay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, slideDuration);
  }

  function resetAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Mobile Touch Swipe Handling
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX > touchStartX + 40) {
      prevSlide();
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

/* Lightbox Modal */
function initGalleryLightbox() {
  let modal = document.querySelector('.lightbox-preview-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox-preview-modal';
    modal.innerHTML = `
      <span class="lightbox-close-icon">&times;</span>
      <img src="" alt="Preview">
    `;
    document.body.appendChild(modal);
  }

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.lightbox-close-icon');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openModal(src) {
    if (!src) return;
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openModal(img.getAttribute('src'));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* Contact Form Handler */
function initContactForm() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> تم استلام طلبك بنجاح! سنتواصل معك قريباً.';
        btn.style.backgroundColor = '#0DD929';
      }
      form.reset();
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }
      }, 4000);
    });
  });
}

/* Comprehensive Multi-Type Page Animations (Text & Images) */
function initPageAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll, h2, p, img').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -35px 0px'
  });

  // 1. Headings & Titles (Blur-to-Crisp Focus Reveal)
  const headings = document.querySelectorAll(
    '.feature-text-box h2, .dark-card-title, .blog-post-title, .article-title, .footer-col-title, .subpage-header-title, .contact-form-wrapper h2'
  );
  headings.forEach(h => {
    h.classList.add('reveal-on-scroll', 'anim-text-reveal');
    observer.observe(h);
  });

  // 2. Section Dividers (Dynamic Expanding Gold Line)
  const dividers = document.querySelectorAll('.elementor-divider');
  dividers.forEach(d => {
    d.classList.add('reveal-on-scroll', 'anim-divider-expand');
    observer.observe(d);
  });

  // 3. Paragraphs & Text Editor Descriptions (Smooth Slide Up)
  const paragraphs = document.querySelectorAll(
    '.feature-text-box p, .dark-card-desc, .blog-post-excerpt, .article-content p, .contact-form-wrapper p'
  );
  paragraphs.forEach(p => {
    p.classList.add('reveal-on-scroll', 'anim-text-fade-up');
    observer.observe(p);
  });

  // 4. Feature Rows (Alternating Slide In from Left / Right)
  const regularRows = document.querySelectorAll('.section-feature-row:not(.row-reverse) .feature-media-box');
  regularRows.forEach(box => {
    box.classList.add('reveal-on-scroll', 'anim-fade-left');
    observer.observe(box);
  });

  const reverseRows = document.querySelectorAll('.section-feature-row.row-reverse .feature-media-box, .contact-media-box');
  reverseRows.forEach(box => {
    box.classList.add('reveal-on-scroll', 'anim-fade-right');
    observer.observe(box);
  });

  // 5. 3D Perspective Grid Cards & Gallery Items (Staggered Zoom & Tilt)
  const gridCards = document.querySelectorAll('.gallery-item, .dark-card-item, .blog-post-card, .video-box');
  gridCards.forEach((card, index) => {
    card.classList.add('reveal-on-scroll', 'anim-zoom-3d');
    const delay = ((index % 3) * 0.12).toFixed(2);
    card.style.transitionDelay = `${delay}s`;
    observer.observe(card);
  });

  // 6. Article & Details Images
  const singleImages = document.querySelectorAll('.article-featured-img, .content-media-box img');
  singleImages.forEach(img => {
    img.classList.add('reveal-on-scroll', 'anim-fade-up');
    observer.observe(img);
  });

  // 7. Brand Logos Ambient Halo
  const logos = document.querySelectorAll('.footer-logo-img, .brand-logo-img');
  logos.forEach(logo => {
    logo.classList.add('anim-halo-pulse');
  });
}


