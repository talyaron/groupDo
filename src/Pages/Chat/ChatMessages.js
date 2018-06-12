import './ChatMessages.css';

export const ChatMessages = {
    view: function (vnode) {
        var messagesArray = [];
        messagesArray = vnode.attrs.messages || [];
        for (var i in messagesArray) {
            console.log(messagesArray[i].time);
        }
        messagesArray.sort(function (a, b) {
            return a.time.seconds - b.time.seconds;
        })
        return (
            <div class='messagesPanel'>
                {
                    messagesArray.map(function (message) {
                        var messagePargraphs = [];
                        messagePargraphs = message.message;

                        return (
                            <div class='messageBox'>
                                <div class='simpleText'>
                                    {
                                        messagePargraphs.map(function (parg) {
                                            return (
                                                <div class='messageParg'>{parg}</div>
                                            )
                                        })
                                    }
                                </div>
                                <p>{message.userName}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}