import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAL2XsRt-jFxkePIuzb5_kuBlHccIvaEtg",
  authDomain: "safira-workshop.firebaseapp.com",
  projectId: "safira-workshop",
  storageBucket: "safira-workshop.firebasestorage.app",
  messagingSenderId: "575211274753",
  appId: "1:575211274753:web:66e98f0592ae7c9aecb600",
  measurementId: "G-5VPLRCLQ85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };
