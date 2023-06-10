import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSDBwBj7et7qB8ZORDI6dGWJLK2IHosFo",
  authDomain: "whatsapp-2-2a8e0.firebaseapp.com",
  projectId: "whatsapp-2-2a8e0",
  storageBucket: "whatsapp-2-2a8e0.appspot.com",
  messagingSenderId: "969833060452",
  appId: "1:969833060452:web:af0fa7cd1b834e7ef92771",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
