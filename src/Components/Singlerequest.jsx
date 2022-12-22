import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function Singlerequest({from}){

    const {user} = useStateContext();
    const [loading, setLoading] = useState(false);

    async function acceptFun(){
        setLoading(true);
        await axios({
          method: "get",
          url: "http://localhost:5000/accept/?user1="+from+"&user2="+user  
        }).then((data)=>({}));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user1: from, user2: user, current: from, time: new Date().toLocaleString()})
          };
          await fetch("http://localhost:5000/creategame", requestOptions).then((response) => response.json()).then((responseData) => {});
          setLoading(false);
        setLoading(false);
    }

    async function rejectFun(){
        setLoading(true);
        await axios({
          method: "get",
          url: "http://localhost:5000/reject/?user1="+from+"&user2="+user  
        }).then((data)=>({}));
        setLoading(false);
    }

    return(
        <div>
            {loading && <CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/>}
        {!loading && <div style={{marginTop: "25px", marginLeft: "30px"}}>
            <p style={{fontWeight: "bolder"}}>USER {from} HAS REQUESTED TO PLAY GAME WITH YOU</p>
            <Button variant="contained" onClick={acceptFun} style={{background: "green"}}>Accept</Button>
            <Button variant="contained" onClick={rejectFun} style={{background: "red", marginLeft: "20px"}}>Reject</Button>
        </div>}    </div>
    )
}