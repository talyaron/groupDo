import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';

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
                <div>Public</div>
            </div >
        )
    }
}
