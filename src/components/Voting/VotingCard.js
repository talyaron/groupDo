
import m from 'mithril';
import _ from 'lodash';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import { Plus } from '../Selection/Card/Plus';


import 'materialize-css/dist/css/materialize.css';
// import M from 'materialize-css/dist/js/materialize';

export var VotingCard = {
    oninit: function (vnode) {
        vnode.state = { showVoters: false, choose: 'none', against: 'rgb(232, 232, 232)', for: 'rgb(232, 232, 232)' }

    },
    view: function (vnode) {

        return [
            vnode.attrs.options.map(function (option, i) {

                var colorAgainst = vnode.state.against;
                var colorFor = vnode.state.for;

                if (option.userAgainst) { colorAgainst = '#FFA69E' }
                if (option.userFor) { colorFor = '#84DCC6' }

                return (
                    <div class="card col s6 m4 l3" key={i} id={option.id + 'Card'}>
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator imgShow" src={option.src} />
                        </div>
                        <div class="">
                            <table >
                                <tr>
                                    <td class='votingTd' onclick={(event) => { voteToggle(event, option.id, 'against') }}>
                                        <Plus color={colorAgainst} buttonType='against' />
                                        <p>{option.votersAgainst}</p>
                                    </td>
                                    <td class='votingTd'></td>
                                    <td class='votingTd'
                                        onclick={(event) => { voteToggle(event, option.id, 'for') }}>
                                        <Plus color={colorFor} buttonType='for' />
                                        <p>{option.votersFor}</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="card-reveal" style='direction:rtl'>
                            <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>פרטים נוספים על הפריט</span>
                            <p>הפניה לפריט בחנות</p>
                        </div>
                    </div>
                )
            })
        ]
    }
}

function voteToggle(event, imgId, forAgainst) {

    var optionLocation = _.findIndex(store.options, function (o) { return o.id === imgId });
    if (forAgainst == 'for') {
        //if user pressed "for"

        if (store.options[optionLocation].userFor) {
            //and the button was set to "for" then remove "for" from DB and from store
            store.options[optionLocation].userFor = false;
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).remove();
        } else {
            //if the button was not set, then set button to 'for' and db to 'for'
            store.options[optionLocation].userFor = true;
            store.options[optionLocation].userAgainst = false;
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).set(true);
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).remove();
        }
    } else {
        //if user pressed 'against'
        if (store.options[optionLocation].userAgainst) {
            //and the button was set to "against" then remove "against" from DB and from store
            store.options[optionLocation].userAgainst = false;
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).remove();
        } else {
            //if the button was not set, then set button to 'against' and db to 'against'
            store.options[optionLocation].userFor = false;
            store.options[optionLocation].userAgainst = true;
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).remove();
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).set(true);
        }
    }


}