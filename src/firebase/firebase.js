//mport fb from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, remove } from "firebase/database";
import * as firebase from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  };

/*const app = */initializeApp(firebaseConfig);
const database = firebase.getDatabase();

export { firebase, database as default };