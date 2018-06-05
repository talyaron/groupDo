import { MainHeader } from '../Commons/MainHeader';
import { SubHeader } from '../Commons/SubHeader';
import { StartsCards } from './StartsCards';

import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Starts = {

    view: function (vnode) {
        return (
            <div class='main'>
                <div class='headers'>
                    <MainHeader />
                    <SubHeader selector='Starts' />
                </div>
                <div class='panel'>
                    <div class="row">
                        <StartsCards />
                    </div>
                </div>
                <div>Starts</div>
            </div>
        )
    }
}



