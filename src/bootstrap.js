// components
import { Public } from "./Pages/Public/Public";
import { Starts } from './Pages/Starts/Starts';
import { Groups } from './Pages/Groups/Groups';
import { Group } from './Pages/Group/Group';
import './main.css';


//Login

import './controls/firebaseLogin'

// Global styles
import "./static/styles/main.scss";

m.route(document.body, "/public", {
    "/public": Public,
    "/starts": Starts,
    "/groups": Groups,
    "/group/:id": Group
})

