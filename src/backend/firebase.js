// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEjPx5NA1XwKK76xq9t1Jqka5vuGynPKQ",
  authDomain: "vehiculos-42293.firebaseapp.com",
  projectId: "vehiculos-42293",
  storageBucket: "vehiculos-42293.appspot.com",
  messagingSenderId: "986983700951",
  appId: "1:986983700951:web:0efdf539a394e109355392"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

