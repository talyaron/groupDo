import './ApprovalBar.css';

export const ApprovalBar = {
    view: function (vnode) {
        return (
            <div>
                <div class='labels'>אחוז תמיכה</div>
                <div class='ApprovalBarMain'>
                    <div class='approved'></div>
                    <div class='pendding'></div>
                </div>
            </div>
        )
    }
}