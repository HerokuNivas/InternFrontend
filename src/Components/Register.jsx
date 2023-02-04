import React, { useState } from "react";
import "../css/Register.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";
import { TextField, unsupportedProp } from "@mui/material";
import { useStateContext } from "../ContextProvider/ContextProvider";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import EmailVerification from "./EmailVerification";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import video1 from "../Animations/Register.mp4";

export default function Register(){
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {user, setUser, cookies} = useStateContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [validate, setValidate] = useState(false);
    const [inside, setInside] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [minimumLength, setMinimumLenght] = useState(false);
    const [number, setNumber] = useState(false);
    const [generateOTP, setGenerateOTP] = useState("");
    const [fieldsError, setFieldsError] = useState(false);


    useEffect(()=>{
        setUser("");
    }, []);

    useEffect(()=>{
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        for(var i=0; i < password.length; i++){
            if(password[i] >= 'A' && password[i] <= 'Z'){
                count1 = count1+ 1;
            }
            if(password[i] >= 'a' && password[i] <= 'z'){
                count2 = count2 + 1;
            }
            if(password[i] >= '0' && password[i] <= '9'){
                count3 = count3 + 1;
            }
            
        }
        if(count1 >= 1){
            setUpperCase(true);
        }
        else{
            setUpperCase(false);
        }
        if(count2 >= 1){
            setLowerCase(true);
        }
        else{
            setLowerCase(false);
        }
        if(count3 >= 1){
            setNumber(true);
        }
        else{
            setNumber(false);
        }
        if(password.length >= 8){
            setMinimumLenght(true);
        }
        else{
            setMinimumLenght(false);
        }
    }, [password])

    useEffect(()=>{
        var validator = require("email-validator");
        if(validator.validate(mail)){
            setValidate(true);
        }
    }, [mail])
   
    function functionEmail(){
        if(!validate || verified) return;
        else{
            const Generated = Math.floor(1000 + Math.random() * 9000).toString(); 
        setGenerateOTP(Generated);
        // eslint-disable-next-line no-undef
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "tictactoeasync@gmail.com",
        Password: "3BAB6C51A68988DC48324CF4A0D7E16E5A4F",
        // SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
        To: mail,
        From: "tictactoeasync@gmail.com",
        Subject: "OTP for Verification",
        // eslint-disable-next-line no-undef
        Body: decodeURI(
          "Hello ,Please enter the following OTP : "+Generated+" to proceed further.Do not share this OTP with anyone. Thanks for using Asynchronous Tic Tac Toe."
        ),
      }).then();
            setInside(true);
        }
    }
    

    async function registerClicked(){
        if(!verified){
            setEmailError(true);
            return;
        }
        if(!upperCase || !lowerCase || !number || !minimumLength){
            setFieldsError(true);
            return;
        }
        setLoading(true);
        if(name === "" || mail === "" || password === "" || user === ""){
            setError(true);
            setLoading(false);
        }
        else{
            for(var i=0; i < user.length; i++){
                if((user[i] >= 'A' && user[i] <= 'Z') || (user[i] >= 'a' && user[i] <= 'z') || (user[i] >= '0' && user[i]<='z') || (user[i] == '_'))
                    continue;
                else{
                    setError1(true);
                    setLoading(false);
                    return;
                }
            }
            const bcrypt = require ('bcryptjs');
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({UserName : user, Email: mail, Name: name, Password: hash})
                  };
                  await fetch("https://intern-backend-ten.vercel.app/insertUser", requestOptions).then((response) => response.json()).then((responseData) => {if(responseData.success){setTimeout(() => {
                    navigate("/login");
                  }, 1000);} ;setSuccess(responseData.success); setErrorMessage(responseData.message)});
                  setLoading(false);
            });  
            
        }
    }

    return(
        <div>
            {loading && <div><video width="250px" height="250px"  className="video1" style={{display: "grid",  margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video></div>}
            {!inside && !loading && <div>
            <div><ArrowBackIosIcon fontSize="small" onClick={()=>(navigate("/"))} className="arrowBackRegister"/></div>
            <div className="register">
                <div style={{color: "#2699c7", fontWeight: "bolder"}}>Create account</div>
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
                    setError(false),
                    setError1(false))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                <p style={{marginTop: "2px", fontSize: "15px"}}>Username can contain alpha numeric characters and underscore.</p>
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
                InputProps={{
                    endAdornment:<InputAdornment position="end"
                    >
                        {verified &&  <CheckCircleIcon style={{color: "green"}}/>}
                    </InputAdornment>
                }}
                />
                <Button variant="contained" style={{background: (validate&&!verified)?"green":"#C0C0C0", display: "block", marginTop: "10px"}} onClick={functionEmail}>Verify Email</Button>
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
                    setError(false),
                    setFieldsError(false))}
                placeholder= "Type your password here"
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
                <p>{upperCase?<CheckIcon style={{color: "green", marginRight: "5px"}}/>:<CloseIcon style={{color: "red"}}/>}Password must contain atleast one uppercase letter.</p>
                <p>{lowerCase?<CheckIcon style={{color: "green", marginRight: "5px"}}/>:<CloseIcon style={{color: "red"}}/>}Password must contain atleast one lowercase letter.</p>
                <p>{number?<CheckIcon style={{color: "green", marginRight: "5px"}}/>:<CloseIcon style={{color: "red"}}/>}Password must contain atleast one number.</p>
                <p>{minimumLength?<CheckIcon style={{color: "green", marginRight: "5px"}}/>:<CloseIcon style={{color: "red"}}/>}Password must be of minimum 8 characters.</p>
                {error && <p style={{color: "red"}}>All details are required.</p>}
                {EmailError && <p style={{color: "red"}}>Please verify your email.</p>}
                {fieldsError && <p style={{color: "red"}}>Please enter the password that statisy the requirements.</p>}
                {error1 && <p style={{color: "red"}}>Make sure your username satisfy requirements.</p>}
                 {success && <p className="successPara1"><span className="successText1">Congratulations! Account Created.</span></p>}
                 {!success && <p style={{color: "red"}}>{errorMessage}</p>}
                 <p className="registerRegister" onClick={registerClicked} style={{background: !success?"#2699c7":"#E0E0E0"}}><span className="registerRegisterText">Register</span></p>
                 
            </div></div>}
            {inside && !loading && <EmailVerification mail={mail} setVerified={setVerified} setInside={setInside} setEmailError={setEmailError} generateOTP={generateOTP} setGenerateOTP={setGenerateOTP}/>}
        </div>    
    )
}