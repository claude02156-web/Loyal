/**
 * MAA ENTERPRISES — Resume & Marriage Biodata Builder
 * Production JavaScript Engine (Self-Contained & Fully Functional)
 * Zero Prefilled Data | Universal Empty-Field Rule | True A4 Output | 100% Client-Side
 */

// --------------------------------------------------------------------------
// 1. Core Data Models & Templates Registry
// --------------------------------------------------------------------------

// Predefined Career Objectives verbatim from specification
const PREDEFINED_OBJECTIVES = [
  "Secure a responsible career opportunity to fully utilize my talent and skills to grow, while making a significant contribution to the success of the company.",
  "Self-motivated and hardworking fresher seeking an opportunity to work in a challenging environment to prove my skills and utilize my knowledge and intelligence in the growth of the organization.",
  "Urge for a position in an aggressively growing organization where my technical and functional expertise can be effectively utilized and possess good analytical abilities, quick grasping power, zeal for learning new things and excellent communication skills.",
  "To seek a good and responsible job in a professionally managed organization where my conceptual and functional skills are effectively utilized in a way that contributes to organizational growth coupled with personal growth.",
  "To make a good position in a reputed company and work enthusiastically in a team which provides steady career growth along with job satisfaction, challenges and valuable contribution to the success of the organization, while building a challenging career with honesty and loyalty.",
  "To contribute my best to the organization irrespective of the kind of project undertaken and utilize my skills to perform the job to the best of my ability with zeal and willingness to learn."
];

// Predefined Declarations verbatim from specification
const PREDEFINED_DECLARATIONS = [
  "I hereby declare that all the statements made in this resume are true, complete and correct to the best of my knowledge.",
  "I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.",
  "I declare that the information furnished above is true and accurate to the best of my knowledge."
];

// Color Palettes
const JOB_COLORS = {
  blue: { main: '#2563eb', dark: '#1e40af', light: '#eff6ff', border: '#bfdbfe' },
  red: { main: '#dc2626', dark: '#b91c1c', light: '#fef2f2', border: '#fecaca' },
  green: { main: '#16a34a', dark: '#15803d', light: '#f0fdf4', border: '#bbf7d0' },
  purple: { main: '#7c3aed', dark: '#6b21a8', light: '#f5f3ff', border: '#ddd6fe' },
  orange: { main: '#ea580c', dark: '#c2410c', light: '#fff7ed', border: '#fed7aa' },
  navy: { main: '#1e293b', dark: '#0f172a', light: '#f8fafc', border: '#cbd5e1' },
  teal: { main: '#0d9488', dark: '#0f766e', light: '#f0fdfa', border: '#99f6e4' },
  gray: { main: '#4b5563', dark: '#374151', light: '#f9fafb', border: '#e5e7eb' },
  black: { main: '#18181b', dark: '#000000', light: '#fafafa', border: '#e4e4e7' }
};

const BIODATA_COLORS = {
  red: { main: '#dc2626', dark: '#b91c1c', light: '#fef2f2', border: '#fecaca' },
  maroon: { main: '#881337', dark: '#4c0519', light: '#fff1f2', border: '#fecdd3' },
  pink: { main: '#db2777', dark: '#be185d', light: '#fdf2f8', border: '#fbcfe8' },
  purple: { main: '#7c3aed', dark: '#6b21a8', light: '#f5f3ff', border: '#ddd6fe' },
  blue: { main: '#2563eb', dark: '#1e40af', light: '#eff6ff', border: '#bfdbfe' },
  green: { main: '#16a34a', dark: '#15803d', light: '#f0fdf4', border: '#bbf7d0' },
  gold: { main: '#d97706', dark: '#b45309', light: '#fffbeb', border: '#fde68a' },
  brown: { main: '#78350f', dark: '#451a03', light: '#fef3c7', border: '#fde68a' },
  navy: { main: '#1e293b', dark: '#0f172a', light: '#f8fafc', border: '#cbd5e1' },
  gray: { main: '#4b5563', dark: '#374151', light: '#f9fafb', border: '#e5e7eb' }
};

// 12 Job Resume Templates Registry
const JOB_TEMPLATES = [
  { id: 'classic', name: '1. Classic Professional', desc: 'Timeless centered header, structured tabular education and elegant lines' },
  { id: 'modern', name: '2. Modern Header Band', desc: 'Sleek accent banner, 2-column contact grid and highlighted section tags' },
  { id: 'pro-blue', name: '3. Professional Blue', desc: 'Corporate vertical accent bar, refined layout with clean hierarchy' },
  { id: 'pro-green', name: '4. Professional Green', desc: 'Fresh emerald accents, clean dividers and crisp academic presentation' },
  { id: 'minimal', name: '5. Minimal Clean', desc: 'Swiss typography, balanced whitespace and elegant subtle hairline rules' },
  { id: 'sidebar', name: '6. Sidebar Column', desc: 'Distinct 2-column split with dedicated skills/contact side panel' },
  { id: 'corporate', name: '7. Corporate Executive', desc: 'Header card, subtle shaded section headers and executive structure' },
  { id: 'elegant', name: '8. Elegant Serif', desc: 'Refined serif typography with delicate classic accents and borders' },
  { id: 'engineering', name: '9. Engineering & Tech', desc: 'Tech badges, monospace tool tags and project architecture cards' },
  { id: 'fresher', name: '10. Fresher & Student', desc: 'Optimized for career objectives, extra certifications and academic courses' },
  { id: 'executive', name: '11. Executive Leadership', desc: 'High-level summary, leadership timeline and formal double-rule header' },
  { id: 'traditional-cv', name: '12. Traditional Indian CV', desc: 'Authentic Indian biodata format with formal personal grid and declaration' }
];

// 10 Marriage Biodata Templates Registry
const BIODATA_TEMPLATES = [
  { id: 'traditional', name: '1. Traditional Auspicious', desc: 'Auspicious header, rich double border and formal 2-column key-value grid' },
  { id: 'elegant', name: '2. Royal Elegant', desc: 'Classic serif typography, framed borders and graceful section boxes' },
  { id: 'modern', name: '3. Modern Matrimony', desc: 'Clean contemporary cards for personal, family and contact details' },
  { id: 'simple', name: '4. Simple Clean', desc: 'Neat, high-contrast, compact single-page layout for easy reading' },
  { id: 'family', name: '5. Family Centric', desc: 'Expanded family background, parent details and sibling hierarchy' },
  { id: 'classic', name: '6. Classic Indian', desc: 'Formal Indian biodata layout with structured boxes and contact details' },
  { id: 'premium', name: '7. Premium Royal', desc: 'Double inner-border styling, ornamental section headers and rich aesthetic' },
  { id: 'minimal', name: '8. Minimalist Matrimony', desc: 'Ultra-clean modern aesthetics with sleek whitespace and neat typography' },
  { id: 'floral', name: '9. Floral Ornamented', desc: 'Subtle corner floral accents and soft pastel background tones' },
  { id: 'professional', name: '10. Professional Matrimony', desc: 'Balanced layout highlighting career achievements and family background' }
];

// Initial Blank State Factory - STRICTLY ZERO PREFILLED PERSONAL DATA
function createInitialJobState() {
  return {
    level: 'low', // 'low' | 'medium' | 'high'
    template: 'classic',
    color: 'blue',
    layout: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '12.5px',
      lineHeight: '1.45',
      margin: '14mm',
      sectionSpacing: '12px',
      photoSize: '95px',
      photoShape: 'rounded'
    },
    personal: {
      photo: '',
      showPhoto: true,
      fullName: '',
      address: '',
      mobile: '',
      whatsapp: '',
      email: '',
      dob: '',
      fatherName: '',
      motherName: '',
      nationality: '',
      gender: '',
      maritalStatus: '',
      languagesKnown: '',
      hobbies: ''
    },
    objective: '',
    summary: '',
    isFresher: false,
    education: [],
    proQualification: [],
    extraQualification: [],
    experience: [],
    skills: [],
    techSkills: [],
    progLanguages: [],
    softwareTools: [],
    projects: [],
    certifications: [],
    training: [],
    achievements: [],
    languages: [],
    strengths: [],
    references: [],
    declaration: PREDEFINED_DECLARATIONS[0],
    declarationEnabled: true,
    footer: {
      date: new Date().toISOString().split('T')[0],
      place: '',
      signatureName: ''
    }
  };
}

function createInitialBiodataState() {
  return {
    type: 'male', // 'male' | 'female'
    template: 'traditional',
    color: 'red',
    layout: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '12.5px',
      lineHeight: '1.45',
      margin: '14mm',
      sectionSpacing: '12px',
      photoSize: '95px',
      photoShape: 'rounded'
    },
    personal: {
      photo: '',
      showPhoto: true,
      fullName: '',
      dob: '',
      age: '',
      height: '',
      weight: '',
      religion: '',
      caste: '',
      subCaste: '',
      gotra: '',
      manglik: 'None',
      motherTongue: '',
      complexion: '',
      bloodGroup: '',
      maritalStatus: 'Never Married',
      birthPlace: '',
      birthTime: '',
      birthDate: ''
    },
    education: [],
    profession: {
      occupation: '',
      jobTitle: '',
      company: '',
      workLocation: '',
      businessDetails: '',
      income: '',
      otherDetails: ''
    },
    family: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      familyType: 'Nuclear',
      familyLocation: '',
      nativePlace: '',
      familyDetails: ''
    },
    brothers: [],
    sisters: [],
    contact: {
      contactPerson: '',
      mobile: '',
      whatsapp: '',
      address: '',
      city: '',
      state: ''
    },
    about: '',
    expectations: '',
    showHoroscope: false,
    horoscope: {
      rashi: '',
      nakshatra: '',
      gotra: '',
      manglik: 'None',
      birthPlace: '',
      birthTime: '',
      details: ''
    }
  };
}

// Global App State
let appMode = 'job'; // 'job' | 'biodata'
let jobState = createInitialJobState();
let biodataState = createInitialBiodataState();
let previewZoom = 0.85;

// Undo / Redo History
const MAX_HISTORY = 30;
let jobHistory = [];
let jobHistoryIndex = -1;
let bioHistory = [];
let bioHistoryIndex = -1;
let isHistoryAction = false;

// --------------------------------------------------------------------------
// 2. Helper & Sanitization Utilities
// --------------------------------------------------------------------------

// Returns non-empty trimmed string or null
function val(str) {
  if (str === undefined || str === null) return null;
  const s = String(str).trim();
  return s.length > 0 ? s : null;
}

