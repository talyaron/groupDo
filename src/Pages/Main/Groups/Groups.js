import { MainHeader } from '../../Commons/MainHeader';
import { SubHeader } from '../../Commons/SubHeader';
import { GroupCards } from './GroupsCards';

import './Groups.css';

import DB from '../../../controls/firebaseConfig';
import store from '../../../data/store';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Groups = {
    oninit: function (vnode) {
        vnode.state = { cards: store.groups }
        DB.collection('groups').get().then((groupsDB) => {
            var cardsDB = [];
            groupsDB.forEach(groupDB => {
                var group = {};
                group.id = groupDB.id;
                group.name = groupDB.data().name || 'ללא שם';
                group.description = groupDB.data().description || 'ללא תאור';
                group.img = groupDB.data().img || '';
                cardsDB.push(group);
            });
            vnode.state.cards = cardsDB;
            store.groups = cardsDB;
            m.redraw();
        })
    },
    view: function (vnode) {
        return (
            <div class='main'>
                <div class='headers'>
                    <MainHeader />
                    <SubHeader selector='Groups' />
                </div>
                <div class='panel'>
                    <div class="row">
                        <GroupCards cards={vnode.state.cards} />
                    </div>
                </div>
            </div>
        )
    }
}

var cards2 = [
    { name: 'group 1' },
    { name: 'group 2' },
    { name: 'group 3' },

]
