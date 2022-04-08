// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDktdJc25rybKNFnkV6QDccP9KTDnTWLsQ",
    authDomain: "simple-auth-prac.firebaseapp.com",
    projectId: "simple-auth-prac",
    storageBucket: "simple-auth-prac.appspot.com",
    messagingSenderId: "331746202829",
    appId: "1:331746202829:web:3002b2794606f3ecb90584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;