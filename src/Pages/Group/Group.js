
import { MainHeader } from '../Commons/MainHeader';
import './Group.css';
// import { GroupCards } from './PublicCards';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Group = {
    oninit: function (vnode) {

        vnode.state = {
            group: {
                name: '',
                id: '',
                desciription: ''
            }
        };

        //get form store
        vnode.state.group = store.current.group;

        //get group id from attrs
        vnode.state.group.id = vnode.attrs.id;
        DB.collection('groups').doc(vnode.state.group.id).get().then(groupDB => {
            if (groupDB.exists) {
                vnode.state.group.name = groupDB.data().name;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            m.redraw();
        })

    },
    onremove: function () {
        store.current.group = {}
    },
    view: function (vnode) {
        return (
            <div class='main'>
                <div
                    class='headers groupHeader'
                    onclick={() => { m.route.set('/groups') }}
                >
                    <MainHeader />
                    <div class='groupSubHeader'>קבוצה: {vnode.state.group.name}</div>
                </div>
                <div class='panel'>
                    <div class="row">
                        {/* <PublicCards cards={cards2} /> */}
                    </div>
                </div>
            </div >
        )
    }
}

// var cards2 = [
//     { name: 'public 1' },
//     { name: 'public 2' },
//     { name: 'public 3' },

// ]
