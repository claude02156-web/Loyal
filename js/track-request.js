/**
 * Maa Enterprises — Cyber Cafe & Online Service Center
 * Public Request Tracking Controller (Multi-Source Firestore + Local Cache)
 */

'use strict';

class RequestTrackingController {
  constructor() {
    this.searchType = 'id';
    this.currentRequest = null;
    this.lastQuery = '';

    // DOM Elements
    this.form = document.getElementById('trackingForm');
    this.typeBtns = document.querySelectorAll('.search-type-btn');
    this.searchInput = document.getElementById('trackSearchInput');
    this.inputLabel = document.getElementById('trackInputLabel');
    this.inputGroup = document.getElementById('trackInputGroup');
    this.errorText = document.getElementById('trackErrorText');
    this.submitBtn = document.getElementById('trackSubmitBtn');

    // Display Areas
    this.resultArea = document.getElementById('trackResultArea');
    this.notFoundCard = document.getElementById('trackNotFoundArea');
    this.multipleMatchesArea = document.getElementById('multipleMatchesArea');
    this.matchesList = document.getElementById('matchesList');
    this.matchesCountEl = document.getElementById('matchesCount');

    // Result Card Elements
    this.requestIdEl = document.getElementById('resultRequestId');
    this.typeTagEl = document.getElementById('resultTypeTag');
    this.statusBadgeEl = document.getElementById('resultStatusBadge');
    this.serviceNameEl = document.getElementById('resultServiceName');
    this.customerNameEl = document.getElementById('resultCustomerName');
    this.customerMobileEl = document.getElementById('resultCustomerMobile');
    this.dateEl = document.getElementById('resultDate');
    this.paymentStatusEl = document.getElementById('resultPaymentStatus');
    this.publicNoteCard = document.getElementById('resultPublicNoteCard');
    this.publicNoteText = document.getElementById('resultPublicNoteText');
    this.rejectionCard = document.getElementById('resultRejectionCard');
    this.rejectionText = document.getElementById('resultRejectionText');
    this.whatsappBtn = document.getElementById('resultWhatsappBtn');
    this.refreshBtn = document.getElementById('resultRefreshBtn');

    this.stepNodes = document.querySelectorAll('.timeline-step');
  }

  init() {
    if (!this.form) return;
    this.bindEvents();
    this.checkUrlParams();
  }

