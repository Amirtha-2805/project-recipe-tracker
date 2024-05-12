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

//amirtha142805@gmail.com
// const firebaseConfig = {
//   apiKey: "AIzaSyDTUFIrmCZd3dQK5u69CIiH0DKmASMKrEU",
//   authDomain: "recipe-tracker-1c09c.firebaseapp.com",
//   projectId: "recipe-tracker-1c09c",
//   storageBucket: "recipe-tracker-1c09c.appspot.com",
//   messagingSenderId: "508777283868",
//   appId: "1:508777283868:web:fec8b4ab865e7bfa627ad9"
// };

//amirthanatarajan14@gmail.com
// const firebaseConfig = {
//   apiKey: "AIzaSyA0eSmLWQEFXnx30eq2-rApOvnuWOhpfeQ",
//   authDomain: "react-recipe-tracker.firebaseapp.com",
//   projectId: "react-recipe-tracker",
//   storageBucket: "react-recipe-tracker.appspot.com",
//   messagingSenderId: "61711308434",
//   appId: "1:61711308434:web:2d7ca2ccab97e0b1a8384b"
// };


//amirtha1428@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyBAUKBtuAYD55RX5ZJJfTMbO3QjtANRTaI",
  authDomain: "recipe-tracker-9a973.firebaseapp.com",
  projectId: "recipe-tracker-9a973",
  storageBucket: "recipe-tracker-9a973.appspot.com",
  messagingSenderId: "201657213588",
  appId: "1:201657213588:web:2e8699675f8f0b2435ca81"
};



// Initialize Firebase

const app =firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;
export const db=firebase.firestore()
export const imagesDb=getStorage(app)
// const analytics=firebase.analytics()