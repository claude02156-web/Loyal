/**
 * MAA ENTERPRISES — ADMIN AUTHENTICATION & AUTHORIZATION ENGINE (js/auth.js)
 * Strict Zero-Trust Production Authorization Model:
 * 1. Supports Firebase Email/Password & Google OAuth Sign-In only.
 * 2. Authenticates through Firebase Authentication.
 * 3. Strictly verifies user UID against Firestore 'admins/{uid}' (active === true && role === 'admin').
 * 4. Rejects & immediately signs out unauthorized users (no client-side privilege escalation).
 * 5. Zero offline/fake admin backdoor — if Firebase is unreachable, login fails.
 * 6. Supports multiple authorized admins via Firestore.
 */

import { 
  auth, 
  db, 
  googleProvider,
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  doc, 
  getDoc,
  serverTimestamp,
  updateDoc,
  isFirebaseConfigured
} from "./firebase-config.js";
import { showToast } from "./app.js";

let currentUser = null;
let currentIsAdmin = false;
let authInitialized = false;
const authListeners = [];

/**
 * Verify whether an authenticated Firebase user possesses active admin authorization in Firestore.
 * @param {Object} firebaseUser 
 * @returns {Promise<{authorized: boolean, adminData?: Object}>}
 */
async function verifyAdminAuthorization(firebaseUser) {
  if (!firebaseUser || !firebaseUser.uid) {
    return { authorized: false };
  }

  if (!isFirebaseConfigured || !db) {
    return { authorized: false };
  }

  try {
    const adminDocRef = doc(db, "admins", firebaseUser.uid);
    const adminSnap = await getDoc(adminDocRef);

    if (adminSnap.exists()) {
      const data = adminSnap.data();
      if (data && data.active === true && data.role === "admin") {
        try {
          await updateDoc(adminDocRef, { lastLoginAt: serverTimestamp() });
        } catch (e) {}
        return { authorized: true, adminData: data };
      }
    }
  } catch (err) {
    console.warn("[Auth] Firestore admin verification notice:", err.message);
  }

  return { authorized: false };
}

/**
 * 1. Email + Password Admin Login
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export async function loginAdminWithEmail(email, password) {
  if (!email || !password) {
    throw new Error("Please enter both email address and password.");
  }

  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase Authentication is not available. Please verify network connectivity.");
  }

  const cleanEmail = email.trim().toLowerCase();
  let userCredential;

  try {
    userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
  } catch (authErr) {
    let friendly = "Authentication failed. Please verify your credentials.";
    if (authErr.code === "auth/invalid-email") {
      friendly = "Invalid email address format.";
    } else if (
      authErr.code === "auth/user-not-found" || 
      authErr.code === "auth/wrong-password" || 
      authErr.code === "auth/invalid-credential"
    ) {
      friendly = "Incorrect email or password. Please check your credentials.";
    } else if (authErr.code === "auth/too-many-requests") {
      friendly = "Access temporarily disabled due to multiple failed attempts. Please try again later or reset password.";
    } else if (authErr.code === "auth/network-request-failed") {
      friendly = "Network connection failed. Please check your internet connection.";
    }
    throw new Error(friendly);
  }

  const user = userCredential.user;

  // Strict Authorization Check in Firestore 'admins/{uid}'
  const { authorized, adminData } = await verifyAdminAuthorization(user);

  if (!authorized) {
    // User is authenticated in Firebase Auth, but NOT an active authorized admin!
    await signOut(auth);
    currentUser = null;
    currentIsAdmin = false;
    updateHeaderAuthUI(null, false);
    
    throw new Error(`Access Denied: Account '${user.email}' is not an authorized administrator. Admin record in Firestore 'admins/${user.uid}' with role='admin' and active=true is required.`);
  }

  // Authorization Confirmed
  currentUser = user;
  currentIsAdmin = true;
  updateHeaderAuthUI(user, true);

  return {
    success: true,
    user,
    isAdmin: true,
    message: "Welcome to Admin Workspace!"
  };
}

/**
 * 2. Google OAuth Admin Login
 * @returns {Promise<Object>}
 */
