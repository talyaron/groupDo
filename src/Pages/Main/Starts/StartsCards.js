
import store from '../../../data/store';

export const StartsCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards || [];

        return (
            cards2.map(function (card, index) {
                return (

                    <div class="col s12 m6 l4" key={index}
                        onclick={() => {
                            m.route.set('/activity/' + card.id);
                            store.current.action = card;
                        }}

                    >
                        <div class="card white">
                            <div class="card-content white-black">
                                <span class="card-title">{card.name}</span>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }
}



