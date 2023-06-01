import { initializeApp } from "firebase/app";
import * as firebase from "firebase/database";
import * as authInterface from "firebase/auth"

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

initializeApp(firebaseConfig);
const database = firebase.getDatabase();
const authInstance = authInterface.getAuth();
const googleAuthProvider = new authInterface.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ 'prompt': 'select_account' });

export { firebase, authInterface, authInstance, googleAuthProvider, database as default };