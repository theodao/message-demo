import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB-bqQmY3xJt7E7hAKF-Xhj7CCrTEcEYLU",
  authDomain: "message-app-d4995.firebaseapp.com",
  databaseURL: "https://message-app-d4995.firebaseio.com",
  projectId: "message-app-d4995",
  storageBucket: "message-app-d4995.appspot.com",
  messagingSenderId: "689360220928",
  appId: "1:689360220928:web:03eb36059514e8d9d3b9e5",
  measurementId: "G-7XRBGKXXQG",
};

export default firebase.initializeApp(firebaseConfig);
firebase.analytics();
