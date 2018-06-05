import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';

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
                <div>Groups</div>
            </div>
        )
    }
}
