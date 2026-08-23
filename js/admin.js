/**
 * MAA ENTERPRISES — ADMIN DASHBOARD CONTROLLER (js/admin.js)
 * Full Production Admin Management Suite:
 * - Real-time KPI statistics computation
 * - Requests & Applications management (Firestore 'requests' + 'applications' + Local)
 * - Complete Services Catalog CRUD, Priority Ordering & Homepage Features
 * - FAQ Management CRUD & Live Accordion Sync
 * - Website & Center Information Live Configuration
 * - Customer Resumes Repository
 * - Registered Customers & Contact Messages
 * - Secure Firebase Modular Auth & Firestore Role Guard
 */

import { 
  db, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  isFirebaseConfigured 
} from './firebase-config.js';
import { requireAdminAuth, logoutUser } from './auth.js';
import { showToast, formatDate, escapeHtml } from './app.js';

let applicationsList = [];
let servicesList = [];
let faqsList = [];
let resumesList = [];
let usersList = [];
let tradeList = [];
let inquiriesList = [];

let currentEditingAppId = null;
let currentEditingServiceId = null;
let currentEditingFaqId = null;

// Baseline default FAQs
const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "How can I apply for an online service?",
    answer: "You can browse available service categories under the Services section, select the required service, and submit your basic applicant information. You will receive a unique Request ID upon submission.",
    order: 1,
    active: true
  },
  {
    id: "faq-2",
    question: "How do I send my required documents?",
    answer: "After submitting your request on the portal, you can share clear photos or PDF copies of your required documents via our official WhatsApp number (9693125648) along with your Request ID.",
    order: 2,
    active: true
  },
  {
    id: "faq-3",
    question: "How can I track my application status?",
    answer: "Visit the Track Application page, enter your assigned Request ID or mobile number, and view real-time processing milestones from review to final completion.",
    order: 3,
    active: true
  },
  {
    id: "faq-4",
    question: "Can I create and download a resume here?",
    answer: "Yes! Our Resume Maker lets you enter your education, skills, and experience, choose a modern layout, and download a ready-to-print A4 PDF directly to your device.",
    order: 4,
    active: true
  },
  {
    id: "faq-5",
    question: "How can I contact Maa Enterprises directly?",
    answer: "You can reach us by phone or WhatsApp at 9693125648, or visit our cyber cafe center located at Mahalpar, Bihar Sharif, Nalanda, Bihar - 803101 during our business hours (10:00 AM – 06:00 PM).",
    order: 5,
    active: true
  }
];

// Baseline default center settings
const DEFAULT_CENTER_SETTINGS = {
  businessName: "Maa Enterprises",
  subtitle: "Cyber Cafe & Online Service Center",
  owner: "Rajesh Kumar",
  phone: "9693125648",
  whatsapp: "9693125648",
  address: "Mahalpar, Bihar Sharif, Nalanda, Bihar - 803101",
  hours: "10:00 AM – 06:00 PM (Monday – Saturday)",
  email: "admin@maaenterprises.com",
  notice: "Open for all government recruitment, college admission & RTPS certificate form filling."
};

// Initialize on DOM ready with auth guard
document.addEventListener('DOMContentLoaded', () => {
  requireAdminAuth((adminUser) => {
    initAdminDashboard(adminUser);
  });
});

function initAdminDashboard(adminUser) {
  const emailEl = document.getElementById('adminUserEmail');
  if (emailEl) {
    emailEl.textContent = adminUser.email || 'Center Admin';
  }

  document.getElementById('adminLogoutBtn')?.addEventListener('click', async () => {
    await logoutUser();
  });

  initTabs();
  bindModals();
  loadAllDashboardData();
}

function initTabs() {
  const tabButtons = document.querySelectorAll('.admin-nav-tab');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      if (!targetId) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
    });
  });
}

async function loadAllDashboardData() {
  await Promise.all([
    loadApplications(),
    loadServicesCatalog(),
    loadFaqs(),
    loadResumes(),
    loadUsers(),
    loadTradeRequests(),
    loadInquiries(),
    loadCenterSettings()
  ]);

  updateKPIMetrics();
}

/**
 * 1. Load Applications / Requests
 */
async function loadApplications() {
  applicationsList = [];

  // Local storage
  const stored = window.StorageService ? window.StorageService.getApplications() : [];
  stored.forEach(app => applicationsList.push(normalizeApplicationRecord(app)));

  // Firestore 'requests' & 'applications'
  if (isFirebaseConfigured && db) {
    try {
      const snap1 = await getDocs(collection(db, 'requests'));
      snap1.forEach(d => {
        const data = d.data();
        if (!applicationsList.some(a => a.requestId === d.id)) {
          applicationsList.push(normalizeApplicationRecord({ id: d.id, ...data }));
        }
      });

      const snap2 = await getDocs(collection(db, 'applications'));
      snap2.forEach(d => {
        const data = d.data();
        if (!applicationsList.some(a => a.requestId === d.id)) {
          applicationsList.push(normalizeApplicationRecord({ id: d.id, ...data }));
        }
      });
    } catch (err) {
      console.warn('[Admin] Firestore requests fetch notice:', err.message);
    }
  }

  // Sort descending by date
  applicationsList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  renderApplicationsTable(applicationsList);
  bindAppFilters();
}

