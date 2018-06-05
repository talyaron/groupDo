import { MainHeader } from '../Commons/MainHeader';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Groups = {

    view: function (vnode) {
        return (
            <div class='main'>
                <MainHeader />
                <div>Groups</div>
            </div>
        )
    }
}
