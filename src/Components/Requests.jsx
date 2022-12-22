import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Singlerequest from "./Singlerequest";
import CircularProgress from "@mui/material/CircularProgress";

export default function Requests(){

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useStateContext();
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    })

    useEffect(()=>{
        const timeInterval = setTimeout(async () => {
            await axios({
                method: "get",
                url: "http://localhost:5000/myrequests/?user="+user
            }).then((data)=>(setRequests(data.data.result)))
        }, 1000);
        return ()=>clearInterval(timeInterval);
    })

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