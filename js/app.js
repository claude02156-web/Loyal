/**
 * Maa Enterprises — Cyber Cafe & Online Service Center
 * Global Application Core, UI Micro-Interactions, Dynamic Settings & FAQ Sync
 */

'use strict';

/**
 * Global Default Business Constants
 */
const DEFAULT_BUSINESS = Object.freeze({
  name: 'Maa Enterprises',
  subtitle: 'Cyber Cafe & Online Service Center',
  owner: 'Rajesh Kumar',
  phone: '9693125648',
  phoneFormatted: '+91 96931 25648',
  phoneHref: 'tel:9693125648',
  whatsapp: '9693125648',
  whatsappUrl: 'https://wa.me/919693125648',
  address: 'Mahalpar, Bihar Sharif, Nalanda, Bihar - 803101',
  hours: '10:00 AM – 06:00 PM',
  status: 'Open Today'
});

let BUSINESS = { ...DEFAULT_BUSINESS };

/**
 * Toast Notification System
 * @param {string} message - Notification text
 * @param {'success'|'error'|'info'|'warning'} [type='info'] - Toast category
 * @param {number} [duration=4000] - Display time in ms
 */
function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const icons = {
    success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15"></line></svg>',
    warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  toast.innerHTML = `
    <div class="toast-content">
      ${icons[type] || icons.info}
      <span class="toast-message">${escapeHtml(message)}</span>
    </div>
    <button type="button" class="toast-close" aria-label="Close Notification">&times;</button>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  const closeBtn = toast.querySelector('.toast-close');
  let timeoutId = null;

  const removeToast = () => {
    if (timeoutId) clearTimeout(timeoutId);
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', removeToast);
  }

  timeoutId = setTimeout(removeToast, duration);
}

/**
 * WhatsApp Helper Utility
 * @param {string} [customMessage=''] - Pre-filled WhatsApp message
 */
function openWhatsApp(customMessage = '') {
  let url = BUSINESS.whatsappUrl || `https://wa.me/91${BUSINESS.whatsapp || '9693125648'}`;
  if (customMessage && customMessage.trim().length > 0) {
    url += `?text=${encodeURIComponent(customMessage.trim())}`;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Reusable Modal Helpers
 */
const MaaModal = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('modal-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-scroll-lock');
  },
  close(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('modal-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-scroll-lock');
  }
};

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Initialize Mobile Navigation Drawer & Backdrop
 */
function initNavigation() {
  const toggleBtn = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('navClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const openMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('mobile-menu-active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.add('backdrop-active');
    document.body.classList.add('nav-scroll-lock');
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('mobile-menu-active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.classList.remove('backdrop-active');
    document.body.classList.remove('nav-scroll-lock');
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu-active')) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/**
 * Initialize Sticky Header
 */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
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
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Dynamic FAQ Accordion Renderer & Interaction
 */
function initFaqAccordion() {
  const container = document.querySelector('.faq-container');
  if (!container) return;

  // 1. Try loading customized FAQs from local storage
  try {
    const local = localStorage.getItem('maa_faqs');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const activeFaqs = parsed.filter(f => f.active !== false).sort((a,b) => (a.order||999) - (b.order||999));
        if (activeFaqs.length > 0) {
          container.innerHTML = activeFaqs.map((f, i) => `
            <div class="faq-item reveal ${i > 0 ? 'delay-' + (i * 100) : ''}">
              <button aria-controls="faq-ans-${i+1}" aria-expanded="false" class="faq-question" type="button">
                <span>${escapeHtml(f.question)}</span>
                <span class="faq-icon">
                  <svg fill="none" height="14" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="14"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="faq-answer" id="faq-ans-${i+1}" role="region">
                <div class="faq-answer-inner">
                  ${escapeHtml(f.answer)}
                </div>
              </div>
            </div>
          `).join('');
        }
      }
    }
  } catch(e) {}

  // 2. Bind accordion click behaviors
  const accordionItems = container.querySelectorAll('.faq-item');
  accordionItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn && otherAnswer) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherItem.classList.remove('faq-open');
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        item.classList.remove('faq-open');
        answer.style.maxHeight = null;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('faq-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Dynamic Center Settings Sync
 */
function initDynamicCenterSettings() {
  try {
    const local = localStorage.getItem('maa_center_settings');
    if (local) {
      const s = JSON.parse(local);
      if (s) {
        BUSINESS = { ...BUSINESS, ...s };
        BUSINESS.whatsappUrl = `https://wa.me/91${(s.whatsapp || '9693125648').replace(/[^0-9]/g, '')}`;
        BUSINESS.phoneHref = `tel:${(s.phone || '9693125648').replace(/[^0-9]/g, '')}`;
      }
    }
  } catch(e) {}
}

/**
 * Footer Current Year
 */
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Smooth Anchor Scroll
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Bootstrap on DOMContentLoaded
 */

/**
 * Casual Copy/Inspection Deterrent (Advisory Client-Side UX Only)
 * NOTE: This is a client-side UX deterrent to discourage casual copying of static assets.
 * It is NOT a security boundary. Actual security is strictly enforced by Firebase Auth & Firestore Rules.
 * Normal form editing, text selections inside inputs/textareas, and mobile accessibility remain fully functional.
 */
function initContextDeterrent() {
  document.addEventListener('contextmenu', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
      return; // Allow standard input interactions
    }
    // Prevent casual right-click menu on static branding/background elements
    e.preventDefault();
  }, { passive: false });
}

document.addEventListener('DOMContentLoaded', () => {
  initContextDeterrent();
  initDynamicCenterSettings();
  initNavigation();
  initStickyHeader();
  initScrollReveal();
  initFaqAccordion();
  initCurrentYear();
  initSmoothScroll();
});

// Cross-tab and live admin broadcasts
window.addEventListener('maa_faqs_updated', () => {
  initFaqAccordion();
  initScrollReveal();
});

window.addEventListener('maa_settings_updated', () => {
  initDynamicCenterSettings();
});

window.BUSINESS = BUSINESS;
window.showToast = showToast;
window.openWhatsApp = openWhatsApp;
window.MaaModal = MaaModal;
window.escapeHtml = escapeHtml;
