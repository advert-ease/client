// import { initializeApp } from "firebase/app";

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyD5-e4ZW7ZupkumHMwmB-8_9M5AQeRdlHY",
  authDomain: "pi-bla-try.firebaseapp.com",
  databaseURL: "https://pi-bla-try-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pi-bla-try",
  storageBucket: "pi-bla-try.appspot.com",
  messagingSenderId: "104175823542",
  appId: "1:104175823542:web:8fad0e5255d5fca4f4d417"
};
firebase.initializeApp(firebaseConfig);
// const db = getDatabase(app)
   export default firebase
  // export default db;