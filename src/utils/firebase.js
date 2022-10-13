import { initializeApp } from 'firebase/app';
import { getDatabase, } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDs-aG6vQzI-AIJNX8lACwAjGpS9AZCqSU",
  authDomain: "cs-training-131bb.firebaseapp.com",
  projectId: "cs-training-131bb",
  storageBucket: "cs-training-131bb.appspot.com",
  messagingSenderId: "1066003116917",
  appId: "1:1066003116917:web:ea071ac1fe2631cf27993c",
  databaseURL: 'https://cs-training-131bb-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;