import React from "react";
import "../css/Register.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";
import { TextField } from "@mui/material";
import "../css/Login.css";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import video1 from "../Animations/Login.mp4";

export default function Login(){
    let navigate = useNavigate();
    const {user, setUser} = useStateContext();
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const {cookies} = useStateContext();
    

    async function DoLogin(){
        if(user === "" || password === ""){
            setSubmit(true);
            setError(true);
            setUser("");
            setPassword("");
        }
        else{
            setSubmit(true);
            setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user: user})
            };
            await fetch("https://intern-backend-ten.vercel.app/login", requestOptions).then((response) => response.json()).then((responseData) => {
            // if(responseData.success){navigate("/dashboard")} ;setSuccess(responseData.success)
            if(responseData.success.success){
                const bcryptjs = require("bcryptjs");
                bcryptjs.compare(password, responseData.success.password, function(err, result) {
                    if(result){
                        navigate("/dashboard");
                        setSuccess(responseData.success);
                        cookies.set('TicTacToe', user);
                    }
                    else{
                        setSuccess(false);
                    }
                });
            }
            else{
                
                setSuccess(false);
            }
        });
            setLoading(false);
        }
    }

    return(
        <div>
        {!loading && <div>
            <div><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/"))} className="arrowBackRegister"/></div>
            <div className="register">
                <div style={{color: "#2699c7", fontWeight: "bolder"}}>Login</div>
                <div style={{marginTop: "20px", fontSize: "25px", fontWeight: "bolder"}}>Please enter your details!</div>
                <p style={{marginTop: "20px", fontWeight: "bolder"}}>Username</p>
                <TextField style={{width: "250px", marginTop: "-10px"}}
                placeholder= "Type your username here"
                value={user}
                onChange={(e)=>(setUser(e.target.value),
                    setError(true),
                    setSuccess(false),
                    setSubmit(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                <p style={{marginTop: "20px", fontWeight: "bolder"}}>Password</p>
                <TextField style={{width: "250px", marginTop: "-10px"}}
                placeholder= "Type your password here"
                type={showPassword?'text':'password'}
                value={password}
                InputProps={{
                    endAdornment:<InputAdornment position="end"
                    >
                        {showPassword?<VisibilityOffIcon style={{cursor: "pointer", color: "#2699c7"}} onClick={()=>(setShowPassword(false))}/>:<VisibilityIcon style={{cursor: "pointer", color: "#2699c7"}} onClick={()=>(setShowPassword(true))}/>}
                    </InputAdornment>
                }}
                onChange={(e)=>(setPassword(e.target.value),
                    setError(false),
                    setSuccess(false),
                    setSubmit(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                {submit && error && <p style={{color: "red"}}>All details are required.</p>}
                 {(!success && !error) && submit && <p className="errorPara1"><span className="errorText1">Incorrect Details.</span></p>}
                 <p className="registerRegister" onClick={DoLogin} style={{background: true?"#2699c7":"#E0E0E0"}}><span className="registerRegisterText">Login</span></p>
                 <p onClick={()=>(navigate("/forgotpassword"))} style={{color: "#2699c7", textDecoration: "underline", cursor: "pointer"}}>Forgot password?</p>
                 
            </div>
        </div>} 
        {loading && <div><video width="250px" height="250px" className="video1" style={{display: "grid", margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video></div>}</div>   
    )
}