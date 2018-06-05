import store from '../../data/store';
import DB from '../../controls/firebaseConfig';


function voteChoose(againstFor, vnode) {

    var imgId = vnode.attrs.option.id;
    var notChoosed = 'rgb(212, 212, 212)';

    if (vnode.state.choose !== againstFor) {
        vnode.state.choose = againstFor;
        if (againstFor === 'against') {
            vnode.state = { choose: 'against', against: 'red', for: notChoosed }
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).remove();
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).set(true);
        } else if (againstFor === 'for') {
            vnode.state = { choose: 'for', against: notChoosed, for: 'green' };
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).set(true);
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).remove();
        } else {
            vnode.state = { choose: 'none', against: notChoosed, for: notChoosed };
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).remove();
            DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).remove();
        }
    } else {
        vnode.state = { choose: 'none', against: notChoosed, for: notChoosed }
        DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/for/' + store.user.uid).remove();
        DB.child('invitations/sjdfhskjhf/options/' + imgId + '/voters/against/' + store.user.uid).remove();
    }


    setTimeout(function () {
        window.instance.next();

        if (store.instance.count - 1 <= store.instance.center) {
            m.route.set('/voting/1')
        }
    }, 500)
}

export default voteChoose;