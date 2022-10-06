import React, { useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'

export const RoomJoinPage = () => {

  const navigate = useNavigate()
  let defaultString = ''
  const [backData,setBackData]=useState({
    code:defaultString,
    err:defaultString
  })

  const handleTextFieldChange=(e) => {
    e.persist();
    setBackData(data=>({
      ...data,
      code:e.target.value
    }))
  }

  const roomButtonPressed=async() => {
    console.log('backData.code')
    console.log(backData.code)
    const feedBack = await fetch('api/join-room', {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        code:backData.code,
      })
    }).then((response) => {
      if (response.ok) {
        let path = '/room/' + backData.code
        navigate(path)
      } else {
        setBackData(data=>({
          ...data,
          err:"Room not Found"
        }))
        console.log(response)
      }
    })
    .catch((error) => {
      console.log("error!!!!!!!");
      console.log(error);
    });


  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            error={backData.err}
            label="Code"
            placeholder="Enter a Room Code"
            defaultValue={defaultString}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
          <FormHelperText>
            <div align="center">
              {backData.err}
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );}

