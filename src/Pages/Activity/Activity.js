import './Activity.css';
import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';

export const Activity = {
    oninit: function (vnode) {
        vnode.state = {
            id: '',
            name: ''
        }
        vnode.state.id = vnode.attrs.id;

        //get from DB activity details
        vnode.state.unsubscribe = DB.collection('groupActions')
            .doc(vnode.state.id)
            .onSnapshot(function (doc) {
                vnode.state.name = doc.data().name || 'אין שם לפעילות';
                vnode.state.description = doc.data().description || 'אין הסבר על הפעילות'
                m.redraw();
            });


    },
    onremove: function (vnode) {
        vnode.state.unsubscribe();
    },
    view: function (vnode) {
        return (
            <div class='main'>
                <div
                    class='headers activityHeader'
                    onclick={() => { m.route.set('/groups') }}
                >
                    <table><tr><td class='activityHeaderTd'>
                        <i class="material-icons menuIcons">
                            merge_type
                            </i>
                        <span>{vnode.state.name}</span>
                    </td></tr></table>
                </div>
                <div class='panel'>
                    <div class='labels'>תאור</div>
                    <div class='simpleText'>{vnode.state.description}</div>
                </div>


            </div>
        )
    }
}