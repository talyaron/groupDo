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

        //get all chats that the user listen for
        DB.collection('users').doc(store.user.uid).collection('chats').onSnapshot((chatsDB) => {
            chatsDB.forEach(chatDB => {
                DB.collection('groupActions').doc(chatDB.data().activityId)
                    .collection(chatDB.data().chatType)
                    .where('timeMill', '>', chatDB.data().lastTime)
                    .limit(10)
                    .onSnapshot(lastMessagesDB => {
                        var chatObj = {};
                        var activityId = chatDB.data().activityId;
                        var chatType = chatDB.data().chatType;
                        chatObj[chatType] = lastMessagesDB.size;
                        store.chats[activityId] = chatObj
                        m.redraw();
                    })
            })
        })


    } else {

        console.log('User is signed out')

    }

});