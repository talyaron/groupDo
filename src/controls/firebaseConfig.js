import firebase from "firebase/app";
import "firebase/firestore";



firebase.initializeApp({
    apiKey: "AIzaSyAjyyjWM63PSjyRoDI-87MpRtfOFnOO0aA",
    authDomain: "delib21-aaeb0.firebaseapp.com",
    databaseURL: "https://delib21-aaeb0.firebaseio.com",
    projectId: "delib21-aaeb0",
    storageBucket: "delib21-aaeb0.appspot.com",
    messagingSenderId: "845650714645"

});
var DB = firebase.firestore();
const settings = { timestampsInSnapshots: true };
DB.settings(settings);


export default DB;
