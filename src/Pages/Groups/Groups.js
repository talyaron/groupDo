import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';
import { GroupCards } from './GroupsCards';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Groups = {

    view: function (vnode) {
        return (
            <div class='main'>
                <div class='headers'>
                    <MainHeader />
                    <SubHeader selector='Groups' />
                </div>
                <div class='panel'>
                    <div class="row">
                        <GroupCards cards={cards2} />
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
