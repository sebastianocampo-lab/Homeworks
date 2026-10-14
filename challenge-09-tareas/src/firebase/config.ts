import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// estos datos salen de la consola de firebase, en configuracion del proyecto
const firebaseConfig = {
  apiKey: 'AIzaSyDqe_29JXf7SyMQzuOPKxyTvJsgn8-DPp4',
  authDomain: 'challenge-09-66079.firebaseapp.com',
  projectId: 'challenge-09-66079',
  storageBucket: 'challenge-09-66079.firebasestorage.app',
  messagingSenderId: '132037771024',
  appId: '1:132037771024:web:4fedd72fd27a5211042f95',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };