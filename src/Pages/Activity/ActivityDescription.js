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
                    <tr class='descriptionRow' colspan="3">
                        <th class='labels'>הסבר כללי</th>
                    </tr>
                    <tr class='descriptionRow'>
                        <td class='simpleText' colspan="3">{vnode.attrs.description}</td>
                    </tr>

                    <tr>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                chat
                                    </i>
                        </td>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                check_circle_outline
                                    </i>
                        </td>
                        <td class='chatDoneCell'
                            onclick={() => { vnode.attrs.modalCritic.open() }}>
                            <i class="material-icons activityChat">
                                warning
                                    </i>
                        </td>
                    </tr>
                    <tr class='descriptionRow'>
                        <td class='labels' colspan="3">תאור הפעילות</td>
                    </tr>
                    <tr class='descriptionRow'>
                        <td colspan="3">
                            <div class='simpleText'>
                                {vnode.attrs.fullExplanation.map(function (text) {
                                    return (
                                        <p>{text}</p>
                                    )
                                })}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                chat
                                    </i>
                        </td>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                check_circle_outline
                                    </i>
                        </td>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                warning
                                    </i>
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
                        <td class='simpleText'>10/2/18</td>
                    </tr>
                    <tr>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                chat
                                    </i>
                        </td>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                check_circle_outline
                                    </i>
                        </td>
                        <td class='chatDoneCell'>
                            <i class="material-icons activityChat">
                                warning
                                    </i>
                        </td>
                    </tr>
                </table >
            </div >
        )
    }
}