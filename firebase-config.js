// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDQixsvtvIjhuNFpr2QsEEHlGBPqw9rx8",
  authDomain: "viai-9171a.firebaseapp.com",
  projectId: "viai-9171a",
  storageBucket: "viai-9171a.firebasestorage.app",
  messagingSenderId: "929882544174",
  appId: "1:929882544174:web:459e0b7f9b35700d0c67bf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
