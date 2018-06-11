import './Activity.css'

export const ActivityDescription = {
    view: function (vnode) {

        return (
            <div>
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
                        </td>

                    </tr>
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
                        </td>
                    </tr>
                </table>
            </div >
        )
    }
}