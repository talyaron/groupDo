export const PublicCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards;
        return (
            cards2.map(function (card) {
                return (

                    <div class="col s12 m6 l4">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{card.name}</span>
                                <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
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