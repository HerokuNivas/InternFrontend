import React, { useState } from "react";
import "../css/Register.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";
import { TextField } from "@mui/material";
import { useStateContext } from "../ContextProvider/ContextProvider";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react";

export default function Register(){
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {user, setUser} = useStateContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setUser("");
    }, []);

    async function registerClicked(){
        setLoading(true);
        if(name === "" || mail === "" || password === "" || user === ""){
            setError(true);
            setLoading(false);
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({UserName : user, Email: mail, Name: name, Password: password})
              };
              await fetch("https://intern-backend-ten.vercel.app/insertUser", requestOptions).then((response) => response.json()).then((responseData) => {if(responseData.success){setTimeout(() => {
                navigate("/login");
              }, 1000);} ;setSuccess(responseData.success); setErrorMessage(responseData.message)});
              setLoading(false);
        }
    }

    return(
        <div>
            {loading && <div><CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/></div>}
            {!loading && <div>
            <div><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/"))} className="arrowBackRegister"/></div>
            <div className="register">
                <div>Create account</div>
                <div style={{marginTop: "20px", fontSize: "25px", fontWeight: "bolder"}}>Let’s get to know you better!</div>
                <p style={{marginTop: "20px", fontWeight: "bolder"}}>Your name</p>
                <TextField style={{width: "250px", marginTop: "-10px"}}
                placeholder= "Type your name here"
                value={name}
                onChange={(e)=>(setName(e.target.value),
                    setError(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}/>
                <p style={{marginTop: "20px", fontWeight: "bolder"}}>Username</p>
                <TextField style={{width: "250px", marginTop: "-10px"}}
                placeholder= "Type your username here"
                value={user}
                onChange={(e)=>(setUser(e.target.value),
                    setError(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                <p style={{marginTop: "20px", fontWeight: "bolder"}}>Email</p>
                <TextField style={{width: "250px", marginTop: "-10px"}}
                placeholder= "Type your email here"
                value={mail}
                onChange={(e)=>(setMail(e.target.value),
                    setError(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                <p style={{marginTop: "20px", fontWeight: "bolder"}}>Password</p>
                <TextField style={{width: "250px", marginTop: "-10px"}}
                value={password}
                type={showPassword?'text':'password'}
                InputProps={{
                    endAdornment:<InputAdornment position="end"
                    >
                        {showPassword?<VisibilityOffIcon style={{cursor: "pointer"}} onClick={()=>(setShowPassword(false))}/>:<VisibilityIcon style={{cursor: "pointer"}} onClick={()=>(setShowPassword(true))}/>}
                    </InputAdornment>
                }}
                onChange={(e)=>(setPassword(e.target.value),
                    setError(false))}
                placeholder= "Type your password here"
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                {error && <p style={{color: "red"}}>All details are required.</p>}
                 {success && <p className="successPara1"><span className="successText1">Congratulations! Account Created.</span></p>}
                 {!success && <p style={{color: "red"}}>{errorMessage}</p>}
                 <p className="registerRegister" onClick={registerClicked} style={{background: !success?"#f2c94c":"#E0E0E0"}}><span className="registerRegisterText">Register</span></p>
            </div></div>}
        </div>    
    )
}