function normalizeApplicationRecord(app) {
  return {
    id: app.id || app.requestId || 'REQ-UNKNOWN',
    requestId: app.requestId || app.id || 'REQ-UNKNOWN',
    userId: app.userId || 'guest',
    serviceName: app.serviceName || (app.serviceSnapshot && app.serviceSnapshot.name) || 'Online Service',
    category: app.category || app.serviceCategory || 'General',
    fullName: app.fullName || (app.customer && app.customer.name) || 'Applicant',
    mobile: app.mobile || (app.customer && app.customer.mobile) || '—',
    email: app.email || (app.customer && app.customer.email) || '',
    address: app.address || (app.customer && app.customer.address) || '',
    notes: app.notes || '',
    urgency: app.urgency || 'Standard',
    deliveryMode: app.deliveryMode || 'Counter / WhatsApp',
    attachedDocs: app.attachedDocs || [],
    status: app.status || 'pending',
    paymentStatus: app.paymentStatus || 'pending',
    publicRemark: app.publicRemark || '',
    adminNotes: app.adminNotes || '',
    createdAt: app.createdAt || new Date().toISOString(),
    updatedAt: app.updatedAt || new Date().toISOString()
  };
}

function renderApplicationsTable(apps) {
  const tbody = document.getElementById('adminAppsTableBody');
  if (!tbody) return;

  if (apps.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-secondary);">No customer applications matching criteria.</td></tr>';
    return;
  }

  tbody.innerHTML = apps.map(app => {
    const statusClass = 'status-' + (app.status || 'pending').toLowerCase();
    const paymentClass = 'status-' + (app.paymentStatus === 'paid' ? 'completed' : 'pending');
    const dateStr = app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';

    return `
      <tr>
        <td><strong style="color:var(--accent-cyan); font-family:monospace;">${escapeHtml(app.requestId)}</strong></td>
        <td>
          <strong style="color:#ffffff;">${escapeHtml(app.fullName)}</strong>
          <div style="font-size:0.8125rem; color:var(--text-secondary);">+91 ${escapeHtml(app.mobile)}</div>
        </td>
        <td>
          <div style="color:#ffffff; font-weight:500;">${escapeHtml(app.serviceName)}</div>
          <span style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(app.category)}</span>
        </td>
        <td style="color:var(--text-secondary); font-size:0.8125rem;">${dateStr}</td>
        <td><span class="status-badge ${statusClass}">${escapeHtml(app.status)}</span></td>
        <td><span class="status-badge ${paymentClass}">${escapeHtml(app.paymentStatus || 'pending')}</span></td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button type="button" class="btn btn-outline btn-xs" onclick="openAppDetailsModal('${escapeHtml(app.requestId)}')">Manage</button>
            <a href="https://wa.me/91${escapeHtml(app.mobile.replace(/[^0-9]/g,''))}?text=Hello%20${encodeURIComponent(app.fullName)},%20regarding%20your%20request%20${encodeURIComponent(app.requestId)}" target="_blank" class="btn btn-secondary btn-xs" title="WhatsApp Applicant">WA</a>
            <button type="button" class="btn btn-outline btn-xs" onclick="deleteAppRequest('${escapeHtml(app.requestId)}')" style="color:var(--danger);" title="Delete">&times;</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function bindAppFilters() {
  const searchInput = document.getElementById('adminAppSearch');
  const statusFilter = document.getElementById('adminStatusFilter');
  const paymentFilter = document.getElementById('adminPaymentFilter');

  function applyFilter() {
    const q = searchInput?.value.trim().toLowerCase() || '';
    const st = statusFilter?.value || 'all';
    const pay = paymentFilter?.value || 'all';

    const filtered = applicationsList.filter(app => {
      const matchesQ = !q || 
        app.requestId.toLowerCase().includes(q) ||
        app.fullName.toLowerCase().includes(q) ||
        app.mobile.includes(q) ||
        app.serviceName.toLowerCase().includes(q);

      const matchesSt = st === 'all' || (app.status && app.status.toLowerCase() === st.toLowerCase());
      const matchesPay = pay === 'all' || (app.paymentStatus && app.paymentStatus.toLowerCase() === pay.toLowerCase());

      return matchesQ && matchesSt && matchesPay;
    });

    renderApplicationsTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilter);
  statusFilter?.addEventListener('change', applyFilter);
  paymentFilter?.addEventListener('change', applyFilter);
  document.getElementById('refreshAppsBtn')?.addEventListener('click', () => loadApplications());
}

window.openAppDetailsModal = (requestId) => {
  const app = applicationsList.find(a => a.requestId === requestId || a.id === requestId);
  if (!app) return;

  currentEditingAppId = requestId;

  document.getElementById('modalAppIdTitle').textContent = `Manage Request: ${app.requestId}`;
  document.getElementById('detailApplicantName').textContent = app.fullName;
  document.getElementById('detailApplicantMobile').textContent = `+91 ${app.mobile}`;
  document.getElementById('detailApplicantService').textContent = app.serviceName;
  document.getElementById('detailApplicantDate').textContent = app.createdAt ? new Date(app.createdAt).toLocaleString('en-IN') : 'Recent';
  
  const docsEl = document.getElementById('detailUploadedDocs');
  if (docsEl) {
    if (app.attachedDocs && app.attachedDocs.length > 0) {
      docsEl.innerHTML = app.attachedDocs.map(d => `<span class="badge badge-accent">📄 ${escapeHtml(d.name)}</span>`).join(' ');
    } else {
      docsEl.textContent = 'None attached online (Submitted at counter / WhatsApp)';
    }
  }

  document.getElementById('detailStatusSelect').value = app.status || 'pending';
  document.getElementById('detailPaymentSelect').value = app.paymentStatus || 'pending';
  document.getElementById('detailPublicRemark').value = app.publicRemark || '';
  document.getElementById('detailAdminNote').value = app.adminNotes || '';

  const modal = document.getElementById('adminAppModal');
  if (modal) modal.classList.add('modal-active');
};

window.deleteAppRequest = async (requestId) => {
  if (!confirm(`Are you sure you want to permanently delete request ${requestId}?`)) return;

  applicationsList = applicationsList.filter(a => a.requestId !== requestId && a.id !== requestId);
  if (window.StorageService) {
    window.StorageService.saveApplications(applicationsList);
  }

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'requests', requestId));
      try { await deleteDoc(doc(db, 'applications', requestId)); } catch(e) {}
    } catch (err) {
      console.warn('Firestore delete notice:', err.message);
    }
  }

  renderApplicationsTable(applicationsList);
  updateKPIMetrics();
  showToast(`Request ${requestId} deleted.`, 'info');
};

/**
 * 2. Dynamic Services Catalog CRUD & Real-Time Sync
 */
async function loadServicesCatalog() {
  servicesList = [];

  if (typeof getAllServices === 'function') {
    servicesList = getAllServices(true).map(s => ({ ...s }));
  }

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        const map = new Map();
        servicesList.forEach(s => map.set(s.id, s));
        snap.forEach(d => {
          map.set(d.id, { id: d.id, ...d.data() });
        });
        servicesList = Array.from(map.values());
      }
    } catch (err) {
      console.warn('[Admin] Firestore services fetch notice:', err.message);
    }
  }

  servicesList.sort((a, b) => (a.order || 999) - (b.order || 999));
  servicesList.forEach((s, idx) => {
    if (!s.order) s.order = idx + 1;
  });

  renderServicesTable(servicesList);
  bindServiceFilters();
}

function renderServicesTable(services) {
  const tbody = document.getElementById('adminServicesTableBody');
  if (!tbody) return;

  if (services.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-secondary);">No services matching criteria.</td></tr>';
    return;
  }

  tbody.innerHTML = services.map((s, idx) => {
    const isActive = s.active !== false;
    const isFeatured = s.featured === true;
    const orderNum = s.order || (idx + 1);

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span style="font-weight: 700; color: var(--accent-cyan); font-size: 0.85rem; min-width: 22px;">#${orderNum}</span>
            <div style="display: flex; flex-direction: column; gap: 1px;">
              <button type="button" class="btn btn-xs" style="padding: 1px 4px; font-size: 0.65rem; line-height: 1;" onclick="moveServiceOrder('${escapeHtml(s.id)}', -1)" title="Move Up in List & Homepage">▲</button>
              <button type="button" class="btn btn-xs" style="padding: 1px 4px; font-size: 0.65rem; line-height: 1;" onclick="moveServiceOrder('${escapeHtml(s.id)}', 1)" title="Move Down in List & Homepage">▼</button>
            </div>
          </div>
        </td>
        <td>
          <strong style="color:#ffffff; font-size:0.95rem;">${escapeHtml(s.name)}</strong>
          <div style="font-size:0.75rem; color:var(--text-secondary); max-width:320px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(s.shortDescription || '')}</div>
        </td>
        <td><span class="badge" style="background:rgba(255,255,255,0.06); color:var(--text-secondary);">${escapeHtml(s.category)}</span></td>
        <td>
          <div style="color:var(--accent-cyan); font-weight:600;">${escapeHtml(s.fee || 'Govt Fee')}</div>
          <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(s.processingTime || 'Same day')}</span>
        </td>
        <td>
          <button type="button" class="btn btn-xs ${isFeatured ? 'btn-primary' : 'btn-outline'}" onclick="toggleServiceFeatured('${escapeHtml(s.id)}')" title="Toggle whether this appears in Popular Online Services on index.html">
            ${isFeatured ? '⭐ Featured' : '☆ Standard'}
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-xs ${isActive ? 'btn-secondary' : 'btn-outline'}" style="${isActive ? 'color:#34d399; border-color:rgba(16,185,129,0.4);' : 'color:#f87171; border-color:rgba(239,68,68,0.4);'}" onclick="toggleServiceActive('${escapeHtml(s.id)}')">
            ${isActive ? '✓ Active' : '✕ Inactive'}
          </button>
        </td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button type="button" class="btn btn-outline btn-xs" onclick="openEditServiceModal('${escapeHtml(s.id)}')">Edit</button>
            <button type="button" class="btn btn-outline btn-xs" onclick="deleteService('${escapeHtml(s.id)}')" style="color:var(--danger);" title="Delete Service">&times;</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function bindServiceFilters() {
  const searchInput = document.getElementById('adminServiceSearch');
  const catFilter = document.getElementById('adminServiceCategoryFilter');
  const featFilter = document.getElementById('adminServiceFeaturedFilter');
  const statFilter = document.getElementById('adminServiceStatusFilter');

  function applyServiceFilter() {
    const q = searchInput?.value.trim().toLowerCase() || '';
    const cat = catFilter?.value || 'all';
    const feat = featFilter?.value || 'all';
    const stat = statFilter?.value || 'all';

    const filtered = servicesList.filter(s => {
      const matchesQ = !q || 
        s.name.toLowerCase().includes(q) || 
        (s.shortDescription && s.shortDescription.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q));

      const matchesCat = cat === 'all' || s.category === cat;
      const matchesFeat = feat === 'all' || (feat === 'featured' ? s.featured === true : s.featured !== true);
      const matchesStat = stat === 'all' || (stat === 'active' ? s.active !== false : s.active === false);

      return matchesQ && matchesCat && matchesFeat && matchesStat;
    });

    renderServicesTable(filtered);
  }

  searchInput?.addEventListener('input', applyServiceFilter);
  catFilter?.addEventListener('change', applyServiceFilter);
  featFilter?.addEventListener('change', applyServiceFilter);
  statFilter?.addEventListener('change', applyServiceFilter);

  document.getElementById('addNewServiceBtn')?.addEventListener('click', () => {
    openEditServiceModal(null);
  });
}

async function persistServicesState() {
  servicesList.sort((a, b) => (a.order || 999) - (b.order || 999));
  servicesList.forEach((s, i) => { s.order = i + 1; });

  try {
    localStorage.setItem('maa_dynamic_services', JSON.stringify(servicesList));
  } catch(e) {}

  window.dispatchEvent(new CustomEvent('maa_services_updated', { detail: servicesList }));
  renderServicesTable(servicesList);
  updateKPIMetrics();
}

window.moveServiceOrder = async (serviceId, delta) => {
  const index = servicesList.findIndex(s => s.id === serviceId);
  if (index < 0) return;

  const targetIndex = index + delta;
  if (targetIndex < 0 || targetIndex >= servicesList.length) return;

  const temp = servicesList[index];
  servicesList[index] = servicesList[targetIndex];
  servicesList[targetIndex] = temp;

  await persistServicesState();

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'services', serviceId), { order: servicesList[targetIndex].order, updatedAt: serverTimestamp() });
      await updateDoc(doc(db, 'services', servicesList[index].id), { order: servicesList[index].order, updatedAt: serverTimestamp() });
    } catch(e) {}
  }

  showToast('Service arrangement updated.', 'info');
};

window.toggleServiceFeatured = async (serviceId) => {
  const s = servicesList.find(item => item.id === serviceId);
  if (!s) return;

  s.featured = !s.featured;
  s.updatedAt = new Date().toISOString();

  await persistServicesState();

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'services', serviceId), {
        featured: s.featured,
        updatedAt: serverTimestamp()
      });
    } catch (e) {}
  }

  showToast(`"${s.name}" is now ${s.featured ? '⭐ Featured on Homepage' : 'Standard Catalog Service'}.`, 'success');
};

window.toggleServiceActive = async (serviceId) => {
  const s = servicesList.find(item => item.id === serviceId);
  if (!s) return;

  s.active = s.active === false ? true : false;
  s.updatedAt = new Date().toISOString();

  await persistServicesState();

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'services', serviceId), {
        active: s.active,
        updatedAt: serverTimestamp()
      });
    } catch (e) {}
  }

  showToast(`Service "${s.name}" is now ${s.active ? 'Active' : 'Inactive'}.`, 'info');
};

window.openEditServiceModal = (serviceId) => {
  currentEditingServiceId = serviceId;
  const isNew = !serviceId;

  document.getElementById('serviceModalTitle').textContent = isNew ? 'Add New Cyber Cafe Service' : 'Edit Service Details & Display';
  document.getElementById('editServiceId').value = serviceId || '';

  const s = isNew ? null : servicesList.find(item => item.id === serviceId);

  document.getElementById('serviceNameInput').value = s ? s.name : '';
  document.getElementById('serviceCategorySelect').value = s ? s.category : 'Government Jobs & Recruitment';
  document.getElementById('serviceShortDescInput').value = s ? s.shortDescription : '';
  document.getElementById('serviceFullDescInput').value = s ? (s.description || s.shortDescription) : '';
  document.getElementById('serviceDocsInput').value = s && Array.isArray(s.documents) ? s.documents.join(', ') : '';
  document.getElementById('serviceFeeInput').value = s ? (s.fee || '') : '';
  document.getElementById('serviceTurnaroundInput').value = s ? (s.processingTime || '') : '';
  document.getElementById('serviceOrderInput').value = s ? (s.order || 1) : (servicesList.length + 1);
  document.getElementById('serviceIconSelect').value = s ? (s.icon || 'briefcase') : 'briefcase';
  document.getElementById('serviceFeaturedCheck').checked = s ? s.featured === true : true;
  document.getElementById('serviceActiveCheck').checked = s ? s.active !== false : true;

  document.getElementById('adminServiceModal')?.classList.add('modal-active');
};

window.deleteService = async (serviceId) => {
  const s = servicesList.find(item => item.id === serviceId);
  if (!confirm(`Are you sure you want to delete service "${s?.name || serviceId}"?`)) return;

  servicesList = servicesList.filter(item => item.id !== serviceId);

  await persistServicesState();

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'services', serviceId));
    } catch (e) {}
  }

  showToast('Service deleted from website.', 'info');
};

window.seedDefaultServicesToFirestore = async () => {
  if (!confirm('This will load all 58+ verified baseline services into your website catalog. Continue?')) return;

  const btn = document.getElementById('seedServicesBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Resetting Services...';
  }

  try {
    const services = typeof getAllServices === 'function' ? getAllServices(true) : [];
    servicesList = services.map((s, idx) => ({ ...s, order: idx + 1 }));

    await persistServicesState();

    if (isFirebaseConfigured && db) {
      let count = 0;
      for (const s of servicesList) {
        await setDoc(doc(db, 'services', s.id), {
          ...s,
          serverTimestamp: serverTimestamp()
        }, { merge: true });
        count++;
      }
      showToast(`Successfully initialized ${count} services in Firestore & Website!`, 'success');
    } else {
      showToast(`Successfully reset all 58+ baseline services in local website storage!`, 'success');
    }
  } catch (err) {
    showToast('Failed to seed services: ' + err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '⚡ Reset &amp; Seed Baseline';
    }
  }
};

/**
 * 3. FAQ Management CRUD
 */
async function loadFaqs() {
  faqsList = [];

  // Try local storage
  try {
    const local = localStorage.getItem('maa_faqs');
    if (local) {
      faqsList = JSON.parse(local);
    }
  } catch(e) {}

  if (faqsList.length === 0) {
    faqsList = [...DEFAULT_FAQS];
  }

  // Sync from Firestore
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'faqs'));
      if (!snap.empty) {
        const list = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() }));
        faqsList = list;
      }
    } catch (e) {
      console.warn('[Admin] Firestore FAQs fetch notice:', e.message);
    }
  }

  faqsList.sort((a, b) => (a.order || 999) - (b.order || 999));
  renderFaqsTable(faqsList);
}

function renderFaqsTable(faqs) {
  const tbody = document.getElementById('adminFaqsTableBody');
  if (!tbody) return;

  if (faqs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-secondary);">No FAQs created. Click "+ Add New FAQ" to create one.</td></tr>';
    return;
  }

  tbody.innerHTML = faqs.map((f, idx) => {
    const isActive = f.active !== false;
    const orderNum = f.order || (idx + 1);

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span style="font-weight: 700; color: var(--accent-cyan); font-size: 0.85rem; min-width: 20px;">#${orderNum}</span>
            <div style="display: flex; flex-direction: column; gap: 1px;">
              <button type="button" class="btn btn-xs" style="padding: 1px 4px; font-size: 0.65rem;" onclick="moveFaqOrder('${escapeHtml(f.id)}', -1)">▲</button>
              <button type="button" class="btn btn-xs" style="padding: 1px 4px; font-size: 0.65rem;" onclick="moveFaqOrder('${escapeHtml(f.id)}', 1)">▼</button>
            </div>
          </div>
        </td>
        <td><strong style="color: #ffffff;">${escapeHtml(f.question)}</strong></td>
        <td><div style="font-size: 0.8125rem; color: var(--text-secondary); max-width: 380px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(f.answer)}</div></td>
        <td>
          <button type="button" class="btn btn-xs ${isActive ? 'btn-secondary' : 'btn-outline'}" style="${isActive ? 'color:#34d399;' : 'color:#f87171;'}" onclick="toggleFaqActive('${escapeHtml(f.id)}')">
            ${isActive ? '✓ Active' : '✕ Hidden'}
          </button>
        </td>
        <td>
          <div style="display: flex; gap: 0.35rem;">
            <button type="button" class="btn btn-outline btn-xs" onclick="openEditFaqModal('${escapeHtml(f.id)}')">Edit</button>
            <button type="button" class="btn btn-outline btn-xs" onclick="deleteFaq('${escapeHtml(f.id)}')" style="color: var(--danger);">&times;</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function persistFaqsState() {
  faqsList.sort((a, b) => (a.order || 999) - (b.order || 999));
  faqsList.forEach((f, i) => { f.order = i + 1; });

  try {
    localStorage.setItem('maa_faqs', JSON.stringify(faqsList));
  } catch(e) {}

  window.dispatchEvent(new CustomEvent('maa_faqs_updated', { detail: faqsList }));
  renderFaqsTable(faqsList);
}

window.moveFaqOrder = async (faqId, delta) => {
  const index = faqsList.findIndex(f => f.id === faqId);
  if (index < 0) return;

  const targetIndex = index + delta;
  if (targetIndex < 0 || targetIndex >= faqsList.length) return;

  const temp = faqsList[index];
  faqsList[index] = faqsList[targetIndex];
  faqsList[targetIndex] = temp;

  await persistFaqsState();

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'faqs', faqId), { order: faqsList[targetIndex].order, updatedAt: serverTimestamp() });
      await updateDoc(doc(db, 'faqs', faqsList[index].id), { order: faqsList[index].order, updatedAt: serverTimestamp() });
    } catch(e) {}
  }
};

window.toggleFaqActive = async (faqId) => {
  const f = faqsList.find(item => item.id === faqId);
  if (!f) return;

  f.active = f.active === false ? true : false;
  await persistFaqsState();

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'faqs', faqId), { active: f.active, updatedAt: serverTimestamp() });
    } catch(e) {}
  }
};

window.openEditFaqModal = (faqId) => {
  currentEditingFaqId = faqId;
  const isNew = !faqId;

  document.getElementById('faqModalTitle').textContent = isNew ? 'Add New FAQ' : 'Edit FAQ Item';
  document.getElementById('editFaqId').value = faqId || '';

  const f = isNew ? null : faqsList.find(item => item.id === faqId);

  document.getElementById('faqQuestionInput').value = f ? f.question : '';
  document.getElementById('faqAnswerInput').value = f ? f.answer : '';
  document.getElementById('faqOrderInput').value = f ? (f.order || 1) : (faqsList.length + 1);
  document.getElementById('faqActiveCheck').checked = f ? f.active !== false : true;

  document.getElementById('adminFaqModal')?.classList.add('modal-active');
};

window.deleteFaq = async (faqId) => {
  if (!confirm('Are you sure you want to delete this FAQ?')) return;

  faqsList = faqsList.filter(f => f.id !== faqId);
  await persistFaqsState();

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'faqs', faqId));
    } catch(e) {}
  }

  showToast('FAQ deleted.', 'info');
};

window.seedDefaultFaqsToFirestore = async () => {
  if (!confirm('This will reset FAQs to the standard 5 baseline questions. Continue?')) return;
  faqsList = [...DEFAULT_FAQS];
  await persistFaqsState();

  if (isFirebaseConfigured && db) {
    for (const f of faqsList) {
      await setDoc(doc(db, 'faqs', f.id), {
        ...f,
        serverTimestamp: serverTimestamp()
      }, { merge: true });
    }
  }

  showToast('FAQs reset to defaults.', 'success');
};

/**
 * 4. Center & Website Information Management
 */
async function loadCenterSettings() {
  let settings = { ...DEFAULT_CENTER_SETTINGS };

  try {
    const local = localStorage.getItem('maa_center_settings');
    if (local) {
      settings = { ...settings, ...JSON.parse(local) };
    }
  } catch(e) {}

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'general'));
      if (snap.exists()) {
        settings = { ...settings, ...snap.data() };
      }
    } catch(e) {}
  }

  // Populate Form Fields
  document.getElementById('settingBusinessName').value = settings.businessName || '';
  document.getElementById('settingSubtitle').value = settings.subtitle || '';
  document.getElementById('settingOwner').value = settings.owner || '';
  document.getElementById('settingPhone').value = settings.phone || '';
  document.getElementById('settingWhatsapp').value = settings.whatsapp || '';
  document.getElementById('settingAddress').value = settings.address || '';
  document.getElementById('settingHours').value = settings.hours || '';
  document.getElementById('settingEmail').value = settings.email || '';
  document.getElementById('settingNotice').value = settings.notice || '';
}

window.resetDefaultSettings = () => {
  if (!confirm('Reset all website information to defaults?')) return;
  
  const s = DEFAULT_CENTER_SETTINGS;
  document.getElementById('settingBusinessName').value = s.businessName;
  document.getElementById('settingSubtitle').value = s.subtitle;
  document.getElementById('settingOwner').value = s.owner;
  document.getElementById('settingPhone').value = s.phone;
  document.getElementById('settingWhatsapp').value = s.whatsapp;
  document.getElementById('settingAddress').value = s.address;
  document.getElementById('settingHours').value = s.hours;
  document.getElementById('settingEmail').value = s.email;
  document.getElementById('settingNotice').value = s.notice;

  showToast('Settings reset to defaults in form. Click Save to apply.', 'info');
};

/**
 * 5. Load Resumes
 */
async function loadResumes() {
  resumesList = [];

  try {
    resumesList = JSON.parse(localStorage.getItem('maa_saved_resumes') || '[]');
  } catch (e) {}

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'resumes'));
      snap.forEach(d => {
        const data = d.data();
        if (!resumesList.some(r => (r.id === d.id || r.resumeId === d.id))) {
          resumesList.push({ id: d.id, ...data });
        }
      });
    } catch (e) {
      console.warn('Firestore resumes fetch notice:', e.message);
    }
  }

  renderResumesTable(resumesList);
}

function renderResumesTable(resumes) {
  const tbody = document.getElementById('adminResumesTableBody');
  if (!tbody) return;

  if (resumes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-secondary);">No customer resumes stored.</td></tr>';
    return;
  }

  tbody.innerHTML = resumes.map(r => {
    const candidateName = r.personal?.fullName || 'Untitled Candidate';
    const title = r.title || 'Professional Resume';
    const template = r.template || 'classic-professional';
    const dateStr = r.updatedAt ? new Date(r.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';
    const resId = r.id || r.resumeId || 'RES-0';

    return `
      <tr>
        <td><strong style="color:#ffffff;">${escapeHtml(candidateName)}</strong></td>
        <td style="color:var(--accent-cyan);">${escapeHtml(title)}</td>
        <td><span class="badge" style="background:rgba(255,255,255,0.06); color:var(--text-secondary); text-transform:capitalize;">${escapeHtml(template)}</span></td>
        <td style="color:var(--text-secondary); font-size:0.8125rem;">${dateStr}</td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <a href="resume-maker.html?load=${encodeURIComponent(resId)}" target="_blank" class="btn btn-outline btn-xs">Open in Builder</a>
            <button type="button" class="btn btn-outline btn-xs" onclick="deleteAdminResume('${encodeURIComponent(resId)}')" style="color:var(--danger);">&times;</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteAdminResume = async (resumeId) => {
  if (!confirm('Delete this resume record?')) return;

  resumesList = resumesList.filter(r => r.id !== resumeId && r.resumeId !== resumeId);
  try {
    localStorage.setItem('maa_saved_resumes', JSON.stringify(resumesList));
  } catch(e) {}

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'resumes', resumeId));
    } catch(e) {}
  }

  renderResumesTable(resumesList);
  updateKPIMetrics();
  showToast('Resume deleted.', 'info');
};

