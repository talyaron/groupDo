import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Starts = {

    view: function (vnode) {
        return (
            <div class='main'>
                <MainHeader />
                <SubHeader selector='Starts' />
                <div>Starts</div>
            </div>
        )
    }
}



