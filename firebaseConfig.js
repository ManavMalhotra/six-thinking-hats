// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import auth from "@react-native-firebase/auth"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXiGP-DT4VWi0KapO8bl-iQhWaVDqFSwc",
  authDomain: "six-thinking-hats-f7c30.firebaseapp.com",
  projectId: "six-thinking-hats-f7c30",
  storageBucket: "six-thinking-hats-f7c30.appspot.com",
  messagingSenderId: "20463026653",
  appId: "1:20463026653:web:58f62df270ec837771b634",
  measurementId: "G-WJHSN5NYHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);