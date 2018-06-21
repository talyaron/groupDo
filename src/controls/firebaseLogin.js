import firebase from 'firebase/app';
import 'firebase/auth';

import DB from './firebaseConfig';

import store from '../data/store'


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('User is signed in.')

        store.user = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous
        };

        DB.collection('users').doc(user.uid).update(store.user).then(function () {
            console.log('user updated')
        }).catch(function (error) {
            DB.collection('users').doc(user.uid).set(store.user)
        })


    } else {

        console.log('User is signed out')

    }

});