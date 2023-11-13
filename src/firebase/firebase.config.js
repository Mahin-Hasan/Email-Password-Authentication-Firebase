// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT7oMZSh0cF53StrrZcA1vX8xZSZKBPVk",
  authDomain: "email-password-auth-25caf.firebaseapp.com",
  projectId: "email-password-auth-25caf",
  storageBucket: "email-password-auth-25caf.appspot.com",
  messagingSenderId: "145970071182",
  appId: "1:145970071182:web:cfb317d250abc385ca2bdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;