/**
 * 6. Load Registered Customers
 */
async function loadUsers() {
  usersList = [];

  try {
    usersList = JSON.parse(localStorage.getItem('maa_registered_users') || '[]');
  } catch (e) {}

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'users'));
      snap.forEach(d => {
        const data = d.data();
        if (!usersList.some(u => u.uid === d.id || u.email === data.email)) {
          usersList.push({ uid: d.id, ...data });
        }
      });
    } catch (e) {}
  }

  renderUsersTable(usersList);
}

function renderUsersTable(users) {
  const tbody = document.getElementById('adminUsersTableBody');
  if (!tbody) return;

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-secondary);">No customer profiles registered.</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => {
    const name = u.name || u.fullName || 'Customer';
    const mobile = u.mobile ? `+91 ${u.mobile}` : '—';
    const email = u.email || '—';
    const dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';

    return `
      <tr>
        <td><strong style="color:#ffffff;">${escapeHtml(name)}</strong></td>
        <td style="color:var(--text-secondary);">${escapeHtml(mobile)}</td>
        <td style="color:var(--accent-cyan);">${escapeHtml(email)}</td>
        <td style="color:var(--text-secondary); font-size:0.8125rem;">${dateStr}</td>
        <td>
          <a href="https://wa.me/91${escapeHtml(u.mobile ? u.mobile.replace(/[^0-9]/g,'') : '')}" target="_blank" class="btn btn-secondary btn-xs">WhatsApp</a>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * 7. Load Inquiries & Trade Requests
 */
async function loadTradeRequests() {
  tradeList = [];
  try {
    tradeList = JSON.parse(localStorage.getItem('maa_trade_requests') || '[]');
  } catch (e) {}

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'tradeRequests'));
      snap.forEach(d => tradeList.push({ id: d.id, ...d.data() }));
    } catch (e) {}
  }
}

async function loadInquiries() {
  inquiriesList = [];
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'inquiries'));
      snap.forEach(d => inquiriesList.push({ id: d.id, ...d.data() }));
    } catch (e) {}
  }

  const tbody = document.getElementById('adminInquiriesTableBody');
  if (tbody) {
    if (inquiriesList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-secondary);">No new customer contact messages.</td></tr>';
    } else {
      tbody.innerHTML = inquiriesList.map(inq => `
        <tr>
          <td><strong style="color:#ffffff;">${escapeHtml(inq.name || 'Visitor')}</strong></td>
          <td>${escapeHtml(inq.phone || '')}</td>
          <td>${escapeHtml(inq.message || '')}</td>
          <td>${inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-IN') : 'Recent'}</td>
          <td>
            <div style="display:flex; gap:0.35rem;">
              <a href="https://wa.me/91${escapeHtml((inq.phone||'').replace(/[^0-9]/g,''))}" target="_blank" class="btn btn-secondary btn-xs">WhatsApp Reply</a>
              <button type="button" class="btn btn-outline btn-xs" onclick="deleteInquiry('${escapeHtml(inq.id)}')" style="color:var(--danger);">&times;</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
}

