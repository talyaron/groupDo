// components
import { Mooskal } from "./components/Mooskal/Mooskal";
import { Invitation } from './components/Invitation/Invitation';
import { Selection } from './components/Selection/Selection';
import { Voting } from './components/Voting/Voting';

//Login

import './controls/firebaseLogin'

// Global styles
import "./static/styles/main.scss";

m.route(document.body, "/mooskal", {
    "/mooskal": Mooskal,
    "/invitation/:invitationId": Invitation,
    "/selection/:selectionId": Selection,
    "/voting/:votingId": Voting
})

