import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const config = {
    apiKey: "AIzaSyDabDFj43JOHqjrHnHYGOVUMC4QJ2E8G3M",
    authDomain: "p-dcd-232512.firebaseapp.com",
    databaseURL: "https://p-dcd-232512.firebaseio.com",
    projectId: "p-dcd-232512",
    storageBucket: "p-dcd-232512.appspot.com",
    messagingSenderId: "968770586751"
  };

firebase.initializeApp(config);
firebase.firestore()
firebase.storage()

export default firebase