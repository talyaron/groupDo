import DB from '../../controls/firebaseConfig';
import store from '../../data/store';

export const Chat = {
    oninit: function (vnode) {
        vnode.state = {
            activityId: '',
            chatType: ''
        }
        var refArrayStr = vnode.attrs.id;
        var refArray = refArrayStr.split('__')

        vnode.state.activityId = refArray[0];
        vnode.state.chatType = refArray[1];

        DB.collection('groupActions')
            .doc(vnode.state.activityId)
            .collection(vnode.state.chatType)
            .get().then(function (snap) {
                snap.forEach(function (doc) {
                    console.dir(doc.data())
                })
            })

    },
    view: function (vnode) {

        return (<div>Chat....{vnode.attrs.id}</div>)
    }
}