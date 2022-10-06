
import React,{useState} from 'react'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'
import {Link, useNavigate} from "react-router-dom"

export const CreateRoomPage = () => {
  //must be top level - this one was a noodle scratcher for a while
  const navigate = useNavigate()

  let defaultVotes = 2
  const [backData,setBackData]=useState({
    guestCanPause: true,
    votesToSkip:defaultVotes
  })

  const handleVotesChange=(e)=>{
    //without persist it will keep triggering every keystroke and error saying e is null
    e.persist();
    setBackData(data=>({
      ...data,
      votesToSkip:e.target.value
    }))
  }

  const handleGuestCanPauseChange=(e)=>{
    e.persist();
    setBackData(data=>({
      ...data,
      guestCanPause:e.target.value=='true'?true:false
    }))
  }

  const handleRoomButtonPressed=async()=>{
    const feedBack = await fetch('api/create-room', {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        votes_to_skip:backData.votesToSkip,
        guest_can_pause:backData.guestCanPause
      })
    })
    const JsonFeedBack = await feedBack.json()
    console.log("JsonFeedBack")
    console.log(JsonFeedBack)
    let newRoom = JsonFeedBack.code
    let path = '/room/' + newRoom; 
    navigate(path)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">
              Guest control of playback state
            </div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}>
              <FormControlLabel value="true"
                control={
                  <Radio color="primary"/>
                }
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel value="false"
                control={
                  <Radio color="secondary"/>
                }
                label="No Control"
                labelPlacement="bottom"
                />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{
              min:1,
              style:{
                textAlign:"center"
              }
            }}
          />
          <FormHelperText>
            <div align="center">
              Votes required to skip song
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={
              handleRoomButtonPressed
          }
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  )
}
export default CreateRoomPage