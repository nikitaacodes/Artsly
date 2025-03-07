// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp2xaft4LCjBm0gVNg9X0D3Jj1KdXgmAA",
  authDomain: "friendo-5b183.firebaseapp.com",
  projectId: "friendo-5b183",
  storageBucket: "friendo-5b183.firebasestorage.app",
  messagingSenderId: "74417116475",
  appId: "1:74417116475:web:bfee32df742abd178c131e",
  measurementId: "G-6CV3PV0Y18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };
