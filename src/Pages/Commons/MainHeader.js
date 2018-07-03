import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';
import './mainHeader.css'

import firebase from 'firebase/app';
import 'firebase/auth';


export const MainHeader = {

    view: function (vnode) {
        return (
            <div class='mainHeader'>
                <i
                    class='material-icons signOut'
                    onclick={() => { signOut() }}
                >more_vert</i>
                תכל'ס: עשיה קהילתית
                </div>
        )
    }
}

function signOut() {
    firebase.auth().signOut().then(function () {
        console.log('Signed Out');
    }, function (error) {
        console.error('Sign Out Error', error);
    });
}
