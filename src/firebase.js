// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9dEVnm1xDdh2EdSp2ReWRpxXj79E-MmY",
  authDomain: "booking-system-bf784.firebaseapp.com",
  projectId: "booking-system-bf784",
  storageBucket: "booking-system-bf784.appspot.com",
  messagingSenderId: "792803175135",
  appId: "1:792803175135:web:ef814905e32a7f464a176a",
  measurementId: "G-7N93LJ18DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;