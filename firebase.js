import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuF4ebm6FGQCP1Iekppq7epl0Wm1db7Eg",
    authDomain: "chat-a471a.firebaseapp.com",
    projectId: "chat-a471a",
    storageBucket: "chat-a471a.appspot.com",
    messagingSenderId: "461932807946",
    appId: "1:461932807946:web:ae4c219e1633af7bc75cf3",
    measurementId: "G-MRJVM2W9R4"
  };
  const app =!firebase.apps.length ? firebase.initializeApp(firebaseConfig) :firebase.app();
  const db = firebase.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,auth,provider};
