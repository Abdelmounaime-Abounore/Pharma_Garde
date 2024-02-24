import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCmMPTZm81d2N4yZgGeVW56jmsz4L0gaHk",
    authDomain: "pharmagard-6fbd1.firebaseapp.com",
    projectId: "pharmagard-6fbd1",
    storageBucket: "pharmagard-6fbd1.appspot.com",
    messagingSenderId: "446484777618",
    appId: "1:446484777618:web:4f89ad8f7c839f53ccb44b",
    measurementId: "G-PTC5SH5WEC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// let auth = getAuth(app);


// if (!auth) {
//     auth = initializeAuth(app, {
//         persistence: getReactNativePersistence(AsyncStorage)
//     });
// }
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { db, auth, app };