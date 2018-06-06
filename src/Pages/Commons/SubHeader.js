import './SubHeader.css';

export const SubHeader = {

    view: function (vnode) {

        return (
            <div class='subHeader'>
                <table>
                    <tr>
                        <td
                            class={(vnode.attrs.selector == 'Groups') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/groups') }}
                        > קבוצות</td>
                        <td
                            class={(vnode.attrs.selector == 'Starts') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/starts') }}
                        >יוזמות</td>
                        <td
                            class={(vnode.attrs.selector == 'Public') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/public') }}
                        >פעולות</td>
                        <td
                            class={(vnode.attrs.selector == 'Chat') ? 'menuCell selected' : 'menuCell'}
                            onclick={() => { m.route.set('/chat') }}
                        >שיחות</td>
                    </tr>
                </table>
            </div >
        )
    }
}