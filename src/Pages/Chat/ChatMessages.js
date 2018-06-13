import './ChatMessages.css';

export const ChatMessages = {
    oninit: function (vnode) {

        vnode.state = {
            numberOfMessages: 0,
            messagesArray: []
        }

    },
    oncreate: function (vnode) {

        //set messages panel height
        var headerHeight = chatHeader.clientHeight;
        var inputHeight = chatInputDiv.clientHeight;
        var windowHeight = window.innerHeight;
        messagesPanel.style.height = (windowHeight - (headerHeight + inputHeight)) + 'px';

    },
    onbeforeupdate: function (vnode) {

        //get number of messages for the new message animation
        vnode.state.messagesArray = vnode.attrs.messages;
        vnode.state.numberOfMessages = vnode.state.messagesArray.length - 1;

    },
    onupdate: function (vnode) {
        //scroll to bottom of messages
        messagesPanel.scrollTop = messagesPanel.scrollHeight;
    },
    view: function (vnode) {

        //sort messages according to time
        vnode.state.messagesArray.sort(function (a, b) {
            return a.time.seconds - b.time.seconds;
        })

        return (
            <div class='messagesPanel' id='messagesPanel'>
                {
                    vnode.state.messagesArray.map(function (message, index) {
                        var messagePargraphs = [];
                        messagePargraphs = message.message;

                        //check if last to create new message animation
                        var isLast = false;
                        if (index === vnode.state.numberOfMessages) {
                            isLast = true;

                        }

                        return (
                            <div class={(isLast) ? 'messageBox newMessage' : 'messageBox'}>
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