import  admin from 'firebase-admin';
import signInWithEmailAndPassword from 'firebase-auth';
import {myReadFile} from './utils.js'

var serviceAccount = JSON.parse(myReadFile('./credentials.json'));
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inazuma-967fa.firebaseio.com",
};

admin.initializeApp(firebaseConfig);

export {admin, signInWithEmailAndPassword}