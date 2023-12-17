// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {  Firestore, getFirestore } from 'firebase/firestore';
import {  getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAXuhFUVXXgMJlfZbaJmfNGjVEBUdmmIzs',
  authDomain: 'vite-shop-de1c6.firebaseapp.com',
  projectId: 'vite-shop-de1c6',
  storageBucket: 'vite-shop-de1c6.appspot.com',
  messagingSenderId: '708037892402',
  appId: '1:708037892402:web:d3e912572517dab3a9df2b',
  measurementId: 'G-Q51DJDM529'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);