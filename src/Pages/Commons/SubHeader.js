import './SubHeader.css';

export const SubHeader = {

    view: function (vnode) {

        return (
            <div class='subHeader'>
                <table>
                    <tr>
                        <td
                            class={(vnode.attrs.selector == 'Groups') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/groups') }}>
                            <i class="material-icons">
                                group_work
                                </i>
                            קבוצות
                        </td>


                        <td
                            class={(vnode.attrs.selector == 'Starts') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/starts') }}>
                            <i class="material-icons">
                                merge_type
                            </i>
                            יוזמות
                            </td>
                        <td
                            class={(vnode.attrs.selector == 'Public') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/public') }}>
                            <i class="material-icons">
                                check_circle
                            </i>
                            פעולות
                            </td>
                        <td
                            class={(vnode.attrs.selector == 'Chat') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/chat') }}>
                            <i class="material-icons">
                                chat_bubble_outline
                            </i>
                            שיחות
                            </td>
                    </tr>
                </table>
            </div >
        )
    }
}