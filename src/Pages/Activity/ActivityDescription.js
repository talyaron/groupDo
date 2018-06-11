import './Activity.css'

export const ActivityDescription = {
    view: function (vnode) {

        return (
            <div>
                <table>
                    <tr>
                        <th class='labels'>הסבר כללי</th><th></th>
                    </tr>
                    <tr>
                        <td class='simpleText'>{vnode.attrs.description}</td>
                        <td>
                            <i class="material-icons activityChat">
                                chat
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <td class='simpleText'>תאריך</td>
                        <td>
                            <i class="material-icons activityChat">
                                chat
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <td class='labels'>תאור הפעילות</td><td></td>
                    </tr>
                    <tr>
                        <td>
                            <div class='simpleText'>
                                {vnode.attrs.fullExplanation.map(function (text) {
                                    return (
                                        <p>{text}</p>
                                    )
                                })}
                            </div>
                        </td>
                        <td>
                            <i class="material-icons activityChat">
                                chat
                            </i>
                        </td>
                    </tr>
                </table>
            </div >
        )
    }
}