import './Footer.css';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';
import get from 'lodash';


var chatCount;
export const Footer = {
    oninit: function (vnode) {

        vnode.state = { chats: 0, lastTime: 0 }

    },
    onupdate: function (vnode) {

        //count number of message in general chat for the footer
        if (store.chats.hasOwnProperty(vnode.attrs.acitivitId)) {
            if (store.chats[vnode.attrs.acitivitId].general > 9) {
                vnode.state.chats = '10+'
            } else {
                vnode.state.chats = store.chats[vnode.attrs.acitivitId].general;
            }
        }
    },
    onremove: function (vnode) {
        // chatCount();
    },
    view: function (vnode) {
        return (
            <div class='footers'>
                <table>
                    <tr>
                        <td
                            class='footerButtons'
                            onclick={() => { m.route.set('/starts') }}
                        >
                            <i class="material-icons small buttons">arrow_forward</i>
                        </td>
                        <td class='footerButtons'
                            onclick={() => { m.route.set('/chat/' + vnode.attrs.acitivitId + '__general') }}
                        >
                            <i class="material-icons small">chat</i>
                            <div class='chatsNumber'>{vnode.state.chats}</div>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}