import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import video1 from "../Animations/Find.mp4";
export default function NewGame(){

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user, setUser, cookies} = useStateContext();
    const [message, setMessage] = useState("");
    
    

      useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === undefined){
            navigate("/");
        }
    }, [])
    

    async function functionCall(){
        setLoading(true);
        setSubmit(true);
        await axios({
            method: "get",
            url: "https://intern-backend-ten.vercel.app/requests/?user="+user+"&email="+email
        }).then((data)=>{
            setSuccess(data.data.success); 
            setMessage(data.data.message)
            if(data.data.success){
                setTimeout(() => {
                    navigate("/dashboard");    
                }, 3000);
            }
        })
        setLoading(false);
    }

    let navigate = useNavigate();
    return(
        <div>
            {loading && <video width="250px" height="250px" className="video1" style={{dispaly: "grid", margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video>}
            {!loading && <div><div><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/dashboard"))} className="arrowBackRegister"/></div>
            <div style={{marginTop: "50px", marginLeft: "30px", fontWeight: "bold", fontSize: "larger", marginRight: "30px"}}>
                <p>Start a new game</p>
                <p style={{fontSize: "25px"}}>Whom do you want to play with?</p>
                <p>Email</p>
                <TextField placeholder="Type their email here"
                style={{width: "250px"}}
                value={email}
                onChange={(e)=>(setEmail(e.target.value), setSubmit(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}/>
                <p style={{fontWeight: "normal", color: "#2966c7"}}>Note : Please Enter "async.ai.com" in Email to play game with our AI.</p>
            </div>
            {submit && success && <p style={{color: "green", marginLeft: "25px", marginTop: "25px", fontWeight: "bold"}}>{message}. Redirecting in 3 seconds.</p>}
            {submit && !success && <p style={{color: "red", marginLeft: "25px", marginTop: "25px", fontWeight: "bold"}}>{message}</p>}
            <p className="mainSendRequest" onClick={functionCall} style={{marginTop: "30px"}}><span className="mainLoginText" style={{marginLeft: "-30px"}}>Send request</span></p></div>
            }
        </div>
    )
}