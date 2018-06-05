import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';
import { PublicCards } from './PublicCards';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Public = {

    view: function (vnode) {
        return (
            <div class='main'>
                <div class='headers'>
                    <MainHeader />
                    <SubHeader selector='Public' />
                </div>
                <div class='panel'>
                    <div class="row">
                        <PublicCards cards={cards2} />
                    </div>
                </div>
            </div >
        )
    }
}

var cards2 = [
    { name: 'public 1' },
    { name: 'public 2' },
    { name: 'public 3' },

]
