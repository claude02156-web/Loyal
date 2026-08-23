/**
 * Maa Enterprises — Cyber Cafe & Online Service Center
 * PART 3 — Dynamic Service Details Page Controller
 * Author: Senior Frontend Architect
 */

'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const detailsContent = document.getElementById('serviceDetailsContent');
  const notFoundCard = document.getElementById('serviceNotFound');

  if (!detailsContent || !notFoundCard) return; // Guard for other pages

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id') || urlParams.get('service');

  if (!serviceId) {
    showNotFound();
    return;
  }

  // Retrieve service from Data Layer (js/services.js)
  let service = typeof getServiceById === 'function' ? getServiceById(serviceId) : null;

  // If not found in memory, try syncing with Firestore
  if (!service && typeof syncServicesWithFirestore === 'function') {
    await syncServicesWithFirestore();
    service = getServiceById(serviceId);
  }

  if (!service || service.active === false) {
    showNotFound();
    return;
  }

  renderServiceDetails(service);
});

/**
 * Render Complete Dynamic Service Details
 * @param {Object} service
 */
function renderServiceDetails(service) {
  const detailsContent = document.getElementById('serviceDetailsContent');
  const notFoundCard = document.getElementById('serviceNotFound');

  // Update Page Title
  document.title = `${service.name} — Maa Enterprises | Bihar Sharif`;

  // Breadcrumbs
  const breadcrumbName = document.getElementById('breadcrumbServiceName');
  if (breadcrumbName) breadcrumbName.textContent = service.name;

  // Hero Section Elements
  const categoryBadge = document.getElementById('serviceCategoryBadge');
  if (categoryBadge) categoryBadge.textContent = service.category;

  const serviceTitle = document.getElementById('serviceTitle');
  if (serviceTitle) serviceTitle.textContent = service.name;

  const heroDesc = document.getElementById('serviceHeroDesc');
  if (heroDesc) heroDesc.textContent = service.shortDescription;

  const iconContainer = document.getElementById('serviceIconContainer');
  if (iconContainer && typeof getServiceIconSvg === 'function') {
    iconContainer.innerHTML = getServiceIconSvg(service.icon);
  }

  // Primary Action: Apply for This Service
  const applyBtn = document.getElementById('applyBtn');
  if (applyBtn) {
    applyBtn.href = `apply.html?service=${encodeURIComponent(service.id)}`;
  }

  // Secondary Action: WhatsApp Inquiry
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    const rawMessage = `Hello Maa Enterprises, I want information about ${service.name}.`;
    whatsappBtn.href = `https://wa.me/919693125648?text=${encodeURIComponent(rawMessage)}`;
  }

  // About / Overview Section
  const descriptionEl = document.getElementById('serviceDescription');
  if (descriptionEl) {
    descriptionEl.textContent = service.description || service.shortDescription;
  }

  // Required Documents Checklist
  const docList = document.getElementById('documentChecklist');
  if (docList) {
    if (Array.isArray(service.documents) && service.documents.length > 0) {
      docList.innerHTML = service.documents.map(doc => `
        <li class="doc-item">
          <div class="doc-check-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span>${escapeHtml(doc)}</span>
        </li>
      `).join('');
    } else {
      docList.innerHTML = `
        <li class="doc-item">
          <div class="doc-check-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span>Required documents will be confirmed during counter processing.</span>
        </li>
      `;
    }
  }

  // Sidebar Information
  const sidebarCategory = document.getElementById('sidebarCategory');
  if (sidebarCategory) sidebarCategory.textContent = service.category;

  const sidebarFee = document.getElementById('sidebarFee');
  if (sidebarFee) sidebarFee.textContent = service.fee ? service.fee : 'Fee: As per official notification';

  const sidebarProcessing = document.getElementById('sidebarProcessing');
  if (sidebarProcessing) sidebarProcessing.textContent = service.processingTime ? service.processingTime : 'Same day counter processing';

  // Related Services in Same Category
  renderRelatedServices(service);

  // Show Details, Hide Error State
  detailsContent.style.display = 'block';
  notFoundCard.style.display = 'none';

  if (window.initScrollReveal) {
    window.initScrollReveal();
  }
}

/**
 * Render Related Services from the same category
 * @param {Object} currentService
 */
function renderRelatedServices(currentService) {
  const relatedSection = document.getElementById('relatedServicesSection');
  const relatedGrid = document.getElementById('relatedServicesGrid');

  if (!relatedSection || !relatedGrid || typeof getServicesByCategory !== 'function') return;

  const categoryServices = getServicesByCategory(currentService.category, false);
  const related = categoryServices.filter(s => s.id !== currentService.id).slice(0, 3);

  if (related.length === 0) {
    relatedSection.style.display = 'none';
    return;
  }

  relatedSection.style.display = 'block';
  relatedGrid.innerHTML = related.map(s => renderServiceCardMarkup(s)).join('');
}

/**
 * Show Friendly Error State if Service ID is Invalid or Missing
 */
function showNotFound() {
  const detailsContent = document.getElementById('serviceDetailsContent');
  const notFoundCard = document.getElementById('serviceNotFound');

  document.title = 'Service Not Found — Maa Enterprises';

  if (detailsContent) detailsContent.style.display = 'none';
  if (notFoundCard) notFoundCard.style.display = 'flex';
}

/**
 * Safe HTML Escaping
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
