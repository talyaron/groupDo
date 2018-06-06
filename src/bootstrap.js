// components
import { Public } from "./Pages/Main/Public/Public";
import { Starts } from './Pages/Main/Starts/Starts';
import { Groups } from './Pages/Main/Groups/Groups';
import { Group } from './Pages/Group/Group';
import { Chats } from './Pages/Main/Chats/Chats';
import './main.css';


//Login

import './controls/firebaseLogin'

// Global styles
import "./static/styles/main.scss";

m.route(document.body, "/public", {
    "/public": Public,
    "/starts": Starts,
    "/groups": Groups,
    "/group/:id": Group,
    '/chat': Chats
})