window.deleteInquiry = async (inqId) => {
  if (!confirm('Delete this inquiry message?')) return;
  inquiriesList = inquiriesList.filter(i => i.id !== inqId);
  
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'inquiries', inqId));
    } catch(e) {}
  }

  loadInquiries();
  showToast('Inquiry deleted.', 'info');
};

/**
 * KPI Metric Aggregators
 */
function updateKPIMetrics() {
  const total = applicationsList.length;
  const pending = applicationsList.filter(a => a.status === 'pending').length;
  const processing = applicationsList.filter(a => a.status === 'processing' || a.status === 'in_progress').length;
  const completed = applicationsList.filter(a => a.status === 'completed').length;

  const todayStr = new Date().toDateString();
  const today = applicationsList.filter(a => a.createdAt && new Date(a.createdAt).toDateString() === todayStr).length;

  const activeSrv = servicesList.filter(s => s.active !== false).length;
  const totalRes = resumesList.length;
  const totalUsers = usersList.length;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setVal('kpiTotalApps', total);
  setVal('kpiPendingApps', pending);
  setVal('kpiProcessingApps', processing);
  setVal('kpiCompletedApps', completed);
  setVal('kpiTodayApps', today);
  setVal('kpiActiveServices', activeSrv);
  setVal('kpiTotalResumes', totalRes);
  setVal('kpiTotalUsers', totalUsers);
}

