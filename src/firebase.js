import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyAexBWyiborPDEbvoEgdnJad6zmrLfjvpE",
    authDomain: "basic-authentication-a33f9.firebaseapp.com",
    projectId: "basic-authentication-a33f9",
    storageBucket: "basic-authentication-a33f9.appspot.com",
    messagingSenderId: "577931772031", 
    appId: "1:577931772031:web:dc857af4d09e485de33f4a"

});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;