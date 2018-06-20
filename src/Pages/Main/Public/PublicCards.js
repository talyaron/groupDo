export const PublicCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards;
        return (
            cards2.map(function (card, index) {
                return (

                    <div class="col s12 m6 l4" key={index}>
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{card.name}</span>
                                <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }
}