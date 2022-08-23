import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Import the varaibles
import {API, AUTH, PROJ, STOR, MESS, APP, MEAS} from './firebase-variables';
const firebaseConfig = {
    apiKey: API,
    authDomain: AUTH,
    projectId: PROJ,
    storageBucket: STOR,
    messagingSenderId: MESS,
    appId: APP,
    measurementId: MEAS
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();