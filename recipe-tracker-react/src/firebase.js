// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import {getStorage} from 'firebase/storage';
import {getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


//amirthanatarajan14@gmail.com
// const firebaseConfig = {
//   apiKey: "AIzaSyA0eSmLWQEFXnx30eq2-rApOvnuWOhpfeQ",
//   authDomain: "react-recipe-tracker.firebaseapp.com",
//   projectId: "react-recipe-tracker",
//   storageBucket: "react-recipe-tracker.appspot.com",
//   messagingSenderId: "61711308434",
//   appId: "1:61711308434:web:2d7ca2ccab97e0b1a8384b"
// };

// amirthammu1428@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyBT-oIMPwUmsPCutQ4vvuCNALSPMYQsK2A",
  authDomain: "recipe-tracker-images-6e7a7.firebaseapp.com",
  projectId: "recipe-tracker-images-6e7a7",
  storageBucket: "recipe-tracker-images-6e7a7.appspot.com",
  messagingSenderId: "667152686896",
  appId: "1:667152686896:web:079a993f99ecf7a000f2f5"
};




// Initialize Firebase

const app =firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;
export const db=firebase.firestore()
export const imagesDb=getStorage(app)
// const analytics=firebase.analytics()