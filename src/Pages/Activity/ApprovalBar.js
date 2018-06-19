import './ApprovalBar.css';

export const ApprovalBar = {
    view: function (vnode) {
        return (
            <div>
                <div class='labels'>אחוז תמיכה</div>
                <table class='ApprovalBarMain'>
                    <tr>
                        <td class='approved'></td>
                        <td class='pendding'></td>
                        <td class='noApproved'></td>
                    </tr>
                </table>
            </div>
        )
    }
}