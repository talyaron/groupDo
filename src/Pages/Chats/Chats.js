import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';
import { ChatsCards } from './ChatsCards';

import './Chats.css';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Chats = {
    oninit: function (vnode) {
        vnode.state = { cards: store.groups }
        DB.collection('groups').get().then((groupsDB) => {
            var cardsDB = [];
            groupsDB.forEach(groupDB => {
                var group = {};
                group.id = groupDB.id;
                group.name = groupDB.data().name || 'ללא שם';
                group.description = groupDB.data().description || 'ללא תאור'
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
                    <SubHeader selector='Chat' />
                </div>
                <div class='panel'>
                    <div class="row">
                        {/* <ChatsCards cards={vnode.state.cards} /> */}
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
