import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Singlerequest from "./Singlerequest";
import PersonJson from "../LottieJson/Person.json";
import Lottie from "react-lottie-player";
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
            {loadingRequest && <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}><div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}><Lottie
            loop
            animationData={PersonJson}
            play
            style={{ width: "250px", height: "250px", marginTop: "25%" }}
          /></div></div>}
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