// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTUFIrmCZd3dQK5u69CIiH0DKmASMKrEU",
  authDomain: "recipe-tracker-1c09c.firebaseapp.com",
  projectId: "recipe-tracker-1c09c",
  storageBucket: "recipe-tracker-1c09c.appspot.com",
  messagingSenderId: "508777283868",
  appId: "1:508777283868:web:fec8b4ab865e7bfa627ad9"
};

// Initialize Firebase

const app =firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;
export const db=firebase.firestore()
export const imagesDb=getStorage(app)