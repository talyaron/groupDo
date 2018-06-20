import store from '../../../data/store';

export const GroupCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards;
        return (
            cards2.map(function (card, index) {

                return (
                    <div class="col s12 m6 l4" key={index}>
                        <div
                            class="card blue-grey darken-1 groupCard"
                            onclick={() => {
                                store.current.group = card;
                                m.route.set('/group/' + card.id);

                            }}
                        >
                            <div class="card-content white-text">
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