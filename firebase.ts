import { getApp, getApps, initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3bzcATgUTVaHPLCj6sWvOIgbA2RZnNLA",
  authDomain: "appotech-61b2f.firebaseapp.com",
  projectId: "appotech-61b2f",
  storageBucket: "appotech-61b2f.firebasestorage.app",
  messagingSenderId: "763753065127",
  appId: "1:763753065127:web:64b53cfdd0e75b02f10982",
  measurementId: "G-L0Y5RWDSSS",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey:
          "BNVcJQkInKe6VZZVTuie2ZEnwDnnD6kHKiJmDijSJ3wLaEqhZaKOfIE_VYN4M8BSFdr-XrQPr4V4pYy0XdFKVKI",
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