  bindEvents() {
    this.typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        if (type && type !== this.searchType) {
          this.setSearchType(type);
        }
      });
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSearch();
    });

    this.searchInput?.addEventListener('input', () => this.clearError());
    this.refreshBtn?.addEventListener('click', () => this.handleSearch(true));
  }

  setSearchType(type) {
    this.searchType = type;
    this.clearError();
    this.hideAllOutputs();

    this.typeBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-type') === type;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    if (type === 'id') {
      if (this.inputLabel) this.inputLabel.textContent = 'Request ID';
      if (this.searchInput) {
        this.searchInput.placeholder = 'e.g. MAE-7K29PX or TRADE-8M4K2P';
        this.searchInput.type = 'text';
        this.searchInput.value = '';
        this.searchInput.focus();
      }
    } else {
      if (this.inputLabel) this.inputLabel.textContent = 'Mobile Number';
      if (this.searchInput) {
        this.searchInput.placeholder = 'Enter 10-digit registered mobile number';
        this.searchInput.type = 'tel';
        this.searchInput.value = '';
        this.searchInput.focus();
      }
    }
  }

  checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id') || params.get('requestId');
    const mobileParam = params.get('mobile');

    if (idParam) {
      this.setSearchType('id');
      if (this.searchInput) this.searchInput.value = idParam.trim();
      this.handleSearch();
    } else if (mobileParam) {
      this.setSearchType('mobile');
      if (this.searchInput) this.searchInput.value = mobileParam.trim();
      this.handleSearch();
    }
  }

  setError(msg) {
    if (this.inputGroup) this.inputGroup.classList.add('has-error');
    if (this.errorText) {
      this.errorText.textContent = msg;
      this.errorText.style.display = 'flex';
    }
    if (this.searchInput) this.searchInput.setAttribute('aria-invalid', 'true');
  }

  clearError() {
    if (this.inputGroup) this.inputGroup.classList.remove('has-error');
    if (this.errorText) {
      this.errorText.textContent = '';
      this.errorText.style.display = 'none';
    }
    if (this.searchInput) this.searchInput.removeAttribute('aria-invalid');
  }

  hideAllOutputs() {
    if (this.resultArea) this.resultArea.style.display = 'none';
    if (this.notFoundCard) this.notFoundCard.style.display = 'none';
    if (this.multipleMatchesArea) this.multipleMatchesArea.style.display = 'none';
  }

  async handleSearch(isRefresh = false) {
    const rawVal = this.searchInput?.value ? this.searchInput.value.trim() : '';
    if (!rawVal) {
      this.setError(this.searchType === 'id' ? 'Please enter a Request ID.' : 'Please enter a mobile number.');
      if (this.searchInput) this.searchInput.focus();
      return;
    }

    this.clearError();
    this.lastQuery = rawVal;

    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '<span class="spinner"></span> Checking Status...';
    }

    try {
      await this.executeLookup(rawVal);
    } catch (e) {
      console.warn('[Track] Lookup notice:', e);
    } finally {
      if (this.submitBtn) {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = '<span>Track Application</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      }
      if (isRefresh && window.showToast) {
        window.showToast('Application status refreshed.', 'info');
      }
    }
  }

  async executeLookup(query) {
    let matches = [];

    // 1. Check Firestore 'requests', 'applications', 'tradeRequests'
    try {
      if (window.FirebaseApp && window.FirebaseApp.db) {
        const { db, doc, getDoc, collection, getDocs, where, query: firestoreQuery } = window.FirebaseApp;
        
        if (this.searchType === 'id') {
          const cleanId = query.toUpperCase();
          // Check 'requests'
          let docSnap = await getDoc(doc(db, 'requests', cleanId));
          if (!docSnap.exists()) {
            // Check legacy 'applications'
            docSnap = await getDoc(doc(db, 'applications', cleanId));
          }
          if (docSnap.exists()) {
            matches.push({ id: docSnap.id, ...docSnap.data() });
          } else {
            // Check 'tradeRequests'
            const tradeSnap = await getDoc(doc(db, 'tradeRequests', cleanId));
            if (tradeSnap.exists()) {
              matches.push({ id: tradeSnap.id, ...tradeSnap.data() });
            }
          }
        } else {
          // Search by Mobile
          const cleanMobile = query.replace(/[^0-9]/g, '');
          const normalized = cleanMobile.length === 12 && cleanMobile.startsWith('91') ? cleanMobile.substring(2) : cleanMobile;
          
          if (normalized.length === 10) {
            const q1 = firestoreQuery(collection(db, 'requests'), where('mobile', '==', normalized));
            const s1 = await getDocs(q1);
            s1.forEach(d => matches.push({ id: d.id, ...d.data() }));

            if (matches.length === 0) {
              const q2 = firestoreQuery(collection(db, 'applications'), where('mobile', '==', normalized));
              const s2 = await getDocs(q2);
              s2.forEach(d => matches.push({ id: d.id, ...d.data() }));
            }
          }
        }
      }
    } catch (err) {
      console.warn('[Track] Firestore lookup notice:', err.message);
    }

    // 2. Fallback / Merge with LocalStorage
    const storedApps = window.StorageService ? window.StorageService.getApplications() : [];
    let localTrade = [];
    try {
      localTrade = JSON.parse(localStorage.getItem('maa_trade_requests') || '[]');
    } catch (e) {}

    const allLocal = [...storedApps, ...localTrade];

    if (this.searchType === 'id') {
      const cleanId = query.toUpperCase();
      if (matches.length === 0) {
        const localMatch = allLocal.find(a => (a.requestId && a.requestId.toUpperCase() === cleanId) || (a.id && a.id.toUpperCase() === cleanId) || (a.tradeId && a.tradeId.toUpperCase() === cleanId));
        if (localMatch) matches.push(localMatch);
      }

      if (matches.length > 0) {
        this.renderSingleResult(matches[0]);
      } else {
        this.renderNotFound(query);
      }
    } else {
      // Mobile matching in local storage
      const cleanMobile = query.replace(/[^0-9]/g, '');
      const normalized = cleanMobile.length === 12 && cleanMobile.startsWith('91') ? cleanMobile.substring(2) : cleanMobile;
      
      const localMatches = allLocal.filter(a => {
        const m = (a.mobile || (a.customer && a.customer.mobile) || '').replace(/[^0-9]/g, '');
        return m === normalized || m.endsWith(normalized);
      });

      // Merge unique by ID
      localMatches.forEach(lm => {
        const id = lm.requestId || lm.id || lm.tradeId;
        if (!matches.some(m => (m.requestId || m.id || m.tradeId) === id)) {
          matches.push(lm);
        }
      });

      if (matches.length === 1) {
        this.renderSingleResult(matches[0]);
      } else if (matches.length > 1) {
        this.renderMultipleResults(matches);
      } else {
        this.renderNotFound(query);
      }
    }
  }

  renderSingleResult(app) {
    this.hideAllOutputs();
    this.currentRequest = app;

    const reqId = app.requestId || app.id || app.tradeId || 'MAE-UNKNOWN';
    const applicantName = app.fullName || (app.customer && app.customer.name) || app.organizationName || 'Applicant';
    const mobile = app.mobile || (app.customer && app.customer.mobile) || '';
    const serviceName = app.serviceName || (app.type === 'trade' ? 'Bulk Service Request' : 'Online Cyber Cafe Service');
    const status = (app.status || 'pending').toLowerCase();
    const payment = (app.paymentStatus || 'pending').toLowerCase();
    const date = app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent Submission';

    if (this.requestIdEl) this.requestIdEl.textContent = reqId;
    if (this.customerNameEl) this.customerNameEl.textContent = applicantName;
    if (this.customerMobileEl) this.customerMobileEl.textContent = mobile ? `+91 ${mobile.replace(/(\d{5})(\d{5})/, '$1 $2')}` : '—';
    if (this.serviceNameEl) this.serviceNameEl.textContent = serviceName;
    if (this.dateEl) this.dateEl.textContent = date;

    // Status Badge
    if (this.statusBadgeEl) {
      this.statusBadgeEl.className = `status-pill status-${status}`;
      this.statusBadgeEl.textContent = this.getStatusLabel(status);
    }

    // Payment Badge
    if (this.paymentStatusEl) {
      this.paymentStatusEl.className = `status-pill status-${payment === 'paid' ? 'completed' : 'pending'}`;
      this.paymentStatusEl.textContent = payment === 'paid' ? 'Paid / Clear' : 'Pending Counter Settlement';
    }

    // Public Remark
    if (this.publicNoteCard && this.publicNoteText) {
      if (app.publicRemark && app.publicRemark.trim()) {
        this.publicNoteText.textContent = app.publicRemark;
        this.publicNoteCard.style.display = 'block';
      } else {
        this.publicNoteCard.style.display = 'none';
      }
    }

    // Rejection Notice
    if (this.rejectionCard && this.rejectionText) {
      if (status === 'rejected') {
        this.rejectionText.textContent = app.publicRemark || 'Application requires document correction or re-submission. Please contact center.';
        this.rejectionCard.style.display = 'block';
      } else {
        this.rejectionCard.style.display = 'none';
      }
    }

    // Timeline Steps
    this.updateTimeline(status);

    // WhatsApp Action URL
    if (this.whatsappBtn) {
      const msg = `Hello Maa Enterprises, I am checking the status of my application *${reqId}* (${serviceName}) for ${applicantName}.`;
      this.whatsappBtn.href = `https://wa.me/919693125648?text=${encodeURIComponent(msg)}`;
    }

    if (this.resultArea) this.resultArea.style.display = 'block';
    this.resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  updateTimeline(status) {
    if (!this.stepNodes) return;
    const stages = ['submitted', 'verified', 'processing', 'completed'];

    let activeStageIndex = 0;
    if (status === 'verified') activeStageIndex = 1;
    else if (status === 'processing' || status === 'in_progress') activeStageIndex = 2;
    else if (status === 'completed') activeStageIndex = 3;
    else if (status === 'rejected') activeStageIndex = 1; // halted at review

    this.stepNodes.forEach((node, idx) => {
      node.classList.remove('completed', 'active', 'rejected');
      if (status === 'rejected' && idx === activeStageIndex) {
        node.classList.add('rejected');
      } else if (idx < activeStageIndex) {
        node.classList.add('completed');
      } else if (idx === activeStageIndex) {
        node.classList.add('active');
      }
    });
  }

  getStatusLabel(status) {
    switch (status) {
      case 'completed': return 'Completed & Ready';
      case 'processing':
      case 'in_progress': return 'In Processing';
      case 'verified': return 'Documents Verified';
      case 'rejected': return 'Action / Revision Needed';
      case 'pending':
      default: return 'Application Queued';
    }
  }

  renderMultipleResults(apps) {
    this.hideAllOutputs();
    if (!this.multipleMatchesArea || !this.matchesList) return;

    if (this.matchesCountEl) this.matchesCountEl.textContent = apps.length;

    this.matchesList.innerHTML = apps.map(app => {
      const reqId = app.requestId || app.id || app.tradeId;
      const service = app.serviceName || (app.type === 'trade' ? 'Bulk Service Request' : 'Service Request');
      const status = (app.status || 'pending').toLowerCase();
      const date = app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';

      return `
        <div class="match-item-card" onclick="window.MaaRequestTracking.selectMatch('${escapeHtml(reqId)}')" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all var(--transition-fast);">
          <div>
            <span style="font-family: monospace; font-weight: 700; color: var(--accent-cyan); font-size: 1rem;">${escapeHtml(reqId)}</span>
            <h4 style="color: #ffffff; font-size: 0.95rem; margin: 0.25rem 0;">${escapeHtml(service)}</h4>
            <span style="font-size: 0.8125rem; color: var(--text-secondary);">Submitted: ${date}</span>
          </div>
          <div style="text-align: right;">
            <span class="status-pill status-${status}" style="margin-bottom: 0.5rem; display: inline-block;">${this.getStatusLabel(status)}</span>
            <div><span class="btn btn-outline btn-xs">View Status &rarr;</span></div>
          </div>
        </div>
      `;
    }).join('');

    this.multipleMatchesArea.style.display = 'block';
  }

  selectMatch(reqId) {
    this.setSearchType('id');
    if (this.searchInput) this.searchInput.value = reqId;
    this.handleSearch();
  }

  renderNotFound(query) {
    this.hideAllOutputs();
    if (this.notFoundCard) {
      const qEl = document.getElementById('notFoundQueryText');
      if (qEl) qEl.textContent = query;
      this.notFoundCard.style.display = 'block';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const controller = new RequestTrackingController();
  controller.init();
  window.MaaRequestTracking = controller;
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
