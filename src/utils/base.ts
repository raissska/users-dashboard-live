import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBC6Jb55-yxYFkB8TR9IBGQGqk7UDbKxTE",
  authDomain: "live-users-dashboard.firebaseapp.com",
  projectId: "live-users-dashboard",
  storageBucket: "live-users-dashboard.appspot.com",
  messagingSenderId: "200868547019",
  appId: "1:200868547019:web:372c5718e0bad8fd960e4e",
  measurementId: "G-P1QZWQPSSR"
});

export default app;