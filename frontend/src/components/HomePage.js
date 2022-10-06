import React, { Component } from "react";
// for some reason CreateRoomPage did not require brackets around it, but join did... 
//so i did it to both for consistency
import {RoomJoinPage} from "./RoomJoinPage";
import {CreateRoomPage} from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Routes, // fka switch
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // routes are the new syntax, component is now element and the element has to be in html style
      // e.g. `element={< RoomJoinPage />}` is now corect and  `component={RoomJoinPage}` is not
      <Router>
        <Routes>
          <Route exact path="/" element={<p>This is the home page</p>} />
          <Route path="/join" element={< RoomJoinPage />} />
          <Route path="/create" element={< CreateRoomPage />} />
          <Route path="/room/:code" element={< Room />} />
        </Routes>
      </Router>
    );
  }
}
