import firebase from "firebase/app";
import "firebase/database";

firebase.initializeApp({
    apiKey: "AIzaSyB9WWEP32uiDLC01nwGYrsUak-Tg96-l6M",
    authDomain: "votewiz.firebaseapp.com",
    databaseURL: "https://votewiz.firebaseio.com",
    projectId: "votewiz",
    storageBucket: "votewiz.appspot.com",
    messagingSenderId: "315314502868"
});
var DB = firebase.database().ref();


export default DB;
