import firebase from 'firebase/app';
import 'firebase/auth';

import DB from './firebaseConfig';

import store from '../data/store'

// firebase.auth().signInAnonymously().catch(function (error) {
//     // Handle Errors here.
//     console.error(error.code);
//     console.error(error.message);

// });

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('User is signed in.')
        console.dir(user)
        // store.user.isAnonymous = user.isAnonymous;
        store.user = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,

        };

        console.dir(store.user)

    } else {

        console.log('User is signed out')

    }

});