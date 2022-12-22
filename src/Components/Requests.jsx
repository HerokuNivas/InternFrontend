import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

export default function Requests(){

    const [requests, setRequests] = useState([]);
    const {user} = useStateContext();
    const navigate = useNavigate();

    useEffect(()=>{
        const timeInterval = setTimeout(async () => {
            await axios({
                method: "get",
                url: "http://localhost:5000/myrequests/?user="+user
            }).then((data)=>(setRequests(data)))
        }, 1000);
        return ()=>clearInterval(timeInterval);
    }, [])

    return(
        <div>
            <div>
                <div><div><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/dashboard"))} className="arrowBackRegister"/></div></div>
            </div>
        </div>
    )
}