export async function loginAdminWithGoogle() {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    throw new Error("Firebase Google Authentication is not configured or unavailable.");
  }

  let result;
  try {
    result = await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Google sign-in popup was closed before completing.");
    } else if (error.code === "auth/popup-blocked") {
      throw new Error("Popup blocked by browser. Please enable popups for this site and try again.");
    } else if (error.code === "auth/cancelled-popup-request") {
      throw new Error("Sign-in cancelled.");
    } else if (error.code === "auth/network-request-failed") {
      throw new Error("Network connection error during Google sign-in.");
    }
    throw new Error(error.message || "Google Authentication failed.");
  }

  const user = result.user;

  // Strict Authorization Check in Firestore 'admins/{uid}'
  const { authorized, adminData } = await verifyAdminAuthorization(user);

  if (!authorized) {
    // User authenticated via Google, but has NO active admin document in Firestore!
    await signOut(auth);
    currentUser = null;
    currentIsAdmin = false;
    updateHeaderAuthUI(null, false);

    throw new Error(`Access Denied: Google account '${user.email}' is not an authorized administrator. Admin UID (${user.uid}) must be registered in Firestore 'admins' collection with role='admin' and active=true.`);
  }

  // Authorization Confirmed
  currentUser = user;
  currentIsAdmin = true;
  updateHeaderAuthUI(user, true);

  return {
    success: true,
    user,
    isAdmin: true,
    message: `Welcome, ${user.displayName || 'Admin'}!`
  };
}

/**
 * Backward-compatible alias for loginAdminUser
 */
export async function loginAdminUser(email, password) {
  return loginAdminWithEmail(email, password);
}

/**
 * Sign out user from Firebase
 */
export async function logoutUser() {
  try {
    if (auth && typeof signOut === 'function') {
      await signOut(auth);
    }
  } catch (err) {
    console.warn("[Auth] Signout notice:", err.message);
  }

  currentUser = null;
  currentIsAdmin = false;
  
  if (typeof window !== 'undefined' && window.showToast) {
    showToast("Signed out successfully.", "info");
  }
  updateHeaderAuthUI(null, false);
  
  if (typeof window !== 'undefined' && window.location.pathname.includes("admin.html")) {
    setTimeout(() => {
      window.location.href = "login.html";
    }, 300);
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email) {
  if (!email || !email.trim()) throw new Error("Please enter your registered email address.");
  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, email.trim());
    return true;
  }
  return true;
}

/**
 * Centralized Auth State Listener with Strict Firestore Admin Verification on Refresh
 */
export function initAuthListener(callback) {
  if (typeof callback === "function") {
    authListeners.push(callback);
    if (authInitialized) {
      try { callback(currentUser, currentIsAdmin); } catch (e) { console.error(e); }
    }
  }

  function broadcast(user, isAdmin) {
    currentUser = user;
    currentIsAdmin = isAdmin;
    authInitialized = true;
    updateHeaderAuthUI(currentUser, currentIsAdmin);
    authListeners.forEach(fn => {
      try { fn(currentUser, currentIsAdmin); } catch (e) { console.error(e); }
    });
  }

  if (auth && typeof onAuthStateChanged === "function") {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Always verify admin role in Firestore on session restore / page refresh
        const { authorized } = await verifyAdminAuthorization(firebaseUser);
        if (authorized) {
          broadcast(firebaseUser, true);
        } else {
          // Unauthorized session: sign out immediately
          await signOut(auth);
          broadcast(null, false);
        }
      } else {
        broadcast(null, false);
      }
    });
  } else {
    broadcast(null, false);
  }
}

/**
 * Update Header Admin Button / Portal Link UI
 */
export function updateHeaderAuthUI(user, isAdmin) {
  const authButtons = document.querySelectorAll(".header-admin-btn, .mobile-admin-btn, .nav-auth-btn");
  authButtons.forEach(btn => {
    if (user && isAdmin) {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Admin Dashboard</span>
      `;
      btn.href = "admin.html";
    } else {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Admin Portal</span>
      `;
      btn.href = "login.html";
    }
  });
}

/**
 * Protect Admin Dashboard Page against unauthorized view
 */
export function requireAdminAuth(onAuthorizedCallback) {
  const loadingOverlay = document.getElementById("adminAuthLoading");
  const unauthorizedScreen = document.getElementById("adminUnauthorized");
  const dashboardContent = document.getElementById("adminDashboardContent");

  function renderState(authorized, user) {
    if (loadingOverlay) loadingOverlay.style.display = "none";
    
    if (authorized && user) {
      if (unauthorizedScreen) unauthorizedScreen.style.display = "none";
      if (dashboardContent) dashboardContent.style.display = "block";
      if (typeof onAuthorizedCallback === "function") {
        onAuthorizedCallback(user);
      }
    } else {
      if (dashboardContent) dashboardContent.style.display = "none";
      if (unauthorizedScreen) unauthorizedScreen.style.display = "flex";
    }
  }

  initAuthListener((user, isAdmin) => {
    if (user && isAdmin) {
      renderState(true, user);
    } else {
      renderState(false, null);
    }
  });
}

// Global window attachment for unified workspace access
if (typeof window !== 'undefined') {
  window.AuthService = {
    loginAdminWithEmail,
    loginAdminWithGoogle,
    loginAdminUser,
    logoutUser,
    resetPassword,
    initAuthListener,
    updateHeaderAuthUI,
    requireAdminAuth,
    currentUser: () => currentUser,
    isAdmin: () => currentIsAdmin
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAuthListener();
  });
}
