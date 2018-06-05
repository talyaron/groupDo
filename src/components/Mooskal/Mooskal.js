import m from 'mithril';
import './Mooskal.css';

export const Mooskal = {
    view: function () {
        return [
            m('.flashBody', [
                m('.mainFlash', [
                    m('a', {
                        class: 'titleFlash',
                        href: 'http://www.delib.org'
                    }, "Delib.org"),
                    m('.subTitle', 'מחליטים ביחד')
                ])
            ])
        ]
    }
}