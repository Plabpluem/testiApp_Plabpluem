// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV91wvED_JIqh_Mc1QR7-nm0PRdj8xjEw",
  authDomain: "testiapp-e3f4c.firebaseapp.com",
  projectId: "testiapp-e3f4c",
  storageBucket: "testiapp-e3f4c.appspot.com",
  messagingSenderId: "682716260455",
  appId: "1:682716260455:web:4d6c948ea7b332e0628cc2",
  measurementId: "G-Z7R8HB198Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default app