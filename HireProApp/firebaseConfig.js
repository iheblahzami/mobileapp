// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Add this import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgb6yFRny-j5pmyhtDmprzXASoeclGdb4",
  authDomain: "mobileapp-59a4a.firebaseapp.com",
  projectId: "mobileapp-59a4a",
  storageBucket: "mobileapp-59a4a.appspot.com",  // ✅ Fixed storage bucket URL
  messagingSenderId: "438337248895",
  appId: "1:438337248895:web:f50db257c852ec2a71e94a",
  measurementId: "G-366JN2V1KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // ✅ Ensure Firestore is initialized properly
