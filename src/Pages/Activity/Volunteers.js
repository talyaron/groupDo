import store from '../../data/store';
import DB from '../../controls/firebaseConfig';

var volunteers = [
    { name: 'משה קרפוני' },
    { name: 'רוחמה מנחם' },
    { name: 'חבצלת השרון' }
]
export const Volunteers = {
    oninit: function (vnode) {
        vnode.state = { isJoined: false }
    },
    view: function (vnode) {

        return (
            <tr><td colspan="3">
                {
                    vnode.attrs.volunteers.map(function (volunteer, index) {
                        //check if user has joined
                        if (volunteer.uid == store.user.uid) { vnode.state.isJoined = true }
                        return (
                            <div class="chip right" key={index}>

                                <img src={volunteer.photoURL} alt="Contact Person" />
                                {volunteer.displayName}
                                {(volunteer.uid == store.user.uid) ?
                                    <i
                                        class=" material-icons right volunteerRemove"
                                        onclick={() => { removeVolunteer(vnode) }}
                                    >close</i>
                                    :
                                    <div />
                                }

                            </div>
                        )
                    })
                }
                {(vnode.state.isJoined == false) ?
                    <div
                        class='joinVolunteers right'
                        onclick={() => {
                            joinVolunteer(vnode);
                        }}
                    >הצטרפו +</div>
                    :
                    <div />
                }
            </td></tr>
        )
    }
}

function joinVolunteer(vnode) {

    DB.collection('groupActions').doc(vnode.attrs.activtyId)
        .collection('volunteers').doc(store.user.uid).set(store.user)
}

function removeVolunteer(vnode) {
    DB.collection('groupActions').doc(vnode.attrs.activtyId)
        .collection('volunteers').doc(store.user.uid).delete().then(function () {
            console.log("volunteer successfully removed!");
            vnode.state.isJoined = false;
            m.redraw();
        }).catch(function (error) {
            console.error("Error removing volunteer: ", error);
        });
}