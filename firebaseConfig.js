import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Check if Firebase app is already initialized to avoid re-initialization error
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase has been initialized');
} else {
  console.log('Firebase app already initialized');
}

export default firebase;
