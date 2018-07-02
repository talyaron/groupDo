import './Footer.css';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';


var chatCount;
export const Footer = {
    oninit: function (vnode) {

        vnode.state = { chats: 0, lastTime: 0 }

        //wait for user to signin
        function waitForUser() {
            if (typeof store.user.uid !== "undefined") {
                console.log('footer:', store.user.uid, vnode.attrs.acitivitId + '__general')

                //get last time in general chat
                DB.collection('users').doc(store.user.uid)
                    .collection('chats').doc(vnode.attrs.acitivitId + '__general').get().then((chatLastTimeDB) => {
                        if (chatLastTimeDB.exists) {
                            vnode.state.lastTime = chatLastTimeDB.data().lastTime.seconds;
                            console.log('lastTime:', vnode.state.lastTime)

                            //number of chats in footer
                            chatCount = DB.collection('groupActions').doc(vnode.attrs.acitivitId)
                                .collection('general')
                                // .orderBy('lastTime')
                                .where("time.seconds", ">", vnode.state.lastTime)
                                .onSnapshot((messagesDB) => {
                                    vnode.state.chats = messagesDB.docs.length;
                                    console.log(vnode.state.chats)
                                    m.redraw();
                                })
                        } else {

                            console.log("No such document!");
                        }
                    })
            }
            else {
                console.log('no user yet')
                setTimeout(waitForUser, 500);
            }
        }
        waitForUser();


        // console.log('user..... ', store.user.uid)


    },
    onupdate: function (vnode) {

    },
    onremove: function (vnode) {
        chatCount();
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