
import React, { useState } from "react"
import { useParams } from "react-router-dom"
// ended up doing this one functionally instead of creating an object - this is much cleaner and easier to read
// plus I couldnt get the class to work here anyway - was getting multiple invalid call warnings
export default function Room(props) {
  const[votesToSkip,setVotesToSkip] = useState(2)
  const[guestCanPause,setGuestCanPause] = useState(false)
  const[isHost,setIsHost] = useState(false)
  const { code } = useParams()

  fetch('/api/get-room?code='+code)
  .then((response) => response.json())
  .then((data) => {
    setVotesToSkip(data.votes_to_skip);
    setGuestCanPause(data.guest_can_pause);
    setIsHost(data.is_host);
  });

  return <div>
    <h3>Room {code}</h3>
    <p>Votes: {votesToSkip}</p>
    <p>Guest Can Pause: {guestCanPause.toString()}</p>
    <p>Host: {isHost.toString()}</p>
  </div>
}