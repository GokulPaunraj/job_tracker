import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDQM0gw2xePV89KaqMC6tDOnwZbm1Hn5DE",
  authDomain: "job-tracker-d1d1d.firebaseapp.com",
  projectId: "job-tracker-d1d1d",
  storageBucket: "job-tracker-d1d1d.firebasestorage.app",
  messagingSenderId: "75378110395",
  appId: "1:75378110395:web:a66ee50840dafadae2de9e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export {auth, googleAuthProvider}