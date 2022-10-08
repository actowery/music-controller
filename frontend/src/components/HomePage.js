import React, { Component } from 'react'
// for some reason CreateRoomPage did not require brackets around it, but join did... 
//so i did it to both for consistency
import {RoomJoinPage} from './RoomJoinPage'
import {CreateRoomPage} from './CreateRoomPage'
import './Room';
import { Grid, Button, ButtonGroup, Typography} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Routes, // fka switch
  Route,
  Link,
  Redirect,
} from "react-router-dom"

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
    }
  }

  //we dont want to wait on this to finish 
  async componentDidMount() {
    fetch('/api/user-in-room')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        code: data.code
      })
    })
  }


  renderHomePage() {

    if (this.state.code) {

      return (

        <Navigate to={`/room/${this.state.code}`} replace={true}/>

      );

    } else {

      return (

        <Grid container spacing={3}>

          <Grid item xs={12} align="center">

            <Typography variant="h3" compact="h3">

              House Party

            </Typography>

          </Grid>

          <Grid item xs={12} align="center">

            <ButtonGroup disableElevation variant="contained" color="primary">

              <Button color="primary" to="/join" component={Link}>

                Join a Room

              </Button>

              <Button color="secondary" to="/create" component={Link}>

                Create a Room

              </Button>

            </ButtonGroup>

          </Grid>

        </Grid>

      );

    }

  } 



  render() {

      return (

        <Router>

          <Routes>

            <Route exact path="/" element={this.state.code ? (<Navigate replace to={`/room/${this.state.code}`} />) : this.renderHomePage()} /> 
          
            <Route path="/join" element={<RoomJoinPage />} />

            <Route path="/create" element={<CreateRoomPage />} />

            <Route path="/room/:code" element={< Room />} /> 

          </Routes>

        </Router>

      );

  }
}
