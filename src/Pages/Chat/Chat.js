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
            typeOfChatName: '',
            messages: []
        }

        var chatURL = vnode.attrs.id;
        var chatURLArray = chatURL.split('__')

        const typeOfChatNameObj = {
            general: 'שיחה כללית',
            description: 'תאור הפעילות',
            explanation: 'הסבר על הפעילות'
        }

        vnode.state.activityId = chatURLArray[0];
        vnode.state.chatType = chatURLArray[1];
        vnode.state.typeOfChatName = typeOfChatNameObj[vnode.state.chatType] || 'כללי'


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
    onremove: function (vnode) {

        //for the new-chat-messages counters, this set the last time user was in this chat

        var lastTime = new Date();
        DB.collection('users').doc(store.user.uid)
            .collection('chats').doc(vnode.attrs.id).set({
                lastTime: lastTime.getTime(),
                activityId: vnode.state.activityId,
                chatType: vnode.state.chatType
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
                    <div class='typeOfChat'>{vnode.state.typeOfChatName}</div>
                </div>

                <div class='chatPanel'>
                    <ChatMessages messages={vnode.state.messages} />

                    <div class='chatInputDiv' id='chatInputDiv'>
                        <table class='chatInputDivTb'>
                            <tr>
                                <td
                                    class='sendMessageTd'
                                    onclick={() => { m.route.set('/activity/' + vnode.state.activityId) }}
                                >
                                    <i class="material-icons sendMessage">
                                        arrow_forward
                                    </i>
                                </td>
                                <td class='chatInputField'>
                                    <textarea
                                        id="chatInput"
                                        class="chatInput"
                                        autofocus
                                        onkeyup={(e) => checkShiftEnter(e, chatInput.value, vnode)}
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
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    var timeMill = new Date();

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
                timeMill: timeMill.getTime(),
                userName: store.user.displayName || 'אנונימי',
                userPhoto: store.user.photoURL || '',
                userUID: store.user.uid
            })
    }
}

function checkShiftEnter(event, value, vnode) {
    //if yes, send texterea input to DB

    if (event.keyCode === 13 && event.shiftKey) {

        sendMessageToDB(value, vnode)
    }
}