/**
 * Modal Event Handlers
 */
function bindModals() {
  // App Details Modal
  document.getElementById('closeAppModalBtn')?.addEventListener('click', () => {
    document.getElementById('adminAppModal')?.classList.remove('modal-active');
  });
  document.getElementById('cancelAppModalBtn')?.addEventListener('click', () => {
    document.getElementById('adminAppModal')?.classList.remove('modal-active');
  });

  document.getElementById('saveAppModalBtn')?.addEventListener('click', async () => {
    if (!currentEditingAppId) return;

    const newStatus = document.getElementById('detailStatusSelect').value;
    const newPayment = document.getElementById('detailPaymentSelect').value;
    const newPublicRemark = document.getElementById('detailPublicRemark').value.trim();
    const newNote = document.getElementById('detailAdminNote').value.trim();

    const app = applicationsList.find(a => (a.requestId === currentEditingAppId || a.id === currentEditingAppId));
    if (app) {
      app.status = newStatus;
      app.paymentStatus = newPayment;
      app.publicRemark = newPublicRemark;
      app.adminNotes = newNote;
      app.updatedAt = new Date().toISOString();
    }

    if (window.StorageService) {
      window.StorageService.saveApplications(applicationsList);
    }

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'requests', currentEditingAppId), {
          status: newStatus,
          paymentStatus: newPayment,
          publicRemark: newPublicRemark,
          adminNotes: newNote,
          updatedAt: serverTimestamp()
        });
        try {
          await updateDoc(doc(db, 'applications', currentEditingAppId), {
            status: newStatus,
            paymentStatus: newPayment,
            publicRemark: newPublicRemark,
            adminNotes: newNote,
            updatedAt: serverTimestamp()
          });
        } catch(e) {}
      } catch (err) {
        console.warn('Firestore update notice:', err.message);
      }
    }

    document.getElementById('adminAppModal')?.classList.remove('modal-active');
    renderApplicationsTable(applicationsList);
    updateKPIMetrics();
    showToast('Application updated successfully.', 'success');
  });

  // Service Modal
  document.getElementById('closeServiceModalBtn')?.addEventListener('click', () => {
    document.getElementById('adminServiceModal')?.classList.remove('modal-active');
  });
  document.getElementById('cancelServiceModalBtn')?.addEventListener('click', () => {
    document.getElementById('adminServiceModal')?.classList.remove('modal-active');
  });

  document.getElementById('saveServiceModalBtn')?.addEventListener('click', async () => {
    const editId = document.getElementById('editServiceId').value.trim();
    const name = document.getElementById('serviceNameInput').value.trim();
    const category = document.getElementById('serviceCategorySelect').value;
    const shortDescription = document.getElementById('serviceShortDescInput').value.trim();
    const description = document.getElementById('serviceFullDescInput').value.trim();
    const docsRaw = document.getElementById('serviceDocsInput').value.trim();
    const fee = document.getElementById('serviceFeeInput').value.trim();
    const processingTime = document.getElementById('serviceTurnaroundInput').value.trim();
    const order = parseInt(document.getElementById('serviceOrderInput').value, 10) || 1;
    const icon = document.getElementById('serviceIconSelect').value || 'briefcase';
    const featured = document.getElementById('serviceFeaturedCheck').checked;
    const active = document.getElementById('serviceActiveCheck').checked;

    if (!name || name.length < 3) {
      showToast('Please enter a valid service title (min 3 chars).', 'warning');
      return;
    }
    if (!shortDescription) {
      showToast('Please provide a short description.', 'warning');
      return;
    }

    const documents = docsRaw ? docsRaw.split(',').map(d => d.trim()).filter(Boolean) : [];
    const serviceId = editId || ('srv-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

    const serviceRecord = {
      id: serviceId,
      name,
      category,
      icon,
      shortDescription,
      description: description || shortDescription,
      documents,
      fee: fee || 'As per official notification',
      processingTime: processingTime || 'Same day counter processing',
      order,
      featured,
      active,
      updatedAt: new Date().toISOString()
    };

    const existingIdx = servicesList.findIndex(s => s.id === serviceId);
    if (existingIdx >= 0) {
      servicesList[existingIdx] = serviceRecord;
    } else {
      servicesList.push(serviceRecord);
    }

    await persistServicesState();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'services', serviceId), {
          ...serviceRecord,
          serverTimestamp: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore service save notice:', err.message);
      }
    }

    document.getElementById('adminServiceModal')?.classList.remove('modal-active');
    showToast(`Service "${name}" saved and live on website!`, 'success');
  });

  // FAQ Modal
  document.getElementById('addNewFaqBtn')?.addEventListener('click', () => {
    openEditFaqModal(null);
  });
  document.getElementById('closeFaqModalBtn')?.addEventListener('click', () => {
    document.getElementById('adminFaqModal')?.classList.remove('modal-active');
  });
  document.getElementById('cancelFaqModalBtn')?.addEventListener('click', () => {
    document.getElementById('adminFaqModal')?.classList.remove('modal-active');
  });

  document.getElementById('saveFaqModalBtn')?.addEventListener('click', async () => {
    const editId = document.getElementById('editFaqId').value.trim();
    const question = document.getElementById('faqQuestionInput').value.trim();
    const answer = document.getElementById('faqAnswerInput').value.trim();
    const order = parseInt(document.getElementById('faqOrderInput').value, 10) || 1;
    const active = document.getElementById('faqActiveCheck').checked;

    if (!question || question.length < 5) {
      showToast('Please enter a valid question.', 'warning');
      return;
    }
    if (!answer || answer.length < 5) {
      showToast('Please provide a complete answer.', 'warning');
      return;
    }

    const faqId = editId || ('faq-' + Date.now());
    const faqRecord = {
      id: faqId,
      question,
      answer,
      order,
      active,
      updatedAt: new Date().toISOString()
    };

    const existingIdx = faqsList.findIndex(f => f.id === faqId);
    if (existingIdx >= 0) {
      faqsList[existingIdx] = faqRecord;
    } else {
      faqsList.push(faqRecord);
    }

    await persistFaqsState();

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'faqs', faqId), {
          ...faqRecord,
          serverTimestamp: serverTimestamp()
        }, { merge: true });
      } catch(e) {}
    }

    document.getElementById('adminFaqModal')?.classList.remove('modal-active');
    showToast('FAQ saved and live on homepage.', 'success');
  });

  // Center Settings Form Submit
  document.getElementById('centerSettingsForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<span class="spinner"></span> Updating Website...';
    }

    const settingsData = {
      businessName: document.getElementById('settingBusinessName').value.trim(),
      subtitle: document.getElementById('settingSubtitle').value.trim(),
      owner: document.getElementById('settingOwner').value.trim(),
      phone: document.getElementById('settingPhone').value.trim(),
      whatsapp: document.getElementById('settingWhatsapp').value.trim(),
      address: document.getElementById('settingAddress').value.trim(),
      hours: document.getElementById('settingHours').value.trim(),
      email: document.getElementById('settingEmail').value.trim(),
      notice: document.getElementById('settingNotice').value.trim(),
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('maa_center_settings', JSON.stringify(settingsData));
    } catch(e) {}

    window.dispatchEvent(new CustomEvent('maa_settings_updated', { detail: settingsData }));

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'settings', 'general'), {
          ...settingsData,
          serverTimestamp: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('[Admin] Firestore settings save notice:', err.message);
      }
    }

    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<span>Save &amp; Update Website</span>';
    }

    showToast('Center information updated across website!', 'success');
  });

  // Backdrop & Escape listeners
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('modal-active');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.modal-active').forEach(modal => {
        modal.classList.remove('modal-active');
      });
    }
  });
}
