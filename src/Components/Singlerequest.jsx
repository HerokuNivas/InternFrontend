import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../css/Singlerequest.css";
import video1 from "../Animations/Person.mp4";

export default function Singlerequest({from}){
    let navigate = useNavigate();
    const {user, cookies, setUser, loadingRequest, setLoadingRequest} = useStateContext();

    useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === undefined){
            navigate("/");
        }
    })

    async function acceptFun(){
        setLoadingRequest(true);
        await axios({
          method: "get",
          url: "https://intern-backend-ten.vercel.app/accept/?user1="+from+"&user2="+user  
        }).then((data)=>({}));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user1: from, user2: user, current: from, time: new Date().toLocaleString()})
          };
          await fetch("https://intern-backend-ten.vercel.app/creategame", requestOptions).then((response) => response.json()).then((responseData) => {});
          setLoadingRequest(false);
        setLoadingRequest(false);
    }

    async function rejectFun(){
        setLoadingRequest(true);
        await axios({
          method: "get",
          url: "https://intern-backend-ten.vercel.app/reject/?user1="+from+"&user2="+user  
        }).then((data)=>({}));
        setLoadingRequest(false);
    }

    return(
        <div>
            {loadingRequest && <video width="50%" height="50%" style={{display: "grid", margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video>}
        {!loadingRequest && <div  style={{marginTop: "25px", marginLeft: "30px"}}>
            <div className="requestBox" style={{padding: "10px", paddingBottom: "20px", marginRight: "20px"}}>
            <p style={{fontWeight: "bolder", marginTop: "15px"}}>USER <span style={{color: "#2699c7", fontWeight: "bolder", fontSize: "large"}}>{from}</span> HAS REQUESTED TO PLAY GAME WITH YOU</p>
            <Button variant="contained" onClick={acceptFun} style={{background: "green"}}>Accept</Button>
            <Button variant="contained" onClick={rejectFun} style={{background: "red", marginLeft: "20px"}}>Reject</Button></div>
        </div>}    </div>
    )
}