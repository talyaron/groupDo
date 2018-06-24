import './GroupsCards.css';
import store from '../../../data/store';

export const GroupCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards;
        return (
            cards2.map(function (card, index) {

                return (
                    <div class="col s12 m6 l4 right" key={index}>

                        <div
                            class="groupCard"
                            onclick={() => {
                                store.current.group = card;
                                m.route.set('/group/' + card.id);

                            }}
                        >
                            <img src='https://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/142DE/production/_102145628_hi047614370.jpg' />
                            <span class="activityCardTitle">{card.name}</span>
                            <p>{card.description}</p>

                        </div>
                    </div>

                )
            })
        )
    }
}