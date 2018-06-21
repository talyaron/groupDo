import './StartsCard.css';
import store from '../../../data/store';

export const StartsCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards || [];

        return (
            cards2.map(function (card, index) {
                return (

                    <div class="col s12 m6 l4 right" key={index}
                        onclick={() => {
                            m.route.set('/activity/' + card.id);
                            store.current.action = card;
                        }}

                    >
                        <div class="activityCard">
                            <p class="activityCardTitle">{card.name}</p>
                            <p>{card.description}</p>
                        </div>
                    </div>

                )
            })
        )
    }
}



