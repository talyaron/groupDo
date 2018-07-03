import DB from '../../controls/firebaseConfig';

function listenToCounter(vnode, counterName) {
    if (counterName == 'general' || counterName == 'description' || counterName == 'explanation') {
        console.log('listen to', counterName)
        var unsubscribe = DB.collection('groupActions').doc(vnode.attrs.activtyId)
            .collection(counterName).orderBy('time').limit(10)
            .onSnapshot(function (chatsDB) {
                vnode.state.chats[counterName] = chatsDB.size
                m.redraw();
            })
        return unsubscribe;
    } else {
        console.error('Error: no such counter - ', counterName + '. Cant listen to counter')
        return function () { console.log('No counter, therefore cant stop the listner') }
    }

}

export default listenToCounter;