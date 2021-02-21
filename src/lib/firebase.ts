import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0X2e3lsZLYagvDYSEQlwdxNg8YkLxZNc",
  authDomain: "firechat-7beaf.firebaseapp.com",
  databaseURL: "https://firechat-7beaf-default-rtdb.firebaseio.com",
  projectId: "firechat-7beaf",
  storageBucket: "firechat-7beaf.appspot.com",
  messagingSenderId: "46363183096",
  appId: "1:46363183096:web:f794847a95638bf068f80d",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
