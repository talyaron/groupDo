import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';
import { StartsCards } from './StartsCards';
import { Spiner } from '../Commons/Spiner';

import DB from '../../controls/firebaseConfig';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Starts = {
    oninit: function (vnode) {
        vnode.state = { cards: [] }
        DB.collection('groupActions').get().then((groupActionsDB) => {
            var cardsDB = [];
            groupActionsDB.forEach(groupAction => {
                cardsDB.push(groupAction.data());
            });
            vnode.state.cards = cardsDB;
            m.redraw();
        })
    },
    view: function (vnode) {
        return (
            <div class='main'>
                <div class='headers'>
                    <MainHeader />
                    <SubHeader selector='Starts' />
                </div>
                <div class='panel'>
                    <div class="row">
                        {
                            (vnode.state.cards.length == 0) ?
                                <Spiner /> :
                                <StartsCards cards={vnode.state.cards} />

                        }

                    </div>
                </div>

            </div>
        )
    }
}

var cards2 = [
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' },

]



