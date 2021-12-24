import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAVyqozYdvmaqt5SNNBrhrXYeIQN21IGno",
  authDomain: "react-login-app-67a65.firebaseapp.com",
  projectId: "react-login-app-67a65",
  storageBucket: "react-login-app-67a65.appspot.com",
  messagingSenderId: "541063832235",
  appId: "1:541063832235:web:e6383ee296b31ab73acdee"
};
  
  // Initialize Firebase
  const fire_b = firebase.initializeApp(firebaseConfig);

  export default fire_b;