/**
 * Maa Enterprises — Cyber Cafe & Online Service Center
 * Customer Service Application Controller & Multi-Layer Persistence Layer
 */

'use strict';

const STORAGE_KEY = 'maa_enterprises_applications';

const StorageService = {
  getApplications() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('StorageService: Failed to retrieve applications', e);
      return [];
    }
  },

  saveApplications(applications) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
      return true;
    } catch (e) {
      console.error('StorageService: Failed to save applications', e);
      return false;
    }
  },

  saveApplication(applicationData) {
    const apps = this.getApplications();
    apps.unshift(applicationData);
    return this.saveApplications(apps);
  }
};

/**
 * Generate Unique Cryptographically Strong Request ID (MAE-XXXXXX)
 * @returns {string}
 */
function generateRequestId() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const existingApps = StorageService.getApplications();
  const existingIds = new Set(existingApps.map(a => a.requestId));

  let candidateId = '';
  let attempts = 0;

  do {
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPart += chars[randomIndex];
    }
    candidateId = `MAE-${randomPart}`;
    attempts++;
  } while (existingIds.has(candidateId) && attempts < 100);

  return candidateId;
}

const Validator = {
  validateName(name) {
    if (!name || typeof name !== 'string') return 'Full name is required.';
    const trimmed = name.trim();
    if (trimmed.length < 2) return 'Name must be at least 2 characters.';
    return '';
  },

  validateMobile(mobile) {
    if (!mobile) return 'Mobile number is required.';
    let clean = String(mobile).replace(/[^0-9]/g, '');
    if (clean.length === 12 && clean.startsWith('91')) {
      clean = clean.substring(2);
    }
    if (clean.length !== 10) return 'Please enter a valid 10-digit mobile number.';
    if (!/^[6-9]\d{9}$/.test(clean)) return 'Mobile number must start with 6, 7, 8, or 9.';
    return '';
  },

  normalizeMobile(mobile) {
    let clean = String(mobile).replace(/[^0-9]/g, '');
    if (clean.length === 12 && clean.startsWith('91')) {
      clean = clean.substring(2);
    }
    return clean;
  },

  validateAddress(address) {
    if (!address || typeof address !== 'string') return 'Full address is required.';
    const trimmed = address.trim();
    if (trimmed.length < 5) return 'Please provide a complete address.';
    return '';
  },

  validateConsent(checked) {
    if (!checked) return 'You must confirm that the information provided is correct.';
    return '';
  }
};

class ApplicationController {
  constructor() {
    this.selectedService = null;
    this.uploadedFiles = [];
    this.isSubmitting = false;

    // Elements
    this.form = document.getElementById('applicationForm');
    this.serviceSummaryCard = document.getElementById('selectedServiceSummary');
    this.submitBtn = document.getElementById('submitAppBtn');
    this.successModal = document.getElementById('successModal');
    this.copyBtn = document.getElementById('copyRequestIdBtn');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.newAppBtn = document.getElementById('startNewAppBtn');

    // Inputs
    this.nameInput = document.getElementById('applicantName');
    this.mobileInput = document.getElementById('applicantMobile');
    this.whatsappCheck = document.getElementById('whatsappAvailableCheck');
    this.emailInput = document.getElementById('applicantEmail');
    this.addressInput = document.getElementById('applicantAddress');
    this.notesInput = document.getElementById('applicantNotes');
    this.urgencySelect = document.getElementById('serviceUrgencySelect');
    this.deliverySelect = document.getElementById('deliveryModeSelect');
    this.docFileInput = document.getElementById('applicantDocFiles');
    this.docListContainer = document.getElementById('uploadedDocsList');
    this.consentCheck = document.getElementById('consentCheck');
  }

  async init() {
    if (!this.form) return;

    await this.resolveSelectedService();
    this.autofillCustomerData();
    this.bindEvents();
  }

  autofillCustomerData() {
    try {
      const user = window.AuthService && window.AuthService.currentUser ? window.AuthService.currentUser() : null;
      if (user) {
        if (this.nameInput && !this.nameInput.value) this.nameInput.value = user.name || user.fullName || '';
        if (this.mobileInput && !this.mobileInput.value) this.mobileInput.value = user.mobile || '';
        if (this.emailInput && !this.emailInput.value) this.emailInput.value = user.email || '';
        if (this.addressInput && !this.addressInput.value) this.addressInput.value = user.address || '';
      }
    } catch (e) {}
  }

