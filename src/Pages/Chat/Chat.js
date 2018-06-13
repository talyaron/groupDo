import { ChatMessages } from './ChatMessages';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import firebase from "firebase/app";
import "firebase/firestore";


import './Chat.css';

export const Chat = {
    oninit: function (vnode) {
        vnode.state = {
            activityId: '',
            chatType: '',
            messages: []
        }

        var refArrayStr = vnode.attrs.id;
        var refArray = refArrayStr.split('__')

        vnode.state.activityId = refArray[0];
        vnode.state.chatType = refArray[1];

        //get chat details
        DB.collection('groupActions')
            .doc(vnode.state.activityId)
            .get().then(function (activityDB) {
                store.current.chat.name = activityDB.data().name;
                m.redraw();
            })
        //get messages
        DB.collection('groupActions')
            .doc(vnode.state.activityId)
            .collection(vnode.state.chatType)
            .onSnapshot(function (snap) {
                var messagesArray = []
                var toRedraw = true; //some time it takes time to update time. to prevent double redraw

                snap.forEach(function (doc) {
                    if (doc.data().time != null) {
                        messagesArray.push(doc.data())
                    } else {
                        toRedraw = false;
                    }
                })

                vnode.state.messages = messagesArray

                if (toRedraw) { //some time it takes time to update time. to prevent double redraw

                    m.redraw()
                }
            })

    },
    view: function (vnode) {
        var chatNames = {
            chatDescription: 'תאור הפעולה: '
        }

        return (
            <div>
                <div
                    id='chatHeader'
                    class='headers'
                    onclick={() => { m.route.set('/activity/' + vnode.state.activityId) }}
                >
                    <i class="material-icons menuIcons">
                        chat
                    </i>
                    {chatNames[vnode.state.chatType]}
                    {store.current.chat.name}
                </div>
                <div class='panel chatPanel'>
                    <ChatMessages messages={vnode.state.messages} />

                    <div class='chatInputDiv' id='chatInputDiv'>
                        <table class='chatInputDivTb'>
                            <tr>
                                <td>
                                    <textarea
                                        id="chatInput"
                                        class="materialize-textarea chatInput"
                                        autofocus
                                    >
                                    </textarea>
                                </td>
                                <td
                                    class='sendMessageTd'
                                    onclick={() => { sendMessageToDB(chatInput.value, vnode) }}
                                >
                                    <i class="material-icons sendMessage">
                                        send
                                    </i>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

function sendMessageToDB(text, vnode) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    if (text.length > 0) {
        //empty input
        var chatText = chatInput.value;
        chatInput.value = '';

        //split text to paragrphs
        var textLineBreaks = chatText.split(/\n/g);

        // write to DB
        DB.collection('groupActions')
            .doc(vnode.state.activityId)
            .collection(vnode.state.chatType).add({
                message: textLineBreaks,
                time: timestamp,
                userName: store.user.displayName || 'אנונימי',
                userPhoto: store.user.photoURL || '',
                userUID: store.user.uid
            })
    }
}