
import { MainHeader } from '../Commons/MainHeader';
import './Group.css';
import { StartsCards } from '../Main/Starts/StartsCards';

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
                desciription: '',
                actions: []
            }
        };

        //get form store
        vnode.state.group = store.current.group;
        console.log('init group:', vnode.state.group)

        //get group id from attrs
        vnode.state.group.id = vnode.attrs.id;
        DB.collection('groups').doc(vnode.state.group.id).get().then(groupDB => {
            if (groupDB.exists) {
                vnode.state.group = {
                    name: groupDB.data().name,
                    description: groupDB.data().description
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            m.redraw();
        })

        //get group-activities of the group.

        DB.collection('groupActions')
            .where('groupId', '==', vnode.state.group.id)
            .get()
            .then(groupActivitiesDB => {

                var groupActionsDB = groupActivitiesDB.docs;

                //get group-actions details
                var groupActionsId = [];
                groupActionsDB.forEach(groupActionDB => {

                    groupActionsId.push(groupActionDB.data());

                })
                vnode.state.group.actions = groupActionsId;
                m.redraw();
                // store.current.group.groupActions = 
            })
    },
    onremove: function () {
        store.current.group = {}
    },
    view: function (vnode) {
        console.dir(vnode.state.group)
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
                    <p class='labels'>תאור</p>
                    <p class='simpleText'>{vnode.state.group.description}</p>
                    <p class='labels'>פעולות</p>
                    <div class="row">
                        <StartsCards cards={vnode.state.group.actions} />
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
