import m from 'mithril';
import _ from 'lodash';
import 'firebase/firestore';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import './Voting.css';
import { Header } from '../Common/Header'
import { Menu } from './Menu';
import { VotingCard } from './VotingCard'
import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';


export const Voting = {
    oninit: function (vnode) {

        vnode.state = { toAnimate: false };

        //listen to number of voters in invitation
        DB.child('invitations/sjdfhskjhf/voters').on('value', function (votersDB) {

            store.votersNumber = votersDB.numChildren();

            for (var i = 0; i < store.options.length; i++) {

                var percent = Math.round((store.options[i].votersNumber / store.votersNumber) * 100)
                DB.child('invitations/sjdfhskjhf/options/' + store.options[i].id + '/percent').set(percent);

            }
            m.redraw();
        })


        //get options
        DB.child('invitations/sjdfhskjhf/options').once('value', function (optionsDB) {
            var options = [];
            optionsDB.forEach(function (optionDB) {

                //see if the user voted and how
                var votersDB = optionDB.val().voters;

                var userFor = false;
                var userAgainst = false;

                //get votes if sombody voted
                if (votersDB != undefined) {
                    if (votersDB.for) {
                        if (votersDB.for[store.user.uid] != undefined) {
                            userFor = true;
                        }
                    }

                    if (votersDB.against) {
                        if (votersDB.against[store.user.uid] != undefined) {
                            userAgainst = true;
                        }
                    }
                }


                //update options
                options.push({
                    src: optionDB.val().src,
                    percent: optionDB.val().percent,
                    id: optionDB.key,
                    userFor: userFor,
                    userAgainst: userAgainst
                })

                //listen to each option percent
                DB.child('invitations/sjdfhskjhf/options/' + optionDB.key + '/percent')
                    .on('value', function (percentDB) {
                        var oldOptions = store.options;
                        var newOptions = [];

                        var optionLocation = _.findIndex(store.options, function (o) { return o.id === optionDB.key });
                        store.options[optionLocation].percent = percentDB.val();
                        // newOptions = store.options;

                        newOptions = _.orderBy(store.options, 'percent', 'desc');

                        //check change in order...
                        vnode.state.toAnimate = false;

                        for (var i = 0; i < oldOptions.length; i++) {
                            if (oldOptions[i].id !== newOptions[i].id) {
                                vnode.state.toAnimate = true;
                                break;
                            }
                        }
                        //if toAnimate then get old positions
                        if (vnode.state.toAnimate) {
                            for (var i = 0; i < oldOptions.length; i++) {
                                var cardId = oldOptions[i].id + 'Card';
                                var cardElement = document.getElementById(cardId);
                                var optionPositionY = cardElement.offsetTop;
                                var optionPositionX = cardElement.offsetLeft;
                                store.optionsPositionY[oldOptions[i].id] = optionPositionY;
                                store.optionsPositionX[oldOptions[i].id] = optionPositionX;

                            }


                        }

                        store.options = _.orderBy(store.options, 'percent', 'desc');
                        m.redraw();

                    })

                //listen to each option for-voters and update percent
                DB.child('invitations/sjdfhskjhf/options/' + optionDB.key + '/voters/for').on('value', function (votersForDB) {

                    var optionLocation = _.findIndex(store.options, function (o) { return o.id === optionDB.key });
                    var percent = 0;

                    if (store.votersNumber > 0) {

                        percent = votersForDB.numChildren() - store.options[optionLocation].votersAgainst || 0;
                    }

                    store.options[optionLocation].votersFor = votersForDB.numChildren();
                    DB.child('invitations/sjdfhskjhf/options/' + optionDB.key + '/percent').set(percent);

                })

                //listen to each option against-voters and update percent
                DB.child('invitations/sjdfhskjhf/options/' + optionDB.key + '/voters/against').on('value', function (votersAgainstDB) {

                    var optionLocation = _.findIndex(store.options, function (o) { return o.id === optionDB.key });
                    var percent = 0;

                    if (store.votersNumber > 0) {

                        percent = (store.options[optionLocation].votersFor || 0) - votersAgainstDB.numChildren();
                    }

                    store.options[optionLocation].votersAgainst = votersAgainstDB.numChildren();
                    DB.child('invitations/sjdfhskjhf/options/' + optionDB.key + '/percent').set(percent);

                })
            })

            store.options = options;
            store.options = _.orderBy(store.options, 'percent', 'desc');

            m.redraw();
        })



    },
    onremove: function (vnode) {

        //turn off listners


        //listen to number of voters in invitation
        DB.child('invitations/sjdfhskjhf/voters').off('value')

        for (var i = 0; i < store.options.length; i++) {
            //turn off listening to each option percent
            DB.child('invitations/sjdfhskjhf/options/' + store.options[i].id + '/percent').off('value')

            //turn off listening listen to each option voters
            DB.child('invitations/sjdfhskjhf/options/' + store.options[i].id + '/voters/for').off('value')
            DB.child('invitations/sjdfhskjhf/options/' + store.options[i].id + '/voters/against').off('value')
        }

    },
    onupdate: function (vnode) {

        //get new positions
        if (vnode.state.toAnimate) {

            for (var i = 0; i < store.options.length; i++) {
                var cardId = store.options[i].id + 'Card';

                var cardElement = document.getElementById(cardId)
                var optionPositionY = cardElement.offsetTop;
                var optionPositionX = cardElement.offsetLeft;

                store.optionsPositionYNew[store.options[i].id] = optionPositionY;
                store.optionsPositionXNew[store.options[i].id] = optionPositionX;
                var moveToStartY = store.optionsPositionYNew[store.options[i].id] - store.optionsPositionY[store.options[i].id];
                var moveToStartX = store.optionsPositionXNew[store.options[i].id] - store.optionsPositionX[store.options[i].id];

                //if there is a move in Y or X... move to Y or X position before update
                var isToAnimateCards = false;
                if (moveToStartY != 0 || moveToStartX != 0) {

                    cardElement.style.transition = 'none';
                    cardElement.style.transform = 'translate(' + (-1 * moveToStartX) + 'px,' + (-1 * moveToStartY) + 'px)';

                    setTimeout(animateCards, 400);

                }




            }

        }

    },
    view: function (vnode) {
        return (
            <div class='containerMain votingContainer'>
                <div class='mainVotingPanel'>
                    <div class='numberOfVoters'>הצביעו עד כה: {store.votersNumber}</div>
                    <div class='container'>
                        <div class='row'>
                            <VotingCard options={store.options} />
                        </div>
                    </div>
                </div>
                <div class='votingHeader'>
                    <Header />
                    <div class='subHeader'>בר מבקשת ממך לעזור לה לבחור פריט לבוש</div>
                </div>
                <div class='votingFooter'>
                    <a
                        class="waves-effect waves-light btn black votingFooterButton"
                        href='https://www.terminalx.com/'
                        target='_blank'
                    >TERMINAL-X</a>
                </div>

            </div >
        )
    }
}

function animateCards() {

    for (var i = 0; i < store.options.length; i++) {
        var cardId = store.options[i].id + 'Card';

        document.getElementById(cardId).style.transition = 'all 1s';
        document.getElementById(cardId).style.transform = 'translate(0px, 0px)';

    }
}

