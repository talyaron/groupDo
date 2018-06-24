import firebase from 'firebase/app';
import 'firebase/auth';
import { findIndex } from 'lodash';

import './Activity.css';
import { ActivityDescription } from './ActivityDescription';
import { ApprovalBar } from './ApprovalBar';
import { Critic } from './Critic';

import DB from '../../controls/firebaseConfig';
import store from '../../data/store';



import 'materialize-css/dist/css/materialize.css';
import M from 'materialize-css/dist/js/materialize';

export const Activity = {
    oninit: function (vnode) {

        vnode.state = {
            id: '',
            name: '',
            fullExplanation: [''],
            editAmount: [],
            editName: [],
            resources: [],
            volunteers: [],
            addResource: false,
            description: '',
            modals: {
                critic: {}
            },
            group: {
                id: '',
                name: ''
            },
            creator: {
                name: '',
                id: ''
            }
        }
        //get activity id from router
        vnode.state.id = vnode.attrs.id;

        //get group id from store if possible
        vnode.state.group.name = store.current.group.name || '';

        //get from store acitivity details
        vnode.state.name = store.current.action.name || 'אין שם לפעילות';
        vnode.state.description = store.current.action.description || 'אין הסבר על הפעילות';
        vnode.state.group.id = store.current.action.groupId || '';

        //get from DB activity details
        vnode.state.unsubscribe = DB.collection('groupActions')
            .doc(vnode.state.id)
            .onSnapshot(function (doc) {

                vnode.state.name = doc.data().name || 'אין שם לפעילות';
                vnode.state.description = doc.data().description || 'אין הסבר על הפעילות';
                vnode.state.creator = doc.data().creator || {};
                vnode.state.group.id = doc.data().groupId || '';
                store.current.group.id = doc.data().groupId || '';

                var explanationText = doc.data().fullExplanation;
                var explanationArrayText = explanationText.split('<br />');
                vnode.state.fullExplanation = explanationArrayText;

                //get group name
                DB.collection('groups').doc(vnode.state.group.id).get().then(function (groupDB) {
                    vnode.state.group.name = groupDB.data().name;
                    store.current.group.name = groupDB.data().name;
                    m.redraw();
                })

                m.redraw();
            });



        //get resources from DB

        DB.collection('groupActions').doc(vnode.state.id).collection('resources')
            .onSnapshot(resourcesDB => {
                var resourcesObj = {}
                resourcesDB.forEach(doc => {
                    resourcesObj[doc.id] = doc.data()
                })
                var resourcesArray = [];
                for (var i in resourcesObj) {
                    var resource = resourcesObj[i];
                    resource.id = i;
                    resourcesArray.push(resource);
                }
                vnode.state.resourcesObj = resourcesObj;
                vnode.state.resources = resourcesArray;
                m.redraw();

            })

        //get volunteers from DB

        DB.collection('groupActions').doc(vnode.state.id).collection('volunteers')
            .onSnapshot(volunteersDB => {
                var volunteersArray = [];
                volunteersDB.forEach(volunteerDB => {
                    volunteersArray.push(volunteerDB.data())
                })
                vnode.state.volunteers = volunteersArray;
                console.log(vnode.state.volunteers)
                m.redraw();
            })
    },
    oncreate: function (vnode) {


        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
        var instanceIndex = findIndex(instances, function (o) { return o.id == "modal1" });
        vnode.state.modals.critic = instances[instanceIndex];


    },
    onupdate: function (vnode) {

        if (store.user.isAnonymous || Object.keys(store.user).length === 0) {
            console.log('please login in')
            store.lastUrl = '#!/activity/' + vnode.state.id;
            m.route.set('/login')
        } else {
            console.log('user is not anonymous')

        }
    },
    onremove: function (vnode) {
        vnode.state.unsubscribe();

    },
    view: function (vnode) {

        return (
            <div class='main'>
                <div class='headers activityHeader'>
                    <div class='groupHeader'
                        onclick={() => {
                            m.route.set('/group/' + vnode.state.group.id)
                        }}
                    >קהילה: {vnode.state.group.name}</div>
                    <table><tr><td class='activityHeaderTd'>
                        פעילות: <span>{vnode.state.name}</span>
                    </td></tr></table>
                </div>
                <div class='panel panelActivity'>
                    <ApprovalBar />
                    <ActivityDescription
                        description={vnode.state.description}
                        fullExplanation={vnode.state.fullExplanation}
                        activtyId={vnode.state.id}
                        activityName={vnode.state.name}
                        modalCritic={vnode.state.modals.critic}
                        creator={vnode.state.creator}
                        volunteers={vnode.state.volunteers}
                    />
                    <div class='labels'>מצרכים</div>
                    <div class='resourceCards'>
                        <table class='resourceCardTable'>
                            <tr>
                                <th></th>
                                <th>שם</th>
                                <th class='resourceAmount'>כמות</th>
                                <th>אחראי/ת</th>
                                <th>מחיקה</th>
                            </tr>
                            {vnode.state.resources.map(function (resource) {

                                return (
                                    <tr class='newResource'>
                                        <td><label><input type="checkbox"
                                            name={resource.id}
                                            style='opacity:1; position:relative; margin:3px' />
                                        </label>
                                        </td>
                                        <td
                                            id={'name_' + resource.id}
                                            onclick={(e) => { editName(e) }}
                                            onkeyup={(e) => { setNameToDb(e, vnode) }}
                                            onblur={(e) => { setNameToDb(e, vnode) }}
                                        >
                                            {resource.name}
                                        </td>
                                        <td
                                            id={'amount_' + resource.id}
                                            class='resourceAmount'
                                            onclick={(e) => { editAmount(e, vnode, resource.amount) }}
                                        >
                                            {(vnode.state.editAmount[resource.id]) ?
                                                <input
                                                    id={'amountIn' + resource.id}
                                                    type='number'
                                                    value={Number(resource.amount)}
                                                    onchange={(e) => { resource.amount = e.target.value }}
                                                    onblur={(e) => { addAmountToDB(e, vnode) }}
                                                    onkeyup={(e) => { resource.amount = e.target.value; addAmountToDB(e, vnode) }} />
                                                : resource.amount}
                                        </td>
                                        <td
                                            class={(resource.responsibleName) ? 'responsibleTrue' : 'responsibleFalse'}
                                            id={resource.id}
                                            onclick={(e) => {
                                                setResponsibilty(e.target.id, vnode.state.id, store.user.uid, store.user.displayName, vnode)
                                            }}>

                                            {(resource.responsibleName) ? resource.responsibleName : 'קחו אחריות'}
                                        </td>
                                        <td class='deleteResourceTd'>
                                            <i
                                                class="material-icons deleteResource"
                                                id={'delete_' + resource.id}
                                                onclick={(e) => { deleteResource(e, vnode) }}
                                            >
                                                delete
                                        </i>
                                        </td>
                                    </tr>
                                )
                            })}
                            {(vnode.state.addResource) ?
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type='text' autofocus placeholder='שם הפריט' id='rsName' />
                                    </td>
                                    <td>
                                        <input type='number' placeholder='כמות' id='rsAmount' />
                                    </td>
                                    <td class='confirmResource'
                                        onclick={() => { addResourceToDB(vnode); vnode.state.addResource = false }}
                                    >
                                        הוספה
                                        </td>
                                    <td
                                        class='cancelResource'
                                        onclick={() => { cancelResource(); vnode.state.addResource = false }}
                                    >
                                        ביטול
                                        </td>
                                </tr>
                                :
                                <tr></tr>
                            }
                            <tr>
                                <td
                                    colspan="2"
                                    class='addResource'
                                    onclick={() => { toggleAddResource(vnode) }}

                                >
                                    <i class="material-icons">
                                        add
                                    </i>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <Critic modalCritic={vnode.state.modals.critic} />
                </div>


            </div>
        )
    }
}

