
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
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{card.name}</span>
                                <p>{card.description}</p>
                            </div>
                            <div class="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }
}



