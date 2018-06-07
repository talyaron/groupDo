import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css';
import './Login.css'
import store from '../../data/store';

export const Login = {
    oncreate: function () {
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    console.dir(authResult)
                    store.user = {
                        displayName: authResult.displayName,
                        email: authResult.email,
                        uid: authResult.uid,
                        photoURL: authResult.photoURL
                    }
                    window.sessionStorage.setItem('user', JSON.stringify(store.user));
                    return true;
                },
                uiShown: function () {

                    document.getElementById('loader').style.display = 'none';
                }
            },

            signInFlow: 'popup',
            signInSuccessUrl: store.lastUrl || '/groups',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);

    },
    view: function () {
        return (
            <div>
                <div class='loginHeader'>אנא התחברו</div>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        )
    }
}