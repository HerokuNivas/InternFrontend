import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import "../css/Singlerequest.css";
import video1 from "../Animations/Person.mp4";

export default function Singlerequest({from}){
    let navigate = useNavigate();
    const {user, cookies, setUser, loadingRequest, setLoadingRequest} = useStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === undefined){
            navigate("/");
        }
    })

    async function acceptFun(){
        setLoading(true);
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
          setTimeout(()=>{
            setLoading(false);
        }, 3000);
    }

    async function rejectFun(){
        setLoading(true);
        await axios({
          method: "get",
          url: "https://intern-backend-ten.vercel.app/reject/?user1="+from+"&user2="+user  
        }).then((data)=>({}));
        setTimeout(()=>{
            setLoading(false);
        }, 3000);
    }

    return(
        <div>
            {loading && <video width="50%" height="50%" style={{display: "grid", margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video>}
        {!loading && <div  style={{marginTop: "25px", marginLeft: "30px"}}>
            <div className="requestBox" style={{padding: "10px", paddingBottom: "20px", marginRight: "20px"}}>
            <p style={{fontWeight: "bolder", marginTop: "15px"}}>USER <span style={{color: "#2699c7", fontWeight: "bolder", fontSize: "large"}}>{from}</span> HAS REQUESTED TO PLAY GAME WITH YOU</p>
            <Button variant="contained" onClick={acceptFun} style={{background: "green"}}>Accept</Button>
            <Button variant="contained" onClick={rejectFun} style={{background: "red", marginLeft: "20px"}}>Reject</Button></div>
        </div>}    </div>
    )
}