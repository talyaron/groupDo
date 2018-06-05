import m from 'mithril';
import './Card.css';
import { Plus } from './Plus';
import store from '../../../data/store';
import Voting from '../../Voting/Voting'

import voteChoose from '../voteChoose';


export const Card = {
    oninit: function (vnode) {
        vnode.state = {
            choose: 'none', against: 'rgb(212, 212, 212)', for: 'rgb(212, 212, 212)'
        }
    },
    oncreate: function (vnode) {

        //set hight and width for wide screen
        //set hight and width for wide screen

        function waitForImageToLoad(imageElement) {
            return new Promise(resolve => { imageElement.onload = resolve })
        }

        waitForImageToLoad(vnode.dom.children[0]).then(() => {
            // Image have loaded.

            setSizeOfCarousel(vnode);
        });



    },
    onupdate: function (vnode) {

        //set hight and width for wide screen
        setSizeOfCarousel(vnode);
    },

    view: function (vnode) {

        return (
            <div class="carousel-item cardContainer">
                <img src={vnode.attrs.option.src} />
                <table class='cardButtons'>
                    <tr>
                        <td class='cardButton' onclick={function () { voteChoose('against', vnode) }}><Plus color={vnode.state.against} buttonType='against' /></td>
                        <td class='cardButton' onclick={function () { voteChoose('for', vnode) }}><Plus color={vnode.state.for} buttonType='for' /></td>
                    </tr>
                </table>
            </div>
        )
    }
}

function setSizeOfCarousel(vnode) {

    var windowHeight = window.innerHeight;
    var carouselHeight = windowHeight - vnode.attrs.topHeight - 100;
    var carouselWindowRelation = carouselHeight / windowHeight;

    var windowWidth = window.innerWidth;
    var carouselItem = vnode.dom;
    var img = vnode.dom.children[0];
    var table = vnode.dom.children[1];

    var imgWidth = img.clientWidth;
    var imgHeight = img.clientHeight;

    var heightWidthRelations = imgHeight / imgWidth;
    var newRelation = (windowHeight * carouselWindowRelation) / imgHeight;
    var imgNewHeight = imgHeight * newRelation;
    var imgNewWidth = imgWidth * newRelation;

    img.style.height = imgNewHeight + 'px';
    img.style.width = imgNewWidth + 'px';
    table.style.width = imgNewWidth + 'px';
    carouselItem.style.width = imgNewWidth + 'px';
    if (windowWidth > windowHeight) {
        carouselItem.style.left = ((windowWidth - imgNewWidth) / 2) + 'px';

    }
}

