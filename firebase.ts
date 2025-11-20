import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// -----------------------------------------------------------
// ค่า Config จาก Firebase Console ของคุณ (jobtracker-69ff7)
// -----------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAsUyGRDYKRtC_5m3Wfpg-jGCLyEYDxIsQ",
  authDomain: "jobtracker-69ff7.firebaseapp.com",
  projectId: "jobtracker-69ff7",
  storageBucket: "jobtracker-69ff7.firebasestorage.app",
  messagingSenderId: "839370269742",
  appId: "1:839370269742:web:75f3247f647fd185ec6bbf",
  measurementId: "G-38G90NVE4M"
};
// -----------------------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);