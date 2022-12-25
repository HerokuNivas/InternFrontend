import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Singlerequest from "./Singlerequest";
import CircularProgress from "@mui/material/CircularProgress";
import { useBeforeunload } from 'react-beforeunload';

export default function Requests(){

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, setUser, cookies} = useStateContext();
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    })

    useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === ''){
            navigate("/");
        }
    })
    

    useEffect(()=>{
        const timeInterval = setTimeout(async () => {
            await axios({
                method: "get",
                url: "https://intern-backend-ten.vercel.app/myrequests/?user="+user
            }).then((data)=>(setRequests(data.data.result)))
        }, 0);
        return ()=>clearInterval(timeInterval);
    })

    useBeforeunload((event) => {
        if ( user !== "") {
            setUser(user);
            navigate("/requests");
        }
      });

    return(
        <div>
            {loading && <CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/>}
            {!loading && <div>
                <div><div style={{marginBottom: "50px"}}><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/dashboard"))} className="arrowBackRegister"/></div></div>
                {requests.length === 0 && <div><p className="dashBoardNogames">No requests found</p></div>}
                {requests.map((key)=>(
                    <Singlerequest from={key.user1}/>
                ))}
            </div>}
        </div>
    )
}