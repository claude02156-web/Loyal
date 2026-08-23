/**
 * MAA ENTERPRISES — FIREBASE MODULAR SDK CONFIGURATION (v10.8.0)
 * Production-ready configuration connected to 'maa-enterprise-0'.
 * Supports Email/Password & Google OAuth Authentication.
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Production Firebase Configuration from User Project: maa-enterprise-0
const firebaseConfig = {
  apiKey: "AIzaSyBsnW3EuHBiz8_Fd0Hp0cRH5tPUSRmPFz4",
  authDomain: "maa-enterprise-0.firebaseapp.com",
  projectId: "maa-enterprise-0",
  storageBucket: "maa-enterprise-0.firebasestorage.app",
  messagingSenderId: "645401929017",
  appId: "1:645401929017:web:5590b92ad75dd358e0b4e8"
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;
let isFirebaseConfigured = false;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('Placeholder')) {
    isFirebaseConfigured = true;
  }
} catch (error) {
  console.warn("[Maa Enterprises] Firebase notice (Operating with resilient fallback):", error.message);
}

// Attach to window.FirebaseApp for global modular access
if (typeof window !== 'undefined') {
  window.FirebaseApp = {
    app,
    auth,
    db,
    googleProvider,
    isFirebaseConfigured,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
  };
}

export {
  app,
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
};
