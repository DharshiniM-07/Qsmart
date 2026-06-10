import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyADHjJPbrqTCoxDDptCQbLcS9bqRGoaV84",
  authDomain: "qsmart-34f82.firebaseapp.com",
  projectId: "qsmart-34f82",
  storageBucket: "qsmart-34f82.firebasestorage.app",
  messagingSenderId: "244066755336",
  appId: "1:244066755336:web:1d2b0148c3a855f1b242bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);