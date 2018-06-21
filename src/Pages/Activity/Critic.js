import './Critic.css';
import { keyBy } from 'lodash';

export const Critic = {
    oninit: function (vnode) {
        vnode.state = {
            critics: {
                c1: {
                    text: "1ניסיון",
                    author: 'שמוליק',
                    ahuthorId: 'fsdfsdf',
                    isActive: true,
                    support: 1,
                    adminFixed: false
                },
                c2: {
                    text: "בלא גלח גלחי לחגי גחליע גליע לחגככי עלכיעלחעי גכלעלגכ",
                    author: 'שמוליק',
                    ahuthorId: 'fsdfsdf',
                    isActive: true,
                    support: 2,
                    adminFixed: true
                },
                c3: {
                    text: " 3ניסיון",
                    author: 'שמוליק',
                    ahuthorId: 'fsdfsdf',
                    isActive: false,
                    support: 3,
                    adminFixed: true
                }
            }
        }
    },
    view: function (vnode) {

        var critics = keyBy(vnode.state.critics, o => { return o.support });
        var criticsArray = [];
        for (var i in critics) {
            criticsArray.push(critics[i]);
        }


        return (
            <div id="modal1" class="modal">
                <div class="modal-content modalList">
                    <h4>ביקורת על התאור</h4>
                    <table>
                        <tr>
                            <th>

                            </th>
                            <th>
                                הסבר
                             </th>
                            <th>
                                מבקר
                            </th>
                            <th>
                                אחראי
                            </th>
                        </tr>
                        {
                            criticsArray.map((critic, index) => {
                                return (
                                    <tr class='criticCard' key={index}>
                                        <td class='tableSimpleCell'>
                                            <i class="material-icons">thumb_up</i>
                                        </td>
                                        <td class='tableSimpleCell'>
                                            {critic.text}
                                        </td>
                                        <td class='tableSimpleCell'>
                                            <i class="material-icons">check_circle_outline</i>
                                        </td>
                                        <td class='tableSimpleCell'>
                                            <i class="material-icons">check_circle_outline</i>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </table>
                </div>
                <div class="modal-footer">
                    <div
                        class="waves-effect waves-light btn"
                        onclick={() => { vnode.attrs.modalCritic.close() }}
                    >
                        <i class="material-icons right">close</i>סגירה
                    </div>

                </div>
            </div >
        )
    }
}



