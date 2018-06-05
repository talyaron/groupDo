const m = require('mithril');
var Image = require('./view/image');
var Materialize = require('./view/Materialize');


var Message = {
    view: function (vnode) {
        return (
            <div>
                <h3>{vnode.attrs.message}</h3>
            </div>
        )
    }
}

var App = {
    view: function () {
        return (
            <main>
                <h1>Hello world</h1>
                <Message message='good point!' />
                <Materialize />
                {/* <Image /> */}
            </main>
        )
    }
}



module.exports = App;