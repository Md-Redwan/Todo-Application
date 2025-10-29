// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGoyjyV9btS6GomFNdrqIItQys6l6akdw",
  authDomain: "todo-application-7e210.firebaseapp.com",
  projectId: "todo-application-7e210",
  storageBucket: "todo-application-7e210.firebasestorage.app",
  messagingSenderId: "100266301591",
  appId: "1:100266301591:web:b2a6b21e6b8f6ff5cd31d2",
  measurementId: "G-TGKYE55HM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;