import m from 'mithril';
import './Selection.css';
import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';
import store from '../../data/store';

import DB from '../../controls/firebaseConfig';

import { Header } from '../Common/Header';
import { Card } from './Card/Card';
import { SelectionCards } from './SelectionCards';

var instance = {};

export const Selection = {
    oninit: function (vnode) {


        //get options from db
        var options = [];
        DB.child('invitations/sjdfhskjhf/options').once('value', function (optionsDB) {
            optionsDB.forEach(function (optionDB) {
                options.push({
                    src: optionDB.val().src,
                    id: optionDB.key,
                    percent: optionDB.val().percent
                })
            })
            store.options = options;

            m.redraw();
        })

    },
    oncreate: function (vnode) {

        //get top height
        var headerHeight = vnode.dom.children[0].clientHeight;
        var subHeaderHeight = vnode.dom.children[1].clientHeight;
        vnode.attrs.topHeight = headerHeight + subHeaderHeight;


    },
    onupdate: function (vnode) {

        //check that Carousel is started only once
        if (!store.isInstance) {

            var crsl = document.getElementById('carouselSelection');
            // var crsl = vnode.dom.children.carouselSelection;

            window.instance = store.instance = M.Carousel.init(crsl, {
                fullWidth: false,
                height: 1000,

            });

            store.isInstance = true;
        }
    },
    onremove: function () {
        store.isInstance = false;
    },

    view: function (vnode) {
        return [
            <div class='containerMain'>
                <Header />
                <div class='subHeader'>בר מבקשת ממך לעזור לה לבחור פריט לבוש</div>
                {(store.options.length > 0) ?
                    <div id='carouselSelection'>
                        <div class="carousel carousel-slider">
                            <SelectionCards options={store.options} topHeight={vnode.attrs.topHeight} />
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </div>
        ]
    }
}