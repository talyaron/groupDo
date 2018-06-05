import m from 'mithril';
import { Card } from './Card/Card'

export const SelectionCards = {

    view: function (vnode) {

        return [
            vnode.attrs.options.map(function (option, i) {
                return m(Card, { option: option, key: i, topHeight: vnode.attrs.topHeight })

            })
        ]
    }
}