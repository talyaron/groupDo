// components
import { Public } from "./Pages/Public/Public";
import { Starts } from './Pages/Statrts/Starts';
import { Groups } from './Pages/Groups/Groups';


//Login

import './controls/firebaseLogin'

// Global styles
import "./static/styles/main.scss";

m.route(document.body, "/public", {
    "/public": Public,
    "/starts": Starts,
    "/groups": Groups
})

