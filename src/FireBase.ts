// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJRBfx-fFIDsaggIMycw8x2tzq7FeGCok",
  authDomain: "fir-auth-demo-7df71.firebaseapp.com",
  projectId: "fir-auth-demo-7df71",
  storageBucket: "fir-auth-demo-7df71.firebasestorage.app",
  messagingSenderId: "733598834191",
  appId: "1:733598834191:web:bd92f1e7506a71dca18d7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// export const db = getFirestore(app);
export default app;
