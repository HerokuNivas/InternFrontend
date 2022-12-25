import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useBeforeunload } from 'react-beforeunload';

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
        if(cookies.get('TicTacToe') === ''){
            navigate("/");
        }
    }, [])
    

    async function functionCall(){
        setLoading(true);
        setSubmit(true);
        await axios({
            method: "get",
            url: "https://intern-backend-ten.vercel.app/requests/?user="+user+"&email="+email
        }).then((data)=>(setSuccess(data.data.success), setMessage(data.data.message)))
        setLoading(false);

    }

    let navigate = useNavigate();
    return(
        <div>
            {loading && <CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/>}
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
            </div>
            {submit && success && <p style={{color: "green", marginLeft: "25px", marginTop: "25px"}}>{message}</p>}
            {submit && !success && <p style={{color: "red", marginLeft: "25px", marginTop: "25px"}}>{message}</p>}
            <p className="mainSendRequest" onClick={functionCall} style={{marginTop: "30px"}}><span className="mainLoginText" style={{marginLeft: "-30px"}}>Send request</span></p></div>
            }
        </div>
    )
}