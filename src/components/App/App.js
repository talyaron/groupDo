import "./App.scss";
import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBW4Ty8cdaUGohEbBwXkoPGe_fh_yDz5zM",
  authDomain: "delibtests.firebaseapp.com",
  databaseURL: "https://delibtests.firebaseio.com",
  projectId: "delibtests",
  storageBucket: "delibtests.appspot.com",
  messagingSenderId: "612739213308"

});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();



let count = 0;

const increment = () => {
  count++;
};

export const App = {
  oninit: () => {
    db.collection("users").doc("me")
      .onSnapshot(function (doc) {
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(" data: ", doc.data());
      })

  },
  view: function () {
    return [
      m("main", { class: "app" }, [
        m("img", { src: "static/img/logo.svg" }),
        m("h1", { class: "title" }, "My Mithril app"),
        m("p", [
          m("a", { href: "http://mithril.js.org" }, "Mithril"),
          "is a modern client-side Javascript framework for building Single Page Applications.",
          "It's small, fast and provides routing and XHR utilities out of the box."
        ]),
        m("button", { onclick: increment }, "Click to increment count"),
        m("p", `Count: ${count}`)
      ])
    ];
  }
};
