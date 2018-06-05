var m = require('mithril');
require('materialize-css/dist/css/materialize.css');
require('./local.css');

var Materialize = {
    view: function (vnode) {
        return m('div', [
            m('a', { class: 'waves-effect waves-light btn' }, 'BUTTON'),
            m('.test', 'Bam')
        ])
    }
}
module.exports = Materialize;