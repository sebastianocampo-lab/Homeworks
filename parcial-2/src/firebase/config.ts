import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//Datos con las que enlace a la BD de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC1vrZCJ40Bj7eHQX1VRFSAmSbpxWD-Gt4',
  authDomain: 'parcial2-a59ad.firebaseapp.com',
  projectId: 'parcial2-a59ad',
  storageBucket: 'parcial2-a59ad.firebasestorage.app',
  messagingSenderId: '8928958028',
  appId: '1:8928958028:web:22eebe4e953389441846e9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };