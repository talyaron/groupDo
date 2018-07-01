// components
import { Public } from "./Pages/Main/Public/Public";
import { Starts } from './Pages/Main/Starts/Starts';
import { Groups } from './Pages/Main/Groups/Groups';
import { Group } from './Pages/Group/Group';
import { Activity } from './Pages/Activity/Activity';
import { Chats } from './Pages/Main/Chats/Chats';
import { Chat } from './Pages/Chat/Chat';
import { Login } from './Pages/Login/Login';
import './main.css';

import store from './data/store';


//Login

import './controls/firebaseLogin'
// console.log('user:')
// store.user = JSON.parse(sessionStorage.getItem('user'));
// console.dir(store.user)

// Global styles
import "./static/styles/main.scss";

m.route(document.body, "/starts", {
    "/public": Public,
    "/starts": Starts,
    '/activity/:id': Activity,
    '/chats': Chats,
    '/chat/:id': Chat,
    '/login': Login
})

