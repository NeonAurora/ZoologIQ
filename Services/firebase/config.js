import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDT_zBxYzBft9orH5L7BqO9hpogPvD_o90",
    authDomain: "zoologiq-dd4e6.firebaseapp.com",
    projectId: "zoologiq-dd4e6",
    storageBucket: "zoologiq-dd4e6.firebasestorage.app",
    messagingSenderId: "614813104230",
    appId: "1:614813104230:web:4145ad0e1c5440e3af95a7",
    measurementId: "G-FJDWQNDYXK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };