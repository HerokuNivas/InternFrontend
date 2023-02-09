import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Singlerequest from "./Singlerequest";
import video1 from "../Animations/Person.mp4";
import { useBeforeunload } from 'react-beforeunload';


export default function Requests(){

    const [requests, setRequests] = useState([]);
    const {user, setUser, cookies, loadingRequest} = useStateContext();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === undefined){
            navigate("/");
        }
    }, []);
    

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
            {loadingRequest && <video width="250px" height="250px" style={{display: "grid", margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video>}
            {!loadingRequest && <div>
                <div><div style={{marginBottom: "50px"}}><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/dashboard"))} className="arrowBackRegister"/></div></div>
                {requests.length === 0 && <div><p className="dashBoardNogames">No Requests Found</p></div>}
                {requests.map((key)=>(
                    <Singlerequest from={key.user1}/>
                ))}
            </div>}
        </div>
    )
}