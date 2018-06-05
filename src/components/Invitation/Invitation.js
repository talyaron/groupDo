import m from 'mithril';
import './Invitation.css';
import { Header } from '../Common/Header';

export const Invitation = {
    view: function () {
        return [
            <div class='containerMain'>
                <Header />
                <div class='containerInvetation'>
                    <div class='mainInvtation'>בר מבקשת שתעזרי לה  לבחור פריט לבוש</div>
                    <div class='subInvtation'>הפריט צריך להתאים לבילוי קיצי, עם הרבה חברים</div>
                    <div class='invitationButton' href="/selection/1" oncreate={m.route.link}>אשמח לעזור</div>
                    <div class='logo'>wizCol.com</div>
                </div>
            </div>
        ]
    }
}