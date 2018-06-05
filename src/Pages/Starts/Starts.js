import { MainHeader } from '../Commons/MainHeader';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Starts = {

    view: function (vnode) {
        return (
            <div class='main'>
                <MainHeader />
                <div>Starts</div>
            </div>
        )
    }
}



