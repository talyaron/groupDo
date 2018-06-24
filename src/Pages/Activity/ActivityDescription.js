import './Activity.css';
import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import { Volunteers } from './Volunteers';

export const ActivityDescription = {

    oninit: function (vnode) {
        vnode.state = { descriptionChatCounter: 0 }
        //get chats counter
        DB.collection('groupActions').doc(vnode.attrs.activtyId)
            .collection('chatDescription').onSnapshot(function (chatsDB) {
                vnode.state.descriptionChatCounter = chatsDB.size
                m.redraw();
            })
    },
    view: function (vnode) {

        return (
            <div>
                <p><span class='labels'>יזמ/ית</span>: <span class='simpleText'>{vnode.attrs.creator.name}</span></p>
                <table>
                    <tr class='descriptionRow'>
                        <th class='labels'>הסבר כללי</th><th></th>
                    </tr>
                    <tr class='descriptionRow'>
                        <td class='simpleText'>{vnode.attrs.description}</td>

                        <td class='chatDone'>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        chat
                                    </i>
                                </td>
                            </tr>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        check_circle_outline
                                    </i>
                                </td>
                            </tr>
                            <tr
                                class='chatDoneRow'
                                onclick={() => { vnode.attrs.modalCritic.open() }}
                            >
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        warning
                                    </i>
                                </td>
                            </tr>
                        </td>

                    </tr>

                    <tr class='descriptionRow'>
                        <td class='labels'>תאור הפעילות</td><td></td>
                    </tr>
                    <tr class='descriptionRow'>
                        <td>
                            <div class='simpleText'>
                                {vnode.attrs.fullExplanation.map(function (text) {
                                    return (
                                        <p>{text}</p>
                                    )
                                })}
                            </div>
                        </td>
                        <td class='chatDone'>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'
                                    onclick={() => {
                                        m.route.set('/chat/' + vnode.attrs.activtyId + '__chatDescription');
                                        store.current.chat.name = vnode.attrs.activityName;
                                    }}
                                >
                                    <i class={(vnode.state.descriptionChatCounter > 0)
                                        ? 'material-icons activityChat newChat'
                                        : 'material-icons activityChat'}>
                                        chat
                                    </i>
                                    <div
                                        class='chatCounter'>{vnode.state.descriptionChatCounter}</div>
                                </td>
                            </tr>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        check_circle_outline
                                    </i>
                                </td>
                            </tr>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        warning
                                        </i>
                                </td>
                            </tr>
                        </td>
                    </tr>
                    <tr class='descriptionRow'>
                        <th class='labels'>מתנדבים</th><th></th>
                    </tr>
                    <Volunteers
                        volunteers={vnode.attrs.volunteers}
                        activtyId={vnode.attrs.activtyId}
                    />
                    <tr class='descriptionRow'>
                        <th class='labels'>תאריך</th><th></th>
                    </tr>
                    <tr class='descriptionRow'>
                        <td class='simpleText'>תאריך</td>
                        <td class='chatDone'>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        chat
                                    </i>
                                </td>
                            </tr>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        check_circle_outline
                                    </i>
                                </td>
                            </tr>
                            <tr class='chatDoneRow'>
                                <td class='chatDoneCell'>
                                    <i class="material-icons activityChat">
                                        warning
                                    </i>
                                </td>
                            </tr>
                        </td>
                    </tr>
                </table>
            </div >
        )
    }
}