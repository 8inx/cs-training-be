import { initializeApp } from 'firebase/app';
import { getDatabase, } from 'firebase/database';
import config from 'config';

const firebaseKey = config.get('firebaseKey');
const firebaseProjectId = config.get('firebaseProjectId');
const firebaseAuthDomain = config.get('firebaseAuthDomain');
const firebaseStorageBucket = config.get('firebaseStorageBucket');
const firebaseMessengerId = config.get('firebaseMessengerId');
const firebaseAppId = config.get('firebaseAppId');
const firebaseDbUrl = config.get('firebaseDbUrl');

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: firebaseProjectId,
  projectId: firebaseAuthDomain,
  storageBucket:firebaseStorageBucket,
  messagingSenderId: firebaseMessengerId,
  appId: firebaseAppId,
  databaseURL: firebaseDbUrl,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;