function setResponsibilty(resourceId, acitivitId, responsibleId, responsibleName, vnode) {

    if (!store.user.uid) {
        store.lastUrl = '#!/activity/' + acitivitId
        m.route.set('/login')
    } else {

        if (!vnode.state.resourcesObj[resourceId].responsibleId) {
            //if nobody took responsibility - set responsibility
            DB.collection('groupActions').doc(acitivitId).collection('resources').doc(resourceId)
                .update({
                    responsibleId: responsibleId,
                    responsibleName: responsibleName
                })
        }
        else if (vnode.state.resourcesObj[resourceId].responsibleId == responsibleId) {
            //if the responder is allredy set, remove it
            DB.collection('groupActions').doc(acitivitId).collection('resources').doc(resourceId)
                .update({
                    responsibleId: false,
                    responsibleName: false
                })
        } else {
            DB.collection('groupActions').doc(acitivitId).collection('resources').doc(resourceId)
                .update({
                    responsibleId: responsibleId,
                    responsibleName: responsibleName
                })
        }
    }
}

function toggleAddResource(vnode) {
    if (vnode.state.addResource) {
        vnode.state.addResource = false;
    } else {
        vnode.state.addResource = true;
    }
}

function addResourceToDB(vnode) {

    if (rsName.value && rsAmount.value) {
        DB.collection('groupActions').doc(vnode.state.id).collection('resources').add({
            name: rsName.value,
            amount: rsAmount.value
        })
            .then(function () {

                rsName.value = '';
                rsAmount.value = 0;
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }
}

function cancelResource() {
    rsName.value = '';
    rsAmount.value = 0;
}

function editName(e) {
    var idOfName = e.target.id;
    idOfName = idOfName.slice(5);
    var element = document.getElementById(e.target.id);
    element.classList.add('nameSelected')
    element.setAttribute("contenteditable", true)
}

function setNameToDb(e, vnode) {
    e.preventDefault();

    if (e.keyCode === 13 || e.type === 'blur') {
        //set name to db.

        var element = document.getElementById(e.target.id);
        element.classList.remove('nameSelected')
        element.setAttribute("contenteditable", false)
        var idOfName = e.target.id;
        idOfName = idOfName.slice(5);
        DB.collection('groupActions').doc(vnode.state.id).collection('resources').doc(idOfName).update({
            name: e.target.textContent

        })
    }

}

function editAmount(e, vnode, amount) {


    var targetMainId = e.target.id;
    targetMainId = targetMainId.slice(7)
    vnode.state.editAmount[targetMainId] = true;


}

function addAmountToDB(e, vnode) {
    if (e.keyCode === 13 || e.type === 'blur') {
        //set amount to db.

        var idOfAmount = e.target.id;
        idOfAmount = idOfAmount.slice(8);

        vnode.state.editAmount[idOfAmount] = false;

        DB.collection('groupActions')
            .doc(vnode.state.id).collection('resources')
            .doc(idOfAmount)
            .update({
                amount: e.target.valueAsNumber
            })
    }
}

function deleteResource(e, vnode) {

    var resourceId = e.target.id;
    resourceId = resourceId.slice(7)
    DB.collection('groupActions').doc(vnode.state.id).collection('resources').doc(resourceId).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });;
}