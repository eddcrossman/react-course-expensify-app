import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBLWxns3Iti4P4Y3r_61iCSQT0q937MFlk",
    authDomain: "expensify-c02d5.firebaseapp.com",
    databaseURL: "https://expensify-c02d5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "expensify-c02d5",
    storageBucket: "expensify-c02d5.appspot.com",
    messagingSenderId: "721223660824",
    appId: "1:721223660824:web:063f04c772f44d51f61a6d",
    measurementId: "G-K5BJXY58E1"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  set(ref(db), {
    username: 'Aravind Merugu',
  });

//   firebase.initializeApp(firebaseConfig);

// export const db = getDatabase();
// export const googleAuthProvider = new GoogleAuthProvider();

// console.log('hello');

//   firebase.database().ref().set({
//     name: 'Edward John'
//   });