// Escape HTML for XSS prevention
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Check if array has non-empty elements
function hasArr(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

// Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `builder-toast ${type}`;
  toast.innerHTML = `<span>${esc(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

// --------------------------------------------------------------------------
// 3. History & State Push (Undo / Redo)
// --------------------------------------------------------------------------

function pushHistory() {
  if (isHistoryAction) return;
  
  if (appMode === 'job') {
    if (jobHistoryIndex < jobHistory.length - 1) {
      jobHistory = jobHistory.slice(0, jobHistoryIndex + 1);
    }
    jobHistory.push(JSON.stringify(jobState));
    if (jobHistory.length > MAX_HISTORY) jobHistory.shift();
    jobHistoryIndex = jobHistory.length - 1;
  } else {
    if (bioHistoryIndex < bioHistory.length - 1) {
      bioHistory = bioHistory.slice(0, bioHistoryIndex + 1);
    }
    bioHistory.push(JSON.stringify(biodataState));
    if (bioHistory.length > MAX_HISTORY) bioHistory.shift();
    bioHistoryIndex = bioHistory.length - 1;
  }
  updateUndoRedoButtons();
  triggerAutoSave();
}

function undo() {
  if (appMode === 'job') {
    if (jobHistoryIndex > 0) {
      isHistoryAction = true;
      jobHistoryIndex--;
      jobState = JSON.parse(jobHistory[jobHistoryIndex]);
      syncFormFromState();
      renderA4Preview();
      isHistoryAction = false;
      showToast('Undo successful', 'info');
    }
  } else {
    if (bioHistoryIndex > 0) {
      isHistoryAction = true;
      bioHistoryIndex--;
      biodataState = JSON.parse(bioHistory[bioHistoryIndex]);
      syncFormFromState();
      renderA4Preview();
      isHistoryAction = false;
      showToast('Undo successful', 'info');
    }
  }
  updateUndoRedoButtons();
}

function redo() {
  if (appMode === 'job') {
    if (jobHistoryIndex < jobHistory.length - 1) {
      isHistoryAction = true;
      jobHistoryIndex++;
      jobState = JSON.parse(jobHistory[jobHistoryIndex]);
      syncFormFromState();
      renderA4Preview();
      isHistoryAction = false;
      showToast('Redo successful', 'info');
    }
  } else {
    if (bioHistoryIndex < bioHistory.length - 1) {
      isHistoryAction = true;
      bioHistoryIndex++;
      biodataState = JSON.parse(bioHistory[bioHistoryIndex]);
      syncFormFromState();
      renderA4Preview();
      isHistoryAction = false;
      showToast('Redo successful', 'info');
    }
  }
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const btnUndo = document.getElementById('btnUndo');
  const btnRedo = document.getElementById('btnRedo');
  if (btnUndo) {
    btnUndo.disabled = (appMode === 'job' ? jobHistoryIndex <= 0 : bioHistoryIndex <= 0);
  }
  if (btnRedo) {
    btnRedo.disabled = (appMode === 'job' ? jobHistoryIndex >= jobHistory.length - 1 : bioHistoryIndex >= bioHistory.length - 1);
  }
}

// --------------------------------------------------------------------------
// 4. Autosave & Local Storage Management
// --------------------------------------------------------------------------

let saveTimeout = null;
function triggerAutoSave() {
  const badge = document.getElementById('autosaveBadge');
  if (badge) {
    badge.className = 'autosave-badge saving';
    badge.textContent = 'Saving...';
  }
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      if (appMode === 'job') {
        localStorage.setItem('maa_job_resume_draft', JSON.stringify(jobState));
      } else {
        localStorage.setItem('maa_biodata_draft', JSON.stringify(biodataState));
      }
      if (badge) {
        badge.className = 'autosave-badge';
        badge.textContent = 'Saved ✓';
      }
    } catch (e) {
      if (badge) {
        badge.className = 'autosave-badge';
        badge.textContent = 'In Memory';
      }
    }
  }, 600);
}

function checkDraftRecovery() {
  try {
    const jobDraft = localStorage.getItem('maa_job_resume_draft');
    const bioDraft = localStorage.getItem('maa_biodata_draft');
    if (jobDraft || bioDraft) {
      const banner = document.getElementById('draftRecoveryBanner');
      if (banner) banner.style.display = 'flex';
    }
  } catch (e) {}
}

function restoreDraft() {
  try {
    const jobDraft = localStorage.getItem('maa_job_resume_draft');
    const bioDraft = localStorage.getItem('maa_biodata_draft');
    if (appMode === 'job' && jobDraft) {
      jobState = JSON.parse(jobDraft);
    } else if (appMode === 'biodata' && bioDraft) {
      biodataState = JSON.parse(bioDraft);
    }
    syncFormFromState();
    renderA4Preview();
    pushHistory();
    const banner = document.getElementById('draftRecoveryBanner');
    if (banner) banner.style.display = 'none';
    showToast('Draft restored successfully', 'success');
  } catch (e) {
    showToast('Could not restore draft', 'error');
  }
}

function discardDraft() {
  const banner = document.getElementById('draftRecoveryBanner');
  if (banner) banner.style.display = 'none';
  showToast('Starting with clean document', 'info');
}

function resetCurrentDocument() {
  if (confirm('Are you sure you want to reset the current document? All entered details will be cleared.')) {
    if (appMode === 'job') {
      jobState = createInitialJobState();
      localStorage.removeItem('maa_job_resume_draft');
    } else {
      biodataState = createInitialBiodataState();
      localStorage.removeItem('maa_biodata_draft');
    }
    syncFormFromState();
    renderA4Preview();
    pushHistory();
    showToast('Document reset to blank', 'info');
  }
}

function deleteAllLocalData() {
  if (confirm('Delete all locally stored drafts and settings for Maa Enterprises Builder? This action cannot be undone.')) {
    localStorage.removeItem('maa_job_resume_draft');
    localStorage.removeItem('maa_biodata_draft');
    jobState = createInitialJobState();
    biodataState = createInitialBiodataState();
    syncFormFromState();
    renderA4Preview();
    pushHistory();
    closeAllModals();
    showToast('All local builder data deleted', 'success');
  }
}

// --------------------------------------------------------------------------
// 5. Dynamic Repeatable List Managers (Filled Detail UI)
// --------------------------------------------------------------------------

// Add Education (Exam, Board, Passing Year, Division - NO MARKS/PERCENTAGE)
function addEducationEntry(preset = '') {
  const list = appMode === 'job' ? jobState.education : biodataState.education;
  const newEntry = {
    id: 'edu_' + Date.now(),
    exam: preset,
    board: '',
    year: '',
    division: ''
  };
  list.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('education', newEntry.id);
}

// Add Professional Qualification
function addProQualEntry() {
  const newEntry = {
    id: 'proq_' + Date.now(),
    exam: '',
    board: '',
    year: '',
    division: ''
  };
  jobState.proQualification.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('proQual', newEntry.id);
}

// Add Extra Qualification
function addExtraQualEntry(preset = '') {
  const newEntry = {
    id: 'ext_' + Date.now(),
    title: preset
  };
  jobState.extraQualification.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  if (!preset) openEntryEditor('extraQual', newEntry.id);
}

// Add Experience
function addExperienceEntry() {
  const newEntry = {
    id: 'exp_' + Date.now(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    totalExp: '',
    description: '',
    responsibilities: '',
    technologies: ''
  };
  jobState.experience.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('experience', newEntry.id);
}

// Add Project
function addProjectEntry() {
  const newEntry = {
    id: 'proj_' + Date.now(),
    title: '',
    client: '',
    role: '',
    tech: '',
    duration: '',
    description: '',
    responsibilities: ''
  };
  jobState.projects.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('project', newEntry.id);
}

// Add Certification
function addCertificationEntry() {
  const newEntry = {
    id: 'cert_' + Date.now(),
    title: '',
    issuer: '',
    year: ''
  };
  jobState.certifications.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('certification', newEntry.id);
}

// Add Brother (Marriage Biodata)
function addBrotherEntry() {
  const newEntry = {
    id: 'bro_' + Date.now(),
    name: '',
    relation: 'Brother',
    status: 'Unmarried',
    occupation: ''
  };
  biodataState.brothers.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('brother', newEntry.id);
}

// Add Sister (Marriage Biodata)
function addSisterEntry() {
  const newEntry = {
    id: 'sis_' + Date.now(),
    name: '',
    relation: 'Sister',
    status: 'Unmarried',
    occupation: ''
  };
  biodataState.sisters.push(newEntry);
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  openEntryEditor('sister', newEntry.id);
}

// Render dynamic list items in the form
function renderDynamicLists() {
  if (appMode === 'job') {
    // Education List
    const eduCont = document.getElementById('eduListContainer');
    if (eduCont) {
      eduCont.innerHTML = jobState.education.map(e => `
        <div class="dynamic-item-card" data-id="${e.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(e.exam || 'Untitled Qualification')}</div>
            <div class="dynamic-item-sub">${esc(e.board || 'Board/Univ')}${e.year ? ' • ' + esc(e.year) : ''}${e.division ? ' • ' + esc(e.division) : ''}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('education', '${e.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('education', '${e.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('education', '${e.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('education', '${e.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Professional Qualifications List
    const proqCont = document.getElementById('proqListContainer');
    if (proqCont) {
      proqCont.innerHTML = jobState.proQualification.map(e => `
        <div class="dynamic-item-card" data-id="${e.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(e.exam || 'Untitled Professional Qualification')}</div>
            <div class="dynamic-item-sub">${esc(e.board || 'Institute')}${e.year ? ' • ' + esc(e.year) : ''}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('proQual', '${e.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('proQual', '${e.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('proQual', '${e.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('proQual', '${e.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Extra Qualifications List
    const extCont = document.getElementById('extListContainer');
    if (extCont) {
      extCont.innerHTML = jobState.extraQualification.map(e => `
        <div class="dynamic-item-card" data-id="${e.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(e.title || 'Course / Skill Name')}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('extraQual', '${e.id}')">Edit</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('extraQual', '${e.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Experience List
    const expCont = document.getElementById('expListContainer');
    if (expCont) {
      expCont.innerHTML = jobState.experience.map(e => `
        <div class="dynamic-item-card" data-id="${e.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(e.position || 'Position')}${e.company ? ' at ' + esc(e.company) : ''}</div>
            <div class="dynamic-item-sub">${esc(e.startDate || '')} – ${e.currentlyWorking ? 'Present' : esc(e.endDate || '')}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('experience', '${e.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('experience', '${e.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('experience', '${e.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('experience', '${e.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Projects List
    const projCont = document.getElementById('projListContainer');
    if (projCont) {
      projCont.innerHTML = jobState.projects.map(p => `
        <div class="dynamic-item-card" data-id="${p.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(p.title || 'Untitled Project')}</div>
            <div class="dynamic-item-sub">${esc(p.role || '')}${p.tech ? ' • ' + esc(p.tech) : ''}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('project', '${p.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('project', '${p.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('project', '${p.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('project', '${p.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Certifications List
    const certCont = document.getElementById('certListContainer');
    if (certCont) {
      certCont.innerHTML = jobState.certifications.map(c => `
        <div class="dynamic-item-card" data-id="${c.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(c.title || 'Untitled Certificate')}</div>
            <div class="dynamic-item-sub">${esc(c.issuer || '')}${c.year ? ' • ' + esc(c.year) : ''}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('certification', '${c.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('certification', '${c.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('certification', '${c.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('certification', '${c.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    renderTagChips('skillsTagContainer', jobState.skills, 'skills');
    renderTagChips('techSkillsTagContainer', jobState.techSkills, 'techSkills');
    renderTagChips('progLangTagContainer', jobState.progLanguages, 'progLanguages');
    renderTagChips('toolsTagContainer', jobState.softwareTools, 'softwareTools');
    renderTagChips('strengthsTagContainer', jobState.strengths, 'strengths');
  } else {
    // Biodata Brothers List
    const broCont = document.getElementById('brothersListContainer');
    if (broCont) {
      broCont.innerHTML = biodataState.brothers.map(b => `
        <div class="dynamic-item-card" data-id="${b.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(b.name || 'Brother')} (${esc(b.status)})</div>
            <div class="dynamic-item-sub">${esc(b.occupation || 'Occupation not specified')}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('brother', '${b.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('brother', '${b.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('brother', '${b.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('brother', '${b.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Biodata Sisters List
    const sisCont = document.getElementById('sistersListContainer');
    if (sisCont) {
      sisCont.innerHTML = biodataState.sisters.map(s => `
        <div class="dynamic-item-card" data-id="${s.id}">
          <div class="dynamic-item-info">
            <div class="dynamic-item-title">${esc(s.name || 'Sister')} (${esc(s.status)})</div>
            <div class="dynamic-item-sub">${esc(s.occupation || 'Occupation not specified')}</div>
          </div>
          <div class="dynamic-item-actions">
            <button type="button" class="btn-item-action" onclick="openEntryEditor('sister', '${s.id}')">Edit</button>
            <button type="button" class="btn-item-action" onclick="duplicateEntry('sister', '${s.id}')">Duplicate</button>
            <button type="button" class="btn-item-action" onclick="clearEntry('sister', '${s.id}')">Clear</button>
            <button type="button" class="btn-item-action delete" onclick="deleteEntry('sister', '${s.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }
  }
}

// Tag Chips Renderer & Manager
function renderTagChips(containerId, list, stateKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list.map((tag, idx) => `
    <span class="tag-item">
      ${esc(tag)}
      <span class="tag-remove" onclick="removeTag('${stateKey}', ${idx})">&times;</span>
    </span>
  `).join('');
}

function addTag(stateKey, inputId) {
  const input = document.getElementById(inputId);
  if (!input || !input.value.trim()) return;
  const val = input.value.trim();
  if (appMode === 'job') {
    if (!jobState[stateKey].includes(val)) {
      jobState[stateKey].push(val);
    }
  }
  input.value = '';
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
}

function removeTag(stateKey, index) {
  if (appMode === 'job') {
    jobState[stateKey].splice(index, 1);
  }
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
}

// Duplicate Entry Helper
function duplicateEntry(type, id) {
  let list = [];
  if (appMode === 'job') {
    if (type === 'education') list = jobState.education;
    else if (type === 'proQual') list = jobState.proQualification;
    else if (type === 'extraQual') list = jobState.extraQualification;
    else if (type === 'experience') list = jobState.experience;
    else if (type === 'project') list = jobState.projects;
    else if (type === 'certification') list = jobState.certifications;
  } else {
    if (type === 'brother') list = biodataState.brothers;
    else if (type === 'sister') list = biodataState.sisters;
  }
  const item = list.find(x => x.id === id);
  if (item) {
    const copy = JSON.parse(JSON.stringify(item));
    copy.id = type + '_' + Date.now();
    list.push(copy);
    renderDynamicLists();
    renderA4Preview();
    pushHistory();
    showToast('Entry duplicated', 'info');
  }
}

// Clear Entry Helper
function clearEntry(type, id) {
  let list = [];
  if (appMode === 'job') {
    if (type === 'education') list = jobState.education;
    else if (type === 'proQual') list = jobState.proQualification;
    else if (type === 'extraQual') list = jobState.extraQualification;
    else if (type === 'experience') list = jobState.experience;
    else if (type === 'project') list = jobState.projects;
    else if (type === 'certification') list = jobState.certifications;
  } else {
    if (type === 'brother') list = biodataState.brothers;
    else if (type === 'sister') list = biodataState.sisters;
  }
  const item = list.find(x => x.id === id);
  if (item) {
    Object.keys(item).forEach(k => {
      if (k !== 'id') item[k] = '';
    });
    renderDynamicLists();
    renderA4Preview();
    pushHistory();
    showToast('Entry cleared', 'info');
  }
}

// Delete Entry Helper (with confirmation)
function deleteEntry(type, id) {
  if (confirm('Are you sure you want to delete this entry?')) {
    if (appMode === 'job') {
      if (type === 'education') jobState.education = jobState.education.filter(x => x.id !== id);
      else if (type === 'proQual') jobState.proQualification = jobState.proQualification.filter(x => x.id !== id);
      else if (type === 'extraQual') jobState.extraQualification = jobState.extraQualification.filter(x => x.id !== id);
      else if (type === 'experience') jobState.experience = jobState.experience.filter(x => x.id !== id);
      else if (type === 'project') jobState.projects = jobState.projects.filter(x => x.id !== id);
      else if (type === 'certification') jobState.certifications = jobState.certifications.filter(x => x.id !== id);
    } else {
      if (type === 'brother') biodataState.brothers = biodataState.brothers.filter(x => x.id !== id);
      else if (type === 'sister') biodataState.sisters = biodataState.sisters.filter(x => x.id !== id);
    }
    renderDynamicLists();
    renderA4Preview();
    pushHistory();
    showToast('Entry deleted', 'info');
  }
}

// --------------------------------------------------------------------------
// 6. Generic Modal Entry Editor
// --------------------------------------------------------------------------

let currentEditType = null;
let currentEditId = null;

function openEntryEditor(type, id) {
  currentEditType = type;
  currentEditId = id;
  const modal = document.getElementById('entryEditorModal');
  const body = document.getElementById('entryEditorBody');
  const title = document.getElementById('entryEditorTitle');
  if (!modal || !body || !title) return;

  let item = null;
  let formHtml = '';

  if (type === 'education') {
    title.textContent = 'Edit Education Qualification';
    item = (appMode === 'job' ? jobState.education : biodataState.education).find(x => x.id === id);
    if (item) {
      formHtml = `
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Exam / Qualification</label>
          <input type="text" class="form-control" id="m_edu_exam" value="${esc(item.exam)}" placeholder="e.g. B.Tech / 12th / 10th">
        </div>
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Board / University / Institute</label>
          <input type="text" class="form-control" id="m_edu_board" value="${esc(item.board)}" placeholder="e.g. CBSE / AKU Patna">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Passing Year</label>
            <input type="text" class="form-control" id="m_edu_year" value="${esc(item.year)}" placeholder="e.g. 2026">
          </div>
          <div class="form-group">
            <label class="form-label">Division <span class="opt-tag">(Optional)</span></label>
            <input type="text" class="form-control" id="m_edu_div" value="${esc(item.division)}" placeholder="e.g. 1st Division">
          </div>
        </div>
      `;
    }
  } else if (type === 'proQual') {
    title.textContent = 'Edit Professional Qualification';
    item = jobState.proQualification.find(x => x.id === id);
    if (item) {
      formHtml = `
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Exam / Qualification</label>
          <input type="text" class="form-control" id="m_proq_exam" value="${esc(item.exam)}" placeholder="e.g. Diploma in CS">
        </div>
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Board / Institute</label>
          <input type="text" class="form-control" id="m_proq_board" value="${esc(item.board)}" placeholder="e.g. SBTE Bihar">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Passing Year</label>
            <input type="text" class="form-control" id="m_proq_year" value="${esc(item.year)}" placeholder="e.g. 2024">
          </div>
          <div class="form-group">
            <label class="form-label">Division <span class="opt-tag">(Optional)</span></label>
            <input type="text" class="form-control" id="m_proq_div" value="${esc(item.division)}" placeholder="e.g. 1st">
          </div>
        </div>
      `;
    }
  } else if (type === 'extraQual') {
    title.textContent = 'Edit Extra Qualification';
    item = jobState.extraQualification.find(x => x.id === id);
    if (item) {
      formHtml = `
        <div class="form-group">
          <label class="form-label">Course / Skill Name</label>
          <input type="text" class="form-control" id="m_ext_title" value="${esc(item.title)}" placeholder="e.g. DCA / Tally ERP 9 / Typing">
        </div>
      `;
    }
  } else if (type === 'experience') {
    title.textContent = 'Edit Work Experience';
    item = jobState.experience.find(x => x.id === id);
    if (item) {
      formHtml = `
        <div class="form-grid-2" style="margin-bottom: 0.8rem;">
          <div class="form-group">
            <label class="form-label">Company Name</label>
            <input type="text" class="form-control" id="m_exp_company" value="${esc(item.company)}" placeholder="e.g. Maa Enterprises">
          </div>
          <div class="form-group">
            <label class="form-label">Job Position / Title</label>
            <input type="text" class="form-control" id="m_exp_pos" value="${esc(item.position)}" placeholder="e.g. Web Developer">
          </div>
        </div>
        <div class="form-grid-2" style="margin-bottom: 0.8rem;">
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" class="form-control" id="m_exp_loc" value="${esc(item.location)}" placeholder="e.g. Bihar Sharif">
          </div>
          <div class="form-group">
            <label class="form-label">Total Duration</label>
            <input type="text" class="form-control" id="m_exp_tot" value="${esc(item.totalExp)}" placeholder="e.g. 1 Year 6 Months">
          </div>
        </div>
        <div class="form-grid-2" style="margin-bottom: 0.8rem;">
          <div class="form-group">
            <label class="form-label">Start Date</label>
            <input type="text" class="form-control" id="m_exp_start" value="${esc(item.startDate)}" placeholder="e.g. Jan 2025">
          </div>
          <div class="form-group">
            <label class="form-label">End Date</label>
            <input type="text" class="form-control" id="m_exp_end" value="${esc(item.endDate)}" placeholder="e.g. Dec 2025">
            <label style="font-size:0.75rem; margin-top:4px; display:inline-flex; align-items:center; gap:4px; cursor:pointer;">
              <input type="checkbox" id="m_exp_curr" ${item.currentlyWorking ? 'checked' : ''}> Currently Working Here
            </label>
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Key Responsibilities & Description</label>
          <textarea class="form-control" id="m_exp_desc" placeholder="Describe main job duties and achievements">${esc(item.description || item.responsibilities)}</textarea>
        </div>
      `;
    }
  } else if (type === 'project') {
    title.textContent = 'Edit Project Details';
    item = jobState.projects.find(x => x.id === id);
    if (item) {
      formHtml = `
        <div class="form-grid-2" style="margin-bottom: 0.8rem;">
          <div class="form-group">
            <label class="form-label">Project Title</label>
            <input type="text" class="form-control" id="m_proj_title" value="${esc(item.title)}" placeholder="e.g. Online Service Portal">
          </div>
          <div class="form-group">
            <label class="form-label">Role</label>
            <input type="text" class="form-control" id="m_proj_role" value="${esc(item.role)}" placeholder="e.g. Lead Developer">
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Technologies Used</label>
          <input type="text" class="form-control" id="m_proj_tech" value="${esc(item.tech)}" placeholder="e.g. HTML, CSS, JavaScript, Firebase">
        </div>
        <div class="form-group">
          <label class="form-label">Project Description</label>
          <textarea class="form-control" id="m_proj_desc" placeholder="Describe project features and outcomes">${esc(item.description)}</textarea>
        </div>
      `;
    }
  } else if (type === 'brother' || type === 'sister') {
    title.textContent = `Edit ${type === 'brother' ? 'Brother' : 'Sister'} Details`;
    item = (type === 'brother' ? biodataState.brothers : biodataState.sisters).find(x => x.id === id);
    if (item) {
      formHtml = `
        <div class="form-group" style="margin-bottom: 0.8rem;">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" id="m_sib_name" value="${esc(item.name)}" placeholder="e.g. Rahul Raj">
        </div>
        <div class="form-grid-2" style="margin-bottom: 0.8rem;">
          <div class="form-group">
            <label class="form-label">Relation / Seniority</label>
            <select class="form-control" id="m_sib_rel">
              <option value="Elder" ${item.relation === 'Elder' ? 'selected' : ''}>Elder</option>
              <option value="Younger" ${item.relation === 'Younger' ? 'selected' : ''}>Younger</option>
              <option value="Twin" ${item.relation === 'Twin' ? 'selected' : ''}>Twin</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Marital Status</label>
            <select class="form-control" id="m_sib_stat">
              <option value="Unmarried" ${item.status === 'Unmarried' ? 'selected' : ''}>Unmarried</option>
              <option value="Married" ${item.status === 'Married' ? 'selected' : ''}>Married</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Occupation / Education</label>
          <input type="text" class="form-control" id="m_sib_occ" value="${esc(item.occupation)}" placeholder="e.g. Software Engineer / Studying">
        </div>
      `;
    }
  }

  body.innerHTML = formHtml;
  modal.classList.add('open');
}

function saveModalEntry() {
  if (!currentEditType || !currentEditId) return;

  if (currentEditType === 'education') {
    const list = appMode === 'job' ? jobState.education : biodataState.education;
    const item = list.find(x => x.id === currentEditId);
    if (item) {
      item.exam = document.getElementById('m_edu_exam')?.value || '';
      item.board = document.getElementById('m_edu_board')?.value || '';
      item.year = document.getElementById('m_edu_year')?.value || '';
      item.division = document.getElementById('m_edu_div')?.value || '';
    }
  } else if (currentEditType === 'proQual') {
    const item = jobState.proQualification.find(x => x.id === currentEditId);
    if (item) {
      item.exam = document.getElementById('m_proq_exam')?.value || '';
      item.board = document.getElementById('m_proq_board')?.value || '';
      item.year = document.getElementById('m_proq_year')?.value || '';
      item.division = document.getElementById('m_proq_div')?.value || '';
    }
  } else if (currentEditType === 'extraQual') {
    const item = jobState.extraQualification.find(x => x.id === currentEditId);
    if (item) {
      item.title = document.getElementById('m_ext_title')?.value || '';
    }
  } else if (currentEditType === 'experience') {
    const item = jobState.experience.find(x => x.id === currentEditId);
    if (item) {
      item.company = document.getElementById('m_exp_company')?.value || '';
      item.position = document.getElementById('m_exp_pos')?.value || '';
      item.location = document.getElementById('m_exp_loc')?.value || '';
      item.totalExp = document.getElementById('m_exp_tot')?.value || '';
      item.startDate = document.getElementById('m_exp_start')?.value || '';
      item.endDate = document.getElementById('m_exp_end')?.value || '';
      item.currentlyWorking = document.getElementById('m_exp_curr')?.checked || false;
      item.description = document.getElementById('m_exp_desc')?.value || '';
    }
  } else if (currentEditType === 'project') {
    const item = jobState.projects.find(x => x.id === currentEditId);
    if (item) {
      item.title = document.getElementById('m_proj_title')?.value || '';
      item.role = document.getElementById('m_proj_role')?.value || '';
      item.tech = document.getElementById('m_proj_tech')?.value || '';
      item.description = document.getElementById('m_proj_desc')?.value || '';
    }
  } else if (currentEditType === 'brother' || currentEditType === 'sister') {
    const list = currentEditType === 'brother' ? biodataState.brothers : biodataState.sisters;
    const item = list.find(x => x.id === currentEditId);
    if (item) {
      item.name = document.getElementById('m_sib_name')?.value || '';
      item.relation = document.getElementById('m_sib_rel')?.value || 'Elder';
      item.status = document.getElementById('m_sib_stat')?.value || 'Unmarried';
      item.occupation = document.getElementById('m_sib_occ')?.value || '';
    }
  }

  closeModal('entryEditorModal');
  renderDynamicLists();
  renderA4Preview();
  pushHistory();
  showToast('Entry updated successfully', 'success');
}

// --------------------------------------------------------------------------
// 7. Objective & Declaration Libraries (Modals)
// --------------------------------------------------------------------------

function openObjectiveModal() {
  const modal = document.getElementById('objectiveLibraryModal');
  const listCont = document.getElementById('objectiveList');
  if (!modal || !listCont) return;

  listCont.innerHTML = PREDEFINED_OBJECTIVES.map((obj, i) => `
    <div style="padding: 0.75rem; border: 1px solid var(--builder-card-border); border-radius: 8px; margin-bottom: 0.6rem; background: rgba(0,0,0,0.2);">
      <label style="display: flex; gap: 0.6rem; font-size: 0.85rem; line-height: 1.4; cursor: pointer;">
        <input type="checkbox" class="obj-check" value="${esc(obj)}">
        <span><strong>Objective ${i + 1}:</strong> ${esc(obj)}</span>
      </label>
    </div>
  `).join('');

  modal.classList.add('open');
}

function applySelectedObjectives() {
  const checks = Array.from(document.querySelectorAll('.obj-check:checked'));
  if (checks.length === 0) {
    showToast('Please select at least one objective', 'info');
    return;
  }
  const combined = checks.map(c => c.value).join(' ');
  jobState.objective = combined;
  const input = document.getElementById('jobObjectiveInput');
  if (input) input.value = combined;
  closeModal('objectiveLibraryModal');
  renderA4Preview();
  pushHistory();
  showToast('Career Objective updated', 'success');
}

function openDeclarationModal() {
  const modal = document.getElementById('declarationLibraryModal');
  const listCont = document.getElementById('declarationList');
  if (!modal || !listCont) return;

  listCont.innerHTML = PREDEFINED_DECLARATIONS.map((dec, i) => `
    <div style="padding: 0.75rem; border: 1px solid var(--builder-card-border); border-radius: 8px; margin-bottom: 0.6rem; background: rgba(0,0,0,0.2);">
      <label style="display: flex; gap: 0.6rem; font-size: 0.85rem; line-height: 1.4; cursor: pointer;">
        <input type="radio" name="decl_radio" value="${esc(dec)}" ${jobState.declaration === dec ? 'checked' : ''}>
        <span><strong>Declaration ${i + 1}:</strong> ${esc(dec)}</span>
      </label>
    </div>
  `).join('');

  modal.classList.add('open');
}

function applySelectedDeclaration() {
  const selected = document.querySelector('input[name="decl_radio"]:checked');
  if (!selected) {
    showToast('Please select a declaration', 'info');
    return;
  }
  jobState.declaration = selected.value;
  const input = document.getElementById('jobDeclarationInput');
  if (input) input.value = selected.value;
  closeModal('declarationLibraryModal');
  renderA4Preview();
  pushHistory();
  showToast('Declaration updated', 'success');
}

// --------------------------------------------------------------------------
// 8. Photo Uploader & Cropper Modal
// --------------------------------------------------------------------------

let cropImage = new Image();
let cropScale = 1;
let cropX = 0;
let cropY = 0;
let isDraggingCrop = false;
let startDragX = 0;
let startDragY = 0;

function handlePhotoUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (!file.type.match('image.*')) {
    showToast('Please select a valid image file (JPG, PNG, WEBP)', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    cropImage.onload = () => {
      cropScale = 1;
      cropX = 0;
      cropY = 0;
      openPhotoCropperModal();
    };
    cropImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function openPhotoCropperModal() {
  const modal = document.getElementById('photoCropperModal');
  if (!modal) return;
  modal.classList.add('open');
  initCropperCanvas();
}

function initCropperCanvas() {
  const canvas = document.getElementById('cropCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!cropImage.src) return;
    
    ctx.save();
    const cx = canvas.width / 2 + cropX;
    const cy = canvas.height / 2 + cropY;
    const w = cropImage.width * cropScale;
    const h = cropImage.height * cropScale;
    ctx.drawImage(cropImage, cx - w/2, cy - h/2, w, h);
    ctx.restore();
  }
  
  draw();

  canvas.onmousedown = (e) => {
    isDraggingCrop = true;
    startDragX = e.clientX - cropX;
    startDragY = e.clientY - cropY;
  };
  window.onmousemove = (e) => {
    if (!isDraggingCrop) return;
    cropX = e.clientX - startDragX;
    cropY = e.clientY - startDragY;
    draw();
  };
  window.onmouseup = () => { isDraggingCrop = false; };

  // Touch support for mobile
  canvas.ontouchstart = (e) => {
    if (e.touches.length === 1) {
      isDraggingCrop = true;
      startDragX = e.touches[0].clientX - cropX;
      startDragY = e.touches[0].clientY - cropY;
    }
  };
  window.ontouchmove = (e) => {
    if (!isDraggingCrop || e.touches.length !== 1) return;
    cropX = e.touches[0].clientX - startDragX;
    cropY = e.touches[0].clientY - startDragY;
    draw();
  };
  window.ontouchend = () => { isDraggingCrop = false; };

  const zoomSlider = document.getElementById('cropZoomSlider');
  if (zoomSlider) {
    zoomSlider.oninput = (e) => {
      cropScale = parseFloat(e.target.value);
      draw();
    };
  }
}

function applyCroppedPhoto() {
  const canvas = document.getElementById('cropCanvas');
  if (!canvas) return;
  
  const out = document.createElement('canvas');
  out.width = 300;
  out.height = 300;
  const outCtx = out.getContext('2d');
  outCtx.drawImage(canvas, 0, 0, 300, 300);
  
  const dataUrl = out.toDataURL('image/jpeg', 0.9);
  if (appMode === 'job') {
    jobState.personal.photo = dataUrl;
  } else {
    biodataState.personal.photo = dataUrl;
  }
  
  updatePhotoPreviewAvatars();
  closeModal('photoCropperModal');
  renderA4Preview();
  pushHistory();
  showToast('Photo cropped and applied', 'success');
}

function removePhoto() {
  if (appMode === 'job') {
    jobState.personal.photo = '';
  } else {
    biodataState.personal.photo = '';
  }
  updatePhotoPreviewAvatars();
  renderA4Preview();
  pushHistory();
  showToast('Photo removed', 'info');
}

function updatePhotoPreviewAvatars() {
  const photo = appMode === 'job' ? jobState.personal.photo : biodataState.personal.photo;
  const avatars = document.querySelectorAll('.photo-preview-avatar');
  avatars.forEach(av => {
    if (photo) {
      av.innerHTML = `<img src="${photo}" alt="Profile Photo">`;
    } else {
      av.innerHTML = `<span>No Photo</span>`;
    }
  });
}

// --------------------------------------------------------------------------
// 9. UNIVERSAL TEMPLATE RENDERERS (12 Job + 10 Marriage Biodata)
// --------------------------------------------------------------------------

function renderA4Preview() {
  const canvas = document.getElementById('a4PageCanvas');
  if (!canvas) return;

  const isJob = (appMode === 'job');
  const data = isJob ? jobState : biodataState;
  const colors = isJob ? JOB_COLORS[data.color || 'blue'] : BIODATA_COLORS[data.color || 'red'];

  // Apply CSS custom properties
  canvas.style.setProperty('--cv-color', colors.main);
  canvas.style.setProperty('--cv-color-dark', colors.dark);
  canvas.style.setProperty('--cv-color-light', colors.light);
  canvas.style.setProperty('--cv-color-border', colors.border);
  canvas.style.setProperty('--cv-font', data.layout.fontFamily);
  canvas.style.setProperty('--cv-font-size', data.layout.fontSize);
  canvas.style.setProperty('--cv-line-height', data.layout.lineHeight);
  canvas.style.setProperty('--cv-margin', data.layout.margin);
  canvas.style.setProperty('--cv-section-spacing', data.layout.sectionSpacing);

  canvas.className = `a4-page tpl-${data.template || (isJob ? 'classic' : 'traditional')}`;

  let html = '';
  if (isJob) {
    html = renderJobResumeHtml(data);
  } else {
    html = renderMarriageBiodataHtml(data);
  }

  canvas.innerHTML = html;
  checkPageOverflow();
}

// Check Page Overflow vs A4 297mm Boundary
function checkPageOverflow() {
  const canvas = document.getElementById('a4PageCanvas');
  const badge = document.getElementById('overflowStatusBadge');
  const fitBtn = document.getElementById('btnFitOnePage');
  if (!canvas) return;

  // A4 standard ratio: 297mm height is approx 1122px at 96 DPI
  const a4HeightPx = 1122;
  const actualHeight = canvas.scrollHeight;

  if (actualHeight > a4HeightPx + 20) {
    if (badge) {
      badge.className = 'preview-badge-status overflow';
      badge.textContent = `⚠️ Exceeds 1 Page (+${actualHeight - a4HeightPx}px)`;
    }
    if (fitBtn) fitBtn.style.display = 'inline-flex';
  } else {
    if (badge) {
      badge.className = 'preview-badge-status';
      badge.textContent = 'Fits 1 Page ✓';
    }
    if (fitBtn) fitBtn.style.display = 'none';
  }
}

// Smart "Fit to One Page" Algorithm
function fitToOnePage() {
  const data = appMode === 'job' ? jobState : biodataState;
  
  // Safe incremental adjustments
  data.layout.margin = '10mm';
  data.layout.sectionSpacing = '8px';
  data.layout.fontSize = '11.5px';
  data.layout.lineHeight = '1.35';

  renderA4Preview();
  pushHistory();
  showToast('Adjusted spacing and font size to fit on one page', 'success');
}

// --- JOB RESUME RENDERER ---
function renderJobResumeHtml(d) {
  const p = d.personal;
  const name = val(p.fullName);
  const photo = (p.showPhoto && val(p.photo)) ? p.photo : null;
  
  let contactItems = [];
  if (val(p.mobile)) contactItems.push(`📞 ${esc(p.mobile)}`);
  if (val(p.whatsapp)) contactItems.push(`💬 ${esc(p.whatsapp)}`);
  if (val(p.email)) contactItems.push(`✉️ ${esc(p.email)}`);
  if (val(p.address)) contactItems.push(`📍 ${esc(p.address)}`);

  let personalGrid = [];
  if (val(p.dob)) personalGrid.push({ l: 'Date of Birth', v: p.dob });
  if (val(p.fatherName)) personalGrid.push({ l: "Father's Name", v: p.fatherName });
  if (val(p.motherName)) personalGrid.push({ l: "Mother's Name", v: p.motherName });
  if (val(p.gender)) personalGrid.push({ l: 'Gender', v: p.gender });
  if (val(p.nationality)) personalGrid.push({ l: 'Nationality', v: p.nationality });
  if (val(p.maritalStatus)) personalGrid.push({ l: 'Marital Status', v: p.maritalStatus });
  if (val(p.languagesKnown)) personalGrid.push({ l: 'Languages Known', v: p.languagesKnown });
  if (val(p.hobbies)) personalGrid.push({ l: 'Hobbies', v: p.hobbies });

  let out = '';

  // Header Block
  if (name || contactItems.length > 0 || photo) {
    out += `
      <header class="a4-header">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
          <div style="flex:1;">
            ${name ? `<h1 class="a4-name">${esc(name)}</h1>` : ''}
            ${contactItems.length > 0 ? `<div class="a4-contacts-line">${contactItems.map(c => `<span>${c}</span>`).join(' | ')}</div>` : ''}
          </div>
          ${photo ? `<div style="width:var(--cv-photo-size); height:var(--cv-photo-size); border-radius:var(--cv-photo-radius); overflow:hidden; border:2px solid var(--cv-color); flex-shrink:0;"><img src="${photo}" style="width:100%; height:100%; object-fit:cover;"></div>` : ''}
        </div>
      </header>
    `;
  }

  // Career Objective
  if (val(d.objective)) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Career Objective</h2>
        <p style="font-size:0.92em; line-height:1.45; text-align:justify;">${esc(d.objective)}</p>
      </section>
    `;
  }

  // Professional Summary (Medium / High Details)
  if (val(d.summary) && (d.level === 'medium' || d.level === 'high')) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Professional Summary</h2>
        <p style="font-size:0.92em; line-height:1.45; text-align:justify;">${esc(d.summary)}</p>
      </section>
    `;
  }

  // Education (NO MARKS/PERCENTAGE)
  const validEdu = d.education.filter(e => val(e.exam) || val(e.board) || val(e.year));
  if (validEdu.length > 0) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Education / Academic Qualification</h2>
        <table class="a4-table">
          <thead>
            <tr>
              <th>Qualification</th>
              <th>Board / University</th>
              <th>Passing Year</th>
              ${validEdu.some(e => val(e.division)) ? `<th>Division</th>` : ''}
            </tr>
          </thead>
          <tbody>
            ${validEdu.map(e => `
              <tr>
                <td><strong>${esc(e.exam || '')}</strong></td>
                <td>${esc(e.board || '')}</td>
                <td>${esc(e.year || '')}</td>
                ${validEdu.some(x => val(x.division)) ? `<td>${esc(e.division || '')}</td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `;
  }

  // Professional Qualification
  const validProq = d.proQualification.filter(e => val(e.exam) || val(e.board));
  if (validProq.length > 0) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Professional Qualification</h2>
        <table class="a4-table">
          <thead>
            <tr>
              <th>Exam / Course</th>
              <th>Board / Institute</th>
              <th>Year</th>
              ${validProq.some(e => val(e.division)) ? `<th>Division</th>` : ''}
            </tr>
          </thead>
          <tbody>
            ${validProq.map(e => `
              <tr>
                <td><strong>${esc(e.exam || '')}</strong></td>
                <td>${esc(e.board || '')}</td>
                <td>${esc(e.year || '')}</td>
                ${validProq.some(x => val(x.division)) ? `<td>${esc(e.division || '')}</td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `;
  }

  // Extra Qualification
  const validExt = d.extraQualification.filter(e => val(e.title));
  if (validExt.length > 0) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Extra Qualification / Computer Skills</h2>
        <ul style="margin:4px 0 0 16px; padding:0; font-size:0.92em;">
          ${validExt.map(e => `<li>${esc(e.title)}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  // Work Experience
  if (!d.isFresher) {
    const validExp = d.experience.filter(e => val(e.company) || val(e.position) || val(e.description));
    if (validExp.length > 0) {
      out += `
        <section class="a4-section">
          <h2 class="a4-section-title">Work Experience</h2>
          ${validExp.map(e => `
            <div style="margin-bottom:8px;">
              <div style="display:flex; justify-content:space-between; align-items:baseline;">
                <strong>${esc(e.position || '')}${e.company ? ' – ' + esc(e.company) : ''}</strong>
                <span style="font-size:0.85em; color:#64748b;">${esc(e.startDate || '')} ${e.startDate && (e.endDate || e.currentlyWorking) ? '–' : ''} ${e.currentlyWorking ? 'Present' : esc(e.endDate || '')}</span>
              </div>
              ${val(e.location) ? `<div style="font-size:0.82em; color:#64748b;">📍 ${esc(e.location)}</div>` : ''}
              ${val(e.description) ? `<p style="font-size:0.88em; margin-top:3px; line-height:1.4;">${esc(e.description)}</p>` : ''}
            </div>
          `).join('')}
        </section>
      `;
    }
  }

  // Projects (Medium / High Details)
  const validProj = d.projects.filter(p => val(p.title) || val(p.description));
  if (validProj.length > 0 && (d.level === 'medium' || d.level === 'high')) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Key Projects</h2>
        ${validProj.map(p => `
          <div style="margin-bottom:6px;">
            <div style="display:flex; justify-content:space-between; align-items:baseline;">
              <strong>${esc(p.title)}</strong>
              ${val(p.role) ? `<span style="font-size:0.85em; color:#64748b;">Role: ${esc(p.role)}</span>` : ''}
            </div>
            ${val(p.tech) ? `<div style="font-size:0.82em; color:var(--cv-color);">Tech: ${esc(p.tech)}</div>` : ''}
            ${val(p.description) ? `<p style="font-size:0.88em; margin-top:2px;">${esc(p.description)}</p>` : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  // Skills & Technical Skills
  if (hasArr(d.skills) || hasArr(d.techSkills)) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Skills &amp; Competencies</h2>
        <div style="display:flex; flex-wrap:wrap; gap:5px; font-size:0.88em;">
          ${d.skills.map(s => `<span style="background:var(--cv-color-light); border:1px solid var(--cv-color-border); color:var(--cv-color-dark); padding:2px 7px; border-radius:3px;">${esc(s)}</span>`).join('')}
          ${d.techSkills.map(s => `<span style="background:#f1f5f9; border:1px solid #cbd5e1; padding:2px 7px; border-radius:3px;">${esc(s)}</span>`).join('')}
        </div>
      </section>
    `;
  }

  // Certifications
  const validCert = d.certifications.filter(c => val(c.title));
  if (validCert.length > 0) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Certifications</h2>
        <ul style="margin:4px 0 0 16px; padding:0; font-size:0.88em;">
          ${validCert.map(c => `<li><strong>${esc(c.title)}</strong>${c.issuer ? ' – ' + esc(c.issuer) : ''}${c.year ? ' (' + esc(c.year) + ')' : ''}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  // Personal Details Section (Universal Empty-Field Reflow)
  if (personalGrid.length > 0) {
    out += `
      <section class="a4-section">
        <h2 class="a4-section-title">Personal Details</h2>
        <div class="a4-grid-details">
          ${personalGrid.map(item => `
            <div class="a4-detail-row">
              <span class="a4-detail-label">${esc(item.l)}:</span>
              <span class="a4-detail-val">${esc(item.v)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Declaration & Footer
  if (d.declarationEnabled && val(d.declaration)) {
    out += `
      <div class="a4-footer-block">
        <h2 class="a4-section-title" style="font-size:0.95em;">Declaration</h2>
        <p style="font-size:0.88em; line-height:1.4; font-style:italic;">${esc(d.declaration)}</p>
        <div class="a4-footer-flex">
          <div>
            ${val(d.footer.place) ? `<div><strong>Place:</strong> ${esc(d.footer.place)}</div>` : ''}
            ${val(d.footer.date) ? `<div><strong>Date:</strong> ${esc(d.footer.date)}</div>` : ''}
          </div>
          <div style="text-align:right;">
            <div style="height:25px;"></div>
            <div><strong>(${esc(val(d.footer.signatureName) || name || 'Signature')})</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  return out;
}

// --- MARRIAGE BIODATA RENDERER ---
function renderMarriageBiodataHtml(d) {
  const p = d.personal;
  const name = val(p.fullName);
  const photo = (p.showPhoto && val(p.photo)) ? p.photo : null;

  let basicList = [];
  if (val(p.dob)) basicList.push({ l: 'Date of Birth', v: p.dob });
  if (val(p.age)) basicList.push({ l: 'Age', v: p.age });
  if (val(p.height)) basicList.push({ l: 'Height', v: p.height });
  if (val(p.weight)) basicList.push({ l: 'Weight', v: p.weight });
  if (val(p.religion)) basicList.push({ l: 'Religion', v: p.religion });
  if (val(p.caste)) basicList.push({ l: 'Caste', v: p.caste });
  if (val(p.subCaste)) basicList.push({ l: 'Sub-Caste', v: p.subCaste });
  if (val(p.gotra)) basicList.push({ l: 'Gotra', v: p.gotra });
  if (val(p.manglik) && p.manglik !== 'None') basicList.push({ l: 'Manglik', v: p.manglik });
  if (val(p.motherTongue)) basicList.push({ l: 'Mother Tongue', v: p.motherTongue });
  if (val(p.complexion)) basicList.push({ l: 'Complexion', v: p.complexion });
  if (val(p.bloodGroup)) basicList.push({ l: 'Blood Group', v: p.bloodGroup });
  if (val(p.maritalStatus)) basicList.push({ l: 'Marital Status', v: p.maritalStatus });
  if (val(p.birthPlace)) basicList.push({ l: 'Birth Place', v: p.birthPlace });
  if (val(p.birthTime)) basicList.push({ l: 'Birth Time', v: p.birthTime });

  let out = '';

  // Auspicious Header Banner
  out += `
    <div class="auspicious-head">॥ श्री गणेशाय नमः ॥</div>
    <div class="bio-title">MARRIAGE BIODATA</div>
  `;

  // Top Section: Name & Photo
  out += `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <div>
        ${name ? `<h1 style="font-size:1.6em; font-weight:800; color:var(--cv-color-dark); margin:0;">${esc(name)}</h1>` : ''}
        ${val(d.profession.occupation) ? `<div style="font-size:0.95em; color:#475569; font-weight:600;">${esc(d.profession.occupation)}</div>` : ''}
      </div>
      ${photo ? `<div style="width:var(--cv-photo-size); height:var(--cv-photo-size); border-radius:var(--cv-photo-radius); overflow:hidden; border:3px solid var(--cv-color); flex-shrink:0;"><img src="${photo}" style="width:100%; height:100%; object-fit:cover;"></div>` : ''}
    </div>
  `;

  // Personal / Basic Details Box
  if (basicList.length > 0) {
    out += `
      <div class="bio-section-box">
        <div class="bio-section-box-title">Personal Details</div>
        <div class="a4-grid-details">
          ${basicList.map(item => `
            <div class="a4-detail-row">
              <span class="a4-detail-label">${esc(item.l)}:</span>
              <span class="a4-detail-val">${esc(item.v)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Professional Details Box
  const prof = d.profession;
  let profList = [];
  if (val(prof.jobTitle)) profList.push({ l: 'Job Title', v: prof.jobTitle });
  if (val(prof.company)) profList.push({ l: 'Company / Org', v: prof.company });
  if (val(prof.workLocation)) profList.push({ l: 'Work Location', v: prof.workLocation });
  if (val(prof.businessDetails)) profList.push({ l: 'Business Details', v: prof.businessDetails });
  if (val(prof.income)) profList.push({ l: 'Annual / Monthly Income', v: prof.income });
  if (val(prof.otherDetails)) profList.push({ l: 'Other Details', v: prof.otherDetails });

  if (profList.length > 0 || val(prof.occupation)) {
    out += `
      <div class="bio-section-box">
        <div class="bio-section-box-title">Professional &amp; Educational Background</div>
        ${val(prof.occupation) ? `<div style="margin-bottom:4px;"><strong>Occupation:</strong> ${esc(prof.occupation)}</div>` : ''}
        <div class="a4-grid-details">
          ${profList.map(item => `
            <div class="a4-detail-row">
              <span class="a4-detail-label">${esc(item.l)}:</span>
              <span class="a4-detail-val">${esc(item.v)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Family Details Box
  const fam = d.family;
  let famList = [];
  if (val(fam.fatherName)) famList.push({ l: "Father's Name", v: fam.fatherName });
  if (val(fam.fatherOccupation)) famList.push({ l: "Father's Occupation", v: fam.fatherOccupation });
  if (val(fam.motherName)) famList.push({ l: "Mother's Name", v: fam.motherName });
  if (val(fam.motherOccupation)) famList.push({ l: "Mother's Occupation", v: fam.motherOccupation });
  if (val(fam.familyType)) famList.push({ l: "Family Type", v: fam.familyType });
  if (val(fam.familyLocation)) famList.push({ l: "Current Location", v: fam.familyLocation });
  if (val(fam.nativePlace)) famList.push({ l: "Native Place", v: fam.nativePlace });

  const validBros = d.brothers.filter(b => val(b.name));
  const validSis = d.sisters.filter(s => val(s.name));

  if (famList.length > 0 || validBros.length > 0 || validSis.length > 0 || val(fam.familyDetails)) {
    out += `
      <div class="bio-section-box">
        <div class="bio-section-box-title">Family Details</div>
        <div class="a4-grid-details">
          ${famList.map(item => `
            <div class="a4-detail-row">
              <span class="a4-detail-label">${esc(item.l)}:</span>
              <span class="a4-detail-val">${esc(item.v)}</span>
            </div>
          `).join('')}
        </div>
        ${validBros.length > 0 ? `
          <div style="margin-top:6px; font-size:0.9em;">
            <strong>Brother(s):</strong> ${validBros.map(b => `${esc(b.name)} (${esc(b.status)}${b.occupation ? ', ' + esc(b.occupation) : ''})`).join('; ')}
          </div>
        ` : ''}
        ${validSis.length > 0 ? `
          <div style="margin-top:4px; font-size:0.9em;">
            <strong>Sister(s):</strong> ${validSis.map(s => `${esc(s.name)} (${esc(s.status)}${s.occupation ? ', ' + esc(s.occupation) : ''})`).join('; ')}
          </div>
        ` : ''}
        ${val(fam.familyDetails) ? `<p style="margin-top:4px; font-size:0.88em;">${esc(fam.familyDetails)}</p>` : ''}
      </div>
    `;
  }

  // Horoscope Details (if toggle enabled)
  if (d.showHoroscope) {
    const h = d.horoscope;
    let hList = [];
    if (val(h.rashi)) hList.push({ l: 'Rashi', v: h.rashi });
    if (val(h.nakshatra)) hList.push({ l: 'Nakshatra', v: h.nakshatra });
    if (val(h.gotra)) hList.push({ l: 'Gotra', v: h.gotra });
    if (val(h.manglik) && h.manglik !== 'None') hList.push({ l: 'Manglik', v: h.manglik });
    if (val(h.birthPlace)) hList.push({ l: 'Birth Place', v: h.birthPlace });
    if (val(h.birthTime)) hList.push({ l: 'Birth Time', v: h.birthTime });

    if (hList.length > 0) {
      out += `
        <div class="bio-section-box">
          <div class="bio-section-box-title">Horoscope / Kundali Details</div>
          <div class="a4-grid-details">
            ${hList.map(item => `
              <div class="a4-detail-row">
                <span class="a4-detail-label">${esc(item.l)}:</span>
                <span class="a4-detail-val">${esc(item.v)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  // Contact Details Box
  const c = d.contact;
  let cList = [];
  if (val(c.contactPerson)) cList.push({ l: 'Contact Person', v: c.contactPerson });
  if (val(c.mobile)) cList.push({ l: 'Mobile Number', v: c.mobile });
  if (val(c.whatsapp)) cList.push({ l: 'WhatsApp', v: c.whatsapp });
  if (val(c.address)) cList.push({ l: 'Address', v: c.address });
  if (val(c.city)) cList.push({ l: 'City', v: c.city });
  if (val(c.state)) cList.push({ l: 'State', v: c.state });

  if (cList.length > 0) {
    out += `
      <div class="bio-section-box" style="background:var(--cv-color-light);">
        <div class="bio-section-box-title">Contact Information</div>
        <div class="a4-grid-details">
          ${cList.map(item => `
            <div class="a4-detail-row">
              <span class="a4-detail-label">${esc(item.l)}:</span>
              <span class="a4-detail-val">${esc(item.v)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return out;
}

// --------------------------------------------------------------------------
// 10. PDF Export & High Resolution Download Engine
// --------------------------------------------------------------------------

function downloadPDF() {
  const canvas = document.getElementById('a4PageCanvas');
  if (!canvas) return;

  const btn = document.getElementById('btnDownloadPdf');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⏳ Generating PDF...';
  }

  const isJob = (appMode === 'job');
  const data = isJob ? jobState : biodataState;
  const rawName = (data.personal.fullName || (isJob ? 'My_Resume' : 'Marriage_Biodata')).trim();
  const safeName = rawName.replace(/[^a-zA-Z0-9_ऀ-ॿ]/g, '_');
  const filename = `${safeName}_${isJob ? 'Resume' : 'Marriage_Biodata'}.pdf`;

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (window.html2pdf) {
    window.html2pdf().set(opt).from(canvas).save().then(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '📄 Download PDF';
      }
      showToast('PDF downloaded successfully!', 'success');
    }).catch(err => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '📄 Download PDF';
      }
      showToast('Opening print dialog to save as PDF...', 'info');
      window.print();
    });
  } else {
    window.print();
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '📄 Download PDF';
    }
  }
}

function printDocument() {
  window.print();
}

// --------------------------------------------------------------------------
// 11. Form Binding & Sync
// --------------------------------------------------------------------------

function syncFormFromState() {
  const isJob = (appMode === 'job');
  
  // Show / Hide appropriate form panels
  const jobForm = document.getElementById('jobResumeFormContainer');
  const bioForm = document.getElementById('marriageBiodataFormContainer');
  if (jobForm) jobForm.style.display = isJob ? 'block' : 'none';
  if (bioForm) bioForm.style.display = isJob ? 'none' : 'block';

  // Toggle Toolbar Groups (Level tabs for Job vs Gender tabs for Biodata)
  const jobLvlGrp = document.getElementById('jobLevelGroup');
  const bioGndGrp = document.getElementById('bioGenderGroup');
  if (jobLvlGrp) jobLvlGrp.style.display = isJob ? 'inline-flex' : 'none';
  if (bioGndGrp) bioGndGrp.style.display = isJob ? 'none' : 'inline-flex';

  // Update Hero Cards Active Highlight
  const cardJob = document.getElementById('cardModuleJob');
  const cardBio = document.getElementById('cardModuleBio');
  if (cardJob) cardJob.classList.toggle('active', isJob);
  if (cardBio) cardBio.classList.toggle('active', !isJob);

  // Update Toolbar Badges
  const modeBadge = document.getElementById('activeModeBadge');
  if (modeBadge) {
    if (isJob) {
      modeBadge.className = 'badge-mode';
      modeBadge.textContent = `Job Resume (${jobState.level.toUpperCase()})`;
    } else {
      modeBadge.className = 'badge-mode biodata';
      modeBadge.textContent = `Marriage Biodata (${biodataState.type.toUpperCase()})`;
    }
  }

  // Bind Job Form Inputs
  if (isJob) {
    const p = jobState.personal;
    setVal('jobFullName', p.fullName);
    setVal('jobAddress', p.address);
    setVal('jobMobile', p.mobile);
    setVal('jobWhatsapp', p.whatsapp);
    setVal('jobEmail', p.email);
    setVal('jobDob', p.dob);
    setVal('jobFatherName', p.fatherName);
    setVal('jobMotherName', p.motherName);
    setVal('jobNationality', p.nationality);
    setVal('jobGender', p.gender);
    setVal('jobMaritalStatus', p.maritalStatus);
    setVal('jobLanguages', p.languagesKnown);
    setVal('jobHobbies', p.hobbies);
    setVal('jobObjectiveInput', jobState.objective);
    setVal('jobSummaryInput', jobState.summary);
    setVal('jobDeclarationInput', jobState.declaration);
    setVal('jobPlaceInput', jobState.footer.place);
    setVal('jobDateInput', jobState.footer.date);
    setVal('jobSignatureInput', jobState.footer.signatureName);
    setCheck('jobFresherCheck', jobState.isFresher);
  } else {
    // Bind Biodata Form Inputs
    const p = biodataState.personal;
    setVal('bioFullName', p.fullName);
    setVal('bioDob', p.dob);
    setVal('bioAge', p.age);
    setVal('bioHeight', p.height);
    setVal('bioWeight', p.weight);
    setVal('bioReligion', p.religion);
    setVal('bioCaste', p.caste);
    setVal('bioSubCaste', p.subCaste);
    setVal('bioGotra', p.gotra);
    setVal('bioManglik', p.manglik);
    setVal('bioMotherTongue', p.motherTongue);
    setVal('bioComplexion', p.complexion);
    setVal('bioBloodGroup', p.bloodGroup);
    setVal('bioMaritalStatus', p.maritalStatus);
    setVal('bioBirthPlace', p.birthPlace);
    setVal('bioBirthTime', p.birthTime);

    // Profession
    const pr = biodataState.profession;
    setVal('bioOccupation', pr.occupation);
    setVal('bioJobTitle', pr.jobTitle);
    setVal('bioCompany', pr.company);
    setVal('bioWorkLocation', pr.workLocation);
    setVal('bioIncome', pr.income);

    // Family
    const f = biodataState.family;
    setVal('bioFatherName', f.fatherName);
    setVal('bioFatherOcc', f.fatherOccupation);
    setVal('bioMotherName', f.motherName);
    setVal('bioMotherOcc', f.motherOccupation);
    setVal('bioFamilyType', f.familyType);
    setVal('bioFamilyLoc', f.familyLocation);
    setVal('bioNativePlace', f.nativePlace);

    // Contact
    const c = biodataState.contact;
    setVal('bioContactPerson', c.contactPerson);
    setVal('bioMobile', c.mobile);
    setVal('bioWhatsapp', c.whatsapp);
    setVal('bioAddress', c.address);

    // Horoscope
    setCheck('bioShowHoroscope', biodataState.showHoroscope);
    const h = biodataState.horoscope;
    setVal('bioRashi', h.rashi);
    setVal('bioNakshatra', h.nakshatra);
  }

  updatePhotoPreviewAvatars();
  renderDynamicLists();
  renderPaletteSelector();
}

function setVal(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v || '';
}

function setCheck(id, c) {
  const el = document.getElementById(id);
  if (el) el.checked = !!c;
}

// Bind Input Listeners (debounced live preview)
function initInputListeners() {
  document.addEventListener('input', (e) => {
    const id = e.target.id;
    if (!id) return;

    if (appMode === 'job') {
      const p = jobState.personal;
      if (id === 'jobFullName') p.fullName = e.target.value;
      else if (id === 'jobAddress') p.address = e.target.value;
      else if (id === 'jobMobile') p.mobile = e.target.value;
      else if (id === 'jobWhatsapp') p.whatsapp = e.target.value;
      else if (id === 'jobEmail') p.email = e.target.value;
      else if (id === 'jobDob') p.dob = e.target.value;
      else if (id === 'jobFatherName') p.fatherName = e.target.value;
      else if (id === 'jobMotherName') p.motherName = e.target.value;
      else if (id === 'jobNationality') p.nationality = e.target.value;
      else if (id === 'jobGender') p.gender = e.target.value;
      else if (id === 'jobMaritalStatus') p.maritalStatus = e.target.value;
      else if (id === 'jobLanguages') p.languagesKnown = e.target.value;
      else if (id === 'jobHobbies') p.hobbies = e.target.value;
      else if (id === 'jobObjectiveInput') jobState.objective = e.target.value;
      else if (id === 'jobSummaryInput') jobState.summary = e.target.value;
      else if (id === 'jobDeclarationInput') jobState.declaration = e.target.value;
      else if (id === 'jobPlaceInput') jobState.footer.place = e.target.value;
      else if (id === 'jobDateInput') jobState.footer.date = e.target.value;
      else if (id === 'jobSignatureInput') jobState.footer.signatureName = e.target.value;
    } else {
      const p = biodataState.personal;
      if (id === 'bioFullName') p.fullName = e.target.value;
      else if (id === 'bioDob') {
        p.dob = e.target.value;
        calculateAgeFromDob(e.target.value);
      }
      else if (id === 'bioAge') p.age = e.target.value;
      else if (id === 'bioHeight') p.height = e.target.value;
      else if (id === 'bioWeight') p.weight = e.target.value;
      else if (id === 'bioReligion') p.religion = e.target.value;
      else if (id === 'bioCaste') p.caste = e.target.value;
      else if (id === 'bioSubCaste') p.subCaste = e.target.value;
      else if (id === 'bioGotra') p.gotra = e.target.value;
      else if (id === 'bioManglik') p.manglik = e.target.value;
      else if (id === 'bioMotherTongue') p.motherTongue = e.target.value;
      else if (id === 'bioComplexion') p.complexion = e.target.value;
      else if (id === 'bioBloodGroup') p.bloodGroup = e.target.value;
      else if (id === 'bioMaritalStatus') p.maritalStatus = e.target.value;
      else if (id === 'bioBirthPlace') p.birthPlace = e.target.value;
      else if (id === 'bioBirthTime') p.birthTime = e.target.value;

      // Profession
      else if (id === 'bioOccupation') biodataState.profession.occupation = e.target.value;
      else if (id === 'bioJobTitle') biodataState.profession.jobTitle = e.target.value;
      else if (id === 'bioCompany') biodataState.profession.company = e.target.value;
      else if (id === 'bioWorkLocation') biodataState.profession.workLocation = e.target.value;
      else if (id === 'bioIncome') biodataState.profession.income = e.target.value;

      // Family
      else if (id === 'bioFatherName') biodataState.family.fatherName = e.target.value;
      else if (id === 'bioFatherOcc') biodataState.family.fatherOccupation = e.target.value;
      else if (id === 'bioMotherName') biodataState.family.motherName = e.target.value;
      else if (id === 'bioMotherOcc') biodataState.family.motherOccupation = e.target.value;
      else if (id === 'bioFamilyType') biodataState.family.familyType = e.target.value;
      else if (id === 'bioFamilyLoc') biodataState.family.familyLocation = e.target.value;
      else if (id === 'bioNativePlace') biodataState.family.nativePlace = e.target.value;

      // Contact
      else if (id === 'bioContactPerson') biodataState.contact.contactPerson = e.target.value;
      else if (id === 'bioMobile') biodataState.contact.mobile = e.target.value;
      else if (id === 'bioWhatsapp') biodataState.contact.whatsapp = e.target.value;
      else if (id === 'bioAddress') biodataState.contact.address = e.target.value;

      // Horoscope
      else if (id === 'bioRashi') biodataState.horoscope.rashi = e.target.value;
      else if (id === 'bioNakshatra') biodataState.horoscope.nakshatra = e.target.value;
    }

    renderA4Preview();
    triggerAutoSave();
  });

  // Checkbox change listeners
  document.addEventListener('change', (e) => {
    if (e.target.id === 'jobFresherCheck') {
      jobState.isFresher = e.target.checked;
      const expSection = document.getElementById('jobExpCard');
      if (expSection) expSection.style.display = e.target.checked ? 'none' : 'block';
      renderA4Preview();
      pushHistory();
    } else if (e.target.id === 'bioShowHoroscope') {
      biodataState.showHoroscope = e.target.checked;
      const hCard = document.getElementById('bioHoroscopeCard');
      if (hCard) hCard.style.display = e.target.checked ? 'block' : 'none';
      renderA4Preview();
      pushHistory();
    }
  });
}

function calculateAgeFromDob(dobStr) {
  if (!dobStr) return;
  const d = new Date(dobStr);
  if (isNaN(d.getTime())) return;
  const ageDifMs = Date.now() - d.getTime();
  const ageDate = new Date(ageDifMs);
  const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (calculatedAge > 0 && calculatedAge < 120) {
    biodataState.personal.age = calculatedAge + ' Years';
    setVal('bioAge', biodataState.personal.age);
  }
}

// --------------------------------------------------------------------------
// 12. Template & Color Selection
// --------------------------------------------------------------------------

function switchModule(mod) {
  appMode = mod;
  syncFormFromState();
  renderA4Preview();
  showToast(`Switched to ${mod === 'job' ? 'Job Resume' : 'Marriage Biodata'} Mode`, 'info');
}

function setDetailLevel(lvl) {
  jobState.level = lvl;
  document.querySelectorAll('.btn-level-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.level === lvl);
  });
  syncFormFromState();
  renderA4Preview();
  pushHistory();
  showToast(`Set detail level to ${lvl.toUpperCase()}`, 'info');
}

function setBiodataGender(gender) {
  biodataState.type = gender;
  document.querySelectorAll('.btn-gender-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.gender === gender);
  });
  syncFormFromState();
  renderA4Preview();
  pushHistory();
  showToast(`Selected ${gender.toUpperCase()} Biodata Format`, 'info');
}

function openTemplatesModal() {
  const modal = document.getElementById('templatesModal');
  const grid = document.getElementById('templatesBrowserGrid');
  if (!modal || !grid) return;

  const isJob = (appMode === 'job');
  const tpls = isJob ? JOB_TEMPLATES : BIODATA_TEMPLATES;
  const currentTpl = isJob ? jobState.template : biodataState.template;
  const currentClr = isJob ? JOB_COLORS[jobState.color || 'blue'].main : BIODATA_COLORS[biodataState.color || 'red'].main;

  grid.innerHTML = tpls.map(t => `
    <div class="template-card-thumb ${t.id === currentTpl ? 'active' : ''}" onclick="selectTemplate('${t.id}')">
      <div class="template-thumb-preview" style="border-top: 3px solid ${currentClr};">
        <div style="height:6px; background:${currentClr}; width:65%; margin:0 auto 4px; border-radius:2px;"></div>
        <div style="height:3px; background:#cbd5e1; width:85%; margin:0 auto 6px; border-radius:2px;"></div>
        <div style="height:1px; background:#e2e8f0; margin:4px 0;"></div>
        <div style="height:4px; background:#94a3b8; width:45%; border-radius:2px;"></div>
      </div>
      <strong style="font-size:0.85rem; display:block; margin-bottom:2px;">${esc(t.name)}</strong>
      <span style="font-size:0.72rem; color:var(--builder-text-muted); display:block; line-height:1.2;">${esc(t.desc)}</span>
    </div>
  `).join('');

  modal.classList.add('open');
}

function selectTemplate(tplId) {
  if (appMode === 'job') {
    jobState.template = tplId;
  } else {
    biodataState.template = tplId;
  }
  closeModal('templatesModal');
  renderA4Preview();
  pushHistory();
  showToast('Template updated', 'success');
}

function selectColor(colorKey) {
  if (appMode === 'job') {
    jobState.color = colorKey;
  } else {
    biodataState.color = colorKey;
  }
  renderPaletteSelector();
  renderA4Preview();
  pushHistory();
}

function renderPaletteSelector() {
  const container = document.getElementById('paletteContainer');
  if (!container) return;
  const isJob = (appMode === 'job');
  const palette = isJob ? JOB_COLORS : BIODATA_COLORS;
  const activeColor = isJob ? jobState.color : biodataState.color;

  container.innerHTML = Object.keys(palette).map(k => `
    <div class="color-dot ${k === activeColor ? 'active' : ''}"
         style="background-color: ${palette[k].main};"
         title="${k}"
         onclick="selectColor('${k}')"></div>
  `).join('');
}

// --------------------------------------------------------------------------
// 13. Zoom & Mobile Preview Switcher
// --------------------------------------------------------------------------

function setZoom(factor) {
  previewZoom = Math.min(Math.max(factor, 0.4), 1.5);
  const wrapper = document.getElementById('previewScaleWrapper');
  const text = document.getElementById('zoomLevelText');
  if (wrapper) wrapper.style.transform = `scale(${previewZoom})`;
  if (text) text.textContent = `${Math.round(previewZoom * 100)}%`;
}

function toggleMobileView(view) {
  const ws = document.getElementById('builderWorkspace');
  const btnEdit = document.getElementById('btnMobileEdit');
  const btnPrev = document.getElementById('btnMobilePrev');
  if (!ws) return;

  if (view === 'preview') {
    ws.classList.remove('show-editor');
    ws.classList.add('show-preview');
    if (btnEdit) btnEdit.classList.remove('active');
    if (btnPrev) btnPrev.classList.add('active');
  } else {
    ws.classList.remove('show-preview');
    ws.classList.add('show-editor');
    if (btnEdit) btnEdit.classList.add('active');
    if (btnPrev) btnPrev.classList.remove('active');
  }
}

// --------------------------------------------------------------------------
// 14. Modals Controller
// --------------------------------------------------------------------------

function openModal(id) {
  if (id === 'templatesModal') {
    openTemplatesModal();
    return;
  }
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function closeAllModals() {
  document.querySelectorAll('.builder-modal-backdrop').forEach(m => m.classList.remove('open'));
}

// --------------------------------------------------------------------------
// 15. Final Check Modal & Verification
// --------------------------------------------------------------------------

function openFinalCheckModal() {
  const modal = document.getElementById('finalCheckModal');
  const body = document.getElementById('finalCheckBody');
  if (!modal || !body) return;

  const isJob = (appMode === 'job');
  const data = isJob ? jobState : biodataState;
  const name = val(data.personal.fullName);
  const mobile = val(data.personal.mobile);
  const canvas = document.getElementById('a4PageCanvas');
  const actualHeight = canvas ? canvas.scrollHeight : 0;
  const isOverflow = actualHeight > 1142;

  body.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:0.9rem;">
      <div style="display:flex; align-items:center; gap:8px; padding:0.6rem; background:rgba(0,0,0,0.2); border-radius:8px;">
        <span style="font-size:1.2rem;">${name ? '✅' : '⚠️'}</span>
        <div>
          <strong>Full Name:</strong> ${name ? esc(name) : '<span style="color:#f87171;">Not provided</span>'}
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px; padding:0.6rem; background:rgba(0,0,0,0.2); border-radius:8px;">
        <span style="font-size:1.2rem;">${mobile ? '✅' : 'ℹ️'}</span>
        <div>
          <strong>Contact Number:</strong> ${mobile ? esc(mobile) : '<span style="color:#94a3b8;">Optional / Empty</span>'}
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px; padding:0.6rem; background:rgba(0,0,0,0.2); border-radius:8px;">
        <span style="font-size:1.2rem;">${!isOverflow ? '✅' : '⚠️'}</span>
        <div>
          <strong>A4 Page Fit:</strong> ${!isOverflow ? '<span style="color:#34d399;">Perfect 1-Page Fit</span>' : '<span style="color:#f87171;">Content exceeds 1 page boundary</span>'}
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

// --------------------------------------------------------------------------
// 16. App Initialization
// --------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initInputListeners();
  syncFormFromState();
  renderA4Preview();
  pushHistory();
  setZoom(previewZoom);
  checkDraftRecovery();

  // Keyboard Shortcuts: Ctrl+Z (Undo), Ctrl+Y (Redo)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo();
    }
  });

  // Accordion click handlers
  document.querySelectorAll('.editor-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.editor-card');
      if (card) card.classList.toggle('open');
    });
  });
});
