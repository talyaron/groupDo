
export const StartsCards = {

    view: function (vnode) {
        var cards2 = vnode.attrs.cards || [];
        console.log('cards', cards2)
        return (
            cards2.map(function (card, index) {
                return (

                    <div class="col s12 m6 l4" key={index}>
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



