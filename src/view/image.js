var m = require('mithril')

var Image = {
    view: function (vnode) {
        return m('div', [
            m('img', { src: './img/fromIdeaToApp-800.png' })
        ])
    }
}
module.exports = Image;