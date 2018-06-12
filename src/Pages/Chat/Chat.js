import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import './Chat.css';

export const Chat = {
    oninit: function (vnode) {
        vnode.state = {
            activityId: '',
            chatType: ''
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
        //get chats
        DB.collection('groupActions')
            .doc(vnode.state.activityId)
            .collection(vnode.state.chatType)
            .get().then(function (snap) {
                snap.forEach(function (doc) {
                    console.dir(doc.data())
                })
            })

    },
    view: function (vnode) {
        var chatNames = {
            chatDescription: 'תאור הפעולה: '
        }

        return (
            <div>
                <div
                    class='headers'
                    onclick={() => { m.route.set('/activity/' + vnode.state.activityId) }}
                >
                    <i class="material-icons menuIcons">
                        chat
                    </i>
                    {chatNames[vnode.state.chatType]}
                    {store.current.chat.name}
                </div>
                <div class='panel'>
                    <div class='chatInputDiv'>
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
                                    onclick={() => { sendMessageToDB(chatInput.value) }}
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

function sendMessageToDB(text) {

}