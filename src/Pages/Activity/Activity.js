import './Activity.css';
import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

import firebase from 'firebase/app';
import 'firebase/auth';

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
            addResource: false
        }
        vnode.state.id = vnode.attrs.id;

        //get from DB activity details
        vnode.state.unsubscribe = DB.collection('groupActions')
            .doc(vnode.state.id)
            .onSnapshot(function (doc) {

                vnode.state.name = doc.data().name || 'אין שם לפעילות';
                vnode.state.description = doc.data().description || 'אין הסבר על הפעילות'

                var explanationText = doc.data().fullExplanation;
                var explanationArrayText = explanationText.split('<br />');
                vnode.state.fullExplanation = explanationArrayText;

                m.redraw();
            });
        //get resources from DB
        console.log('st')
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



    },
    onbeforeupdate: function (vnode) {

    },
    onremove: function (vnode) {
        vnode.state.unsubscribe();

    },
    view: function (vnode) {
        return (
            <div class='main'>
                <div
                    class='headers activityHeader'
                    onclick={() => { m.route.set('/groups') }}
                >
                    <table><tr><td class='activityHeaderTd'>
                        <i class="material-icons menuIcons">
                            merge_type
                            </i>
                        <span>{vnode.state.name}</span>
                    </td></tr></table>
                </div>
                <div class='panel panelActivity'>
                    <div class='labels'>הסבר כללי</div>
                    <div class='simpleText'>{vnode.state.description}</div>
                    <div class='simpleText'>תאריך 22/5/2018</div>
                    <div class='labels'>תאור הפעילות</div>
                    <div class='simpleText'>
                        {vnode.state.fullExplanation.map(function (text) {
                            return (
                                <p>{text}</p>
                            )
                        })}
                    </div>
                    <div class='labels'>מצרכים ומשאבים</div>
                    <div class='resourceCards'>
                        <table class='resourceCardTable'>
                            <tr>
                                <th></th>
                                <th>שם</th>
                                <th class='resourceAmount'>כמות</th>
                                <th>אחראי/ת</th>
                            </tr>
                            {vnode.state.resources.map(function (resource) {

                                return (
                                    <tr>
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
                                            onclick={(e) => { editAmount(e, vnode) }}
                                        >
                                            {(vnode.state.editAmount[resource.id]) ? <input type='number' onblur={(e) => { addAmountToDB(e, vnode) }} /> : resource.amount}
                                        </td>
                                        <td
                                            class={(resource.responsibleName) ? 'responsibleTrue' : 'responsibleFalse'}
                                            id={resource.id}
                                            onclick={(e) => {
                                                setResponsibilty(e.target.id, vnode.state.id, store.user.uid, store.user.displayName, vnode)
                                            }}>

                                            {(resource.responsibleName) ? resource.responsibleName : 'קחו אחריות'}
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
                console.log("Document successfully written!");
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
    console.dir(e)
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

function editAmount(e, vnode) {


    var targetMainId = e.target.id;
    targetMainId = targetMainId.slice(7)
    vnode.state.editAmount[targetMainId] = true;

}

function addAmountToDB(e, vnode) {
    if (e.keyCode === 13 || e.type === 'blur') {
        //set amount to db.
        console.log(e)

        var idOfAmount = e.target.id;
        idOfAmount = idOfAmount.slice(7);
        vnode.state.editAmount[idOfAmount] = false;

        DB.collection('groupActions')
            .doc(vnode.state.id).collection('resources')
            .doc(idOfAmount)
            .update({
                amount: e.target.valueAsNumber
            })
    }
}