  async resolveSelectedService() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service') || urlParams.get('id');

    if (serviceId && typeof getServiceById === 'function') {
      let service = getServiceById(serviceId);
      if (!service && typeof syncServicesWithFirestore === 'function') {
        await syncServicesWithFirestore();
        service = getServiceById(serviceId);
      }
      if (service && service.active !== false) {
        this.selectedService = service;
      }
    }

    this.renderServiceHeader();
  }

  renderServiceHeader() {
    if (!this.serviceSummaryCard) return;

    if (this.selectedService) {
      const iconMarkup = typeof getServiceIconSvg === 'function' 
        ? getServiceIconSvg(this.selectedService.icon) 
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>';

      const docsText = Array.isArray(this.selectedService.documents) && this.selectedService.documents.length > 0
        ? this.selectedService.documents.join(', ')
        : 'Aadhaar / ID Proof, Photographs, Relevant Certificates';

      this.serviceSummaryCard.innerHTML = `
        <div class="selected-service-info">
          <div class="selected-service-icon">
            ${iconMarkup}
          </div>
          <div class="selected-service-details">
            <span class="selected-service-badge">${escapeHtml(this.selectedService.category || 'Online Service')}</span>
            <h2 class="selected-service-name">${escapeHtml(this.selectedService.name)}</h2>
            <p class="selected-service-desc">${escapeHtml(this.selectedService.shortDescription || '')}</p>
            <div style="font-size: 0.8125rem; color: var(--accent-cyan); margin-top: 0.35rem;">
              <strong>Required Docs:</strong> ${escapeHtml(docsText)}
            </div>
          </div>
        </div>
        <a href="services.html" class="selected-service-change-btn" aria-label="Change Selected Service">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
          <span>Change Service</span>
        </a>
      `;
    } else {
      const allServices = typeof getAllServices === 'function' ? getAllServices(false) : [];
      const optionsHtml = allServices.map(s => `
        <option value="${escapeHtml(s.id)}">${escapeHtml(s.name)} (${escapeHtml(s.category)})</option>
      `).join('');

      this.serviceSummaryCard.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <label for="serviceSelectPicker" style="font-weight: 600; color: #ffffff; font-size: 0.95rem;">
              Select Service to Apply For:
            </label>
            <a href="services.html" style="font-size: 0.8rem; color: var(--accent-cyan);">Browse All Services</a>
          </div>
          <select id="serviceSelectPicker" class="form-select">
            <option value="">-- Choose a Cyber Cafe Service --</option>
            ${optionsHtml}
          </select>
        </div>
      `;

      const picker = document.getElementById('serviceSelectPicker');
      if (picker) {
        picker.addEventListener('change', (e) => {
          const chosenId = e.target.value;
          if (chosenId && typeof getServiceById === 'function') {
            this.selectedService = getServiceById(chosenId);
            this.renderServiceHeader();
          }
        });
      }
    }
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // File attachments handler
    this.docFileInput?.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      files.forEach(f => {
        if (!this.uploadedFiles.some(existing => existing.name === f.name && existing.size === f.size)) {
          this.uploadedFiles.push({
            name: f.name,
            size: (f.size / 1024).toFixed(1) + ' KB',
            type: f.type || 'document'
          });
        }
      });
      this.renderUploadedDocs();
    });

    const inputs = [this.nameInput, this.mobileInput, this.emailInput, this.addressInput, this.consentCheck];
    inputs.forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => this.clearFieldError(input));
      input.addEventListener('change', () => this.clearFieldError(input));
    });

    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => {
        const idText = document.getElementById('modalRequestIdText')?.textContent;
        if (idText) {
          navigator.clipboard?.writeText(idText).then(() => {
            if (window.showToast) window.showToast('Request ID copied to clipboard!', 'success');
          }).catch(() => {
            this.fallbackCopy(idText);
          });
        }
      });
    }

    this.modalCloseBtn?.addEventListener('click', () => this.closeSuccessModal());
    this.newAppBtn?.addEventListener('click', () => {
      this.closeSuccessModal();
      this.form.reset();
      this.uploadedFiles = [];
      this.renderUploadedDocs();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    this.successModal?.addEventListener('click', (e) => {
      if (e.target === this.successModal) this.closeSuccessModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.successModal?.classList.contains('modal-active')) {
        this.closeSuccessModal();
      }
    });
  }

  renderUploadedDocs() {
    if (!this.docListContainer) return;
    if (this.uploadedFiles.length === 0) {
      this.docListContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8125rem;">No documents attached yet. You can also send files via WhatsApp after submission.</span>';
      return;
    }

    this.docListContainer.innerHTML = this.uploadedFiles.map((doc, idx) => `
      <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: var(--radius-full); padding: 0.25rem 0.75rem; font-size: 0.8125rem; color: #ffffff;">
        <span>📄 ${escapeHtml(doc.name)} (${escapeHtml(doc.size)})</span>
        <button type="button" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;" onclick="removeAttachedDoc(${idx})">&times;</button>
      </div>
    `).join('');
  }

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (window.showToast) window.showToast('Request ID copied to clipboard!', 'success');
    } catch (err) {
      if (window.showToast) window.showToast('Request ID: ' + text, 'info');
    }
    document.body.removeChild(textArea);
  }

  setFieldError(inputEl, message) {
    if (!inputEl) return;
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errEl = group.querySelector('.error-message');
      if (errEl) errEl.textContent = message;
    }
  }

  clearFieldError(inputEl) {
    if (!inputEl) return;
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      const errEl = group.querySelector('.error-message');
      if (errEl) errEl.textContent = '';
    }
  }

  validateForm() {
    let isValid = true;
    let firstErrorField = null;

    if (!this.selectedService) {
      if (window.showToast) window.showToast('Please select a service before submitting.', 'warning');
      const picker = document.getElementById('serviceSelectPicker');
      if (picker) picker.focus();
      return false;
    }

    const nameErr = Validator.validateName(this.nameInput?.value);
    if (nameErr) {
      this.setFieldError(this.nameInput, nameErr);
      isValid = false;
      if (!firstErrorField) firstErrorField = this.nameInput;
    }

    const mobileErr = Validator.validateMobile(this.mobileInput?.value);
    if (mobileErr) {
      this.setFieldError(this.mobileInput, mobileErr);
      isValid = false;
      if (!firstErrorField) firstErrorField = this.mobileInput;
    }

    const addressErr = Validator.validateAddress(this.addressInput?.value);
    if (addressErr) {
      this.setFieldError(this.addressInput, addressErr);
      isValid = false;
      if (!firstErrorField) firstErrorField = this.addressInput;
    }

    const consentErr = Validator.validateConsent(this.consentCheck?.checked);
    if (consentErr) {
      this.setFieldError(this.consentCheck, consentErr);
      isValid = false;
      if (!firstErrorField) firstErrorField = this.consentCheck;
    }

    if (!isValid && firstErrorField) {
      firstErrorField.focus();
    }

    return isValid;
  }

  async handleSubmit() {
    if (this.isSubmitting) return;
    if (!this.validateForm()) return;

    this.isSubmitting = true;
    this.setLoadingState(true);

    const rawName = this.nameInput.value.trim();
    const normalizedMobile = Validator.normalizeMobile(this.mobileInput.value);
    const normalizedEmail = this.emailInput?.value ? this.emailInput.value.trim().toLowerCase() : '';
    const normalizedAddress = this.addressInput.value.trim();
    const notes = this.notesInput?.value ? this.notesInput.value.trim() : '';
    const whatsappAvailable = this.whatsappCheck?.checked ?? true;
    const urgency = this.urgencySelect?.value || 'Standard';
    const deliveryMode = this.deliverySelect?.value || 'WhatsApp PDF & Counter Collection';

    const user = window.AuthService && window.AuthService.currentUser ? window.AuthService.currentUser() : null;
    const requestId = generateRequestId();

    const requestRecord = {
      requestId: requestId,
      id: requestId,
      userId: user ? user.uid : 'guest',
      type: 'regular',
      serviceId: this.selectedService.id,
      serviceName: this.selectedService.name,
      category: this.selectedService.category || 'General Services',
      serviceCategory: this.selectedService.category || 'General Services',
      serviceSnapshot: {
        id: this.selectedService.id,
        name: this.selectedService.name,
        category: this.selectedService.category,
        fee: this.selectedService.fee || 'As per official notification',
        processingTime: this.selectedService.processingTime || 'Same day counter processing'
      },
      customer: {
        name: rawName,
        mobile: normalizedMobile,
        email: normalizedEmail,
        address: normalizedAddress
      },
      fullName: rawName,
      mobile: normalizedMobile,
      email: normalizedEmail,
      address: normalizedAddress,
      notes: notes,
      urgency: urgency,
      deliveryMode: deliveryMode,
      whatsappAvailable: whatsappAvailable,
      attachedDocs: this.uploadedFiles,
      status: 'pending',
      paymentStatus: 'pending',
      publicRemark: 'Application received. Queued for center document verification.',
      adminNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to Firestore collections 'requests' and 'applications'
    try {
      if (window.FirebaseApp && window.FirebaseApp.db) {
        const { db, doc, setDoc, serverTimestamp } = window.FirebaseApp;
        await setDoc(doc(db, 'requests', requestId), {
          ...requestRecord,
          serverTimestamp: serverTimestamp()
        });
        // Dual-write to 'applications' for legacy compatibility
        try {
          await setDoc(doc(db, 'applications', requestId), {
            ...requestRecord,
            serverTimestamp: serverTimestamp()
          });
        } catch (e) {}
      }
    } catch (err) {
      console.warn('[Apply] Firestore save notice (Saved to local cache):', err.message);
    }

    // Save to localStorage for instant client retrieval
    StorageService.saveApplication(requestRecord);

    this.setLoadingState(false);
    this.isSubmitting = false;

    this.showSuccessModal(requestRecord);
  }

  setLoadingState(isLoading) {
    if (!this.submitBtn) return;
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '<span class="spinner"></span> Submitting Application...';
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = '<span>Submit Application</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    }
  }

  showSuccessModal(appRecord) {
    if (!this.successModal) return;

    const idEl = document.getElementById('modalRequestIdText');
    if (idEl) idEl.textContent = appRecord.requestId;

    const modalService = document.getElementById('modalServiceVal');
    if (modalService) modalService.textContent = appRecord.serviceName;

    const modalName = document.getElementById('modalNameVal');
    if (modalName) modalName.textContent = appRecord.fullName;

    const modalMobile = document.getElementById('modalMobileVal');
    if (modalMobile) modalMobile.textContent = `+91 ${appRecord.mobile}`;

    const waMsg = `Hello Maa Enterprises,
I have submitted an online request for *${appRecord.serviceName}*.

*Request ID:* ${appRecord.requestId}
*Name:* ${appRecord.fullName}
*Mobile:* ${appRecord.mobile}

Please verify my application and let me know the document submission details.`;
    const waUrl = `https://wa.me/919693125648?text=${encodeURIComponent(waMsg)}`;

    const waBtn = document.getElementById('modalWhatsappBtn');
    if (waBtn) waBtn.href = waUrl;

    const trackBtn = document.getElementById('modalTrackBtn');
    if (trackBtn) trackBtn.href = `track-request.html?id=${encodeURIComponent(appRecord.requestId)}`;

    this.successModal.style.setProperty('display', 'flex', 'important');
    this.successModal.classList.add('modal-active');
    this.successModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-scroll-lock');
  }

  closeSuccessModal() {
    if (!this.successModal) return;
    this.successModal.style.setProperty('display', 'none', 'important');
    this.successModal.classList.remove('modal-active');
    this.successModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-scroll-lock');
  }
}

window.removeAttachedDoc = (idx) => {
  if (window.MaaApplicationController) {
    window.MaaApplicationController.uploadedFiles.splice(idx, 1);
    window.MaaApplicationController.renderUploadedDocs();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const appController = new ApplicationController();
  appController.init();
  window.MaaApplicationController = appController;
});

window.StorageService = StorageService;
window.generateRequestId = generateRequestId;
