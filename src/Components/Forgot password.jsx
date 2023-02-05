import React from "react";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useEffect } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function Forogt(){
    let navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");

    const [OTP, setOTP] = useState("");
    const [time, setTime] = useState(60);
    const [sendOTP, setSendOTP] = useState(false);
    const [error1, setError1] = useState(false);
    const [passSubmit, setPassSubmit] = useState(false);
    const [password, setPassword] = useState("");

    const [fields, setFields] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [minimumLength, setMinimumLenght] = useState(false);
    const [number, setNumber] = useState(false);

    const [changed, setChanged] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [generateOTP, setGenerateOTP] = useState("");

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
        const timeInvterval = setInterval(async () => {
            if(time < 0){
                setTime(60);
            }
            if(time === 0){
                setTime(60);
                setSendOTP(false);
            }
            if(sendOTP){
                const val = time-1;
                setTime(val);
            }
        }, 1000);
        return () => clearInterval(timeInvterval);
        });
        
        function verify(){
            if(generateOTP === OTP){
                setPassSubmit(true);
                setTime(60);
                setSendOTP(false);
            }
            else{
                setError1(true);
            }
        }

        function PasswordClicked(){
            setLoading(true);
            if(!upperCase || !lowerCase || !number || !minimumLength){
                setFields(true);
                return;
            }
            else{
                const bcrypt = require ('bcryptjs');
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, async function(err, hash) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({user : userName, password: hash})
                  };
                  await fetch("https://intern-backend-ten.vercel.app/passwordChange", requestOptions).then((response) => response.json()).then((responseData) => {
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                })
                setChanged(true);
                  setLoading(false);
            });  
            }
        }

        function submitClicked(){
            setSendOTP(true);
            setError1(false);
            const Generated = Math.floor(1000 + Math.random() * 9000).toString(); 
            setGenerateOTP(Generated);
            // eslint-disable-next-line no-undef
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "tictactoeasync@gmail.com",
            Password: "3BAB6C51A68988DC48324CF4A0D7E16E5A4F",
            // SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
            To: email,
            From: "tictactoeasync@gmail.com",
            Subject: "OTP to Change password",
            // eslint-disable-next-line no-undef
            Body: decodeURI(
              "Hello ,Please enter the following OTP : "+Generated+" to proceed further.Do not share this OTP with anyone. Thanks for using Asynchronous Tic Tac Toe."
            ),
          }).then();
        }

    async function submitFun(){
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: userName})
        };
        await fetch("https://intern-backend-ten.vercel.app/login", requestOptions).then((response) => response.json()).then((responseData) => {
            if(responseData.success.success === false){
                setError(true);
            }
            else{
                setSubmit(true);
                setEmail(responseData.success.email);
                setSendOTP(true);
            setError1(false);
            const Generated = Math.floor(1000 + Math.random() * 9000).toString(); 
            setGenerateOTP(Generated);
            // eslint-disable-next-line no-undef
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "tictactoeasync@gmail.com",
            Password: "3BAB6C51A68988DC48324CF4A0D7E16E5A4F",
            // SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
            To: responseData.success.email,
            From: "tictactoeasync@gmail.com",
            Subject: "OTP to Change password",
            // eslint-disable-next-line no-undef
            Body: decodeURI(
              "Hello ,Please enter the following OTP : "+Generated+" to proceed further.Do not share this OTP with anyone. Thanks for using Asynchronous Tic Tac Toe."
            ),
          }).then();
            }
        })
        setLoading(false);
    }

    return(
        <div>
            {loading && <div><CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/></div>}
            {!loading && !submit && !passSubmit && <div><ArrowBackIosIcon onClick={()=>(navigate("/login"))} style={{marginLeft: "10px", marginTop: "10px"}}/>
            <div>
            <TextField style={{width: "250px", marginTop: "10px", marginLeft: "25px"}}
                placeholder= "Type your username here"
                value={userName}
                onChange={(e)=>(setUserName(e.target.value))}
                inputProps={{
                    style: {
                        height: "10px"
                    }
                }}
                />
            </div>
            {error && <p style={{color: "red", marginLeft: "10px"}}>Oops! We cannot find your user name.</p>}
            <Button variant="contained" onClick={submitFun} style={{marginLeft: "25px", marginTop: "25px", background: "#2699c7"}}>Send OTP</Button>
            </div>}
            {!loading && submit && !passSubmit && <div><ArrowBackIosIcon onClick={()=>{setSubmit(false); setSendOTP(false); setTime(60)}} style={{marginLeft: "10px", marginTop: "10px"}}/>
            <p style={{marginLeft: "25px"}}>OTP sent to {email}</p>
            <div style={{marginTop: "50px", marginLeft: "50px"}}>
                
      <>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={4}
          otpType="char"
          disabled={false}
        />
      </>
      {sendOTP && <div style={{marginTop: "25px", marginBottom: "25px", cursor: "pointer"}}>Resend OTP in {time}</div>}
      {!sendOTP && <div style={{marginTop: "25px", marginBottom: "25px", cursor: "pointer", textDecoration: "underline", color: "blue"}} onClick={submitClicked}>Resend OTP</div>}
      <div><Button variant="contained" style={{background: "#2699c7"}} onClick={verify}>Verify</Button></div>
      {error1 && <p style={{color: "red"}}>Oops! Enter a valid OTP.</p>}
      <p><span style={{fontWeight: "bold"}}>Note : </span>Please check your spam and promotion folders too.</p>
      </div>
            </div>}
            {!loading && passSubmit && <div style={{marginLeft: "25px", marginTop: "25px"}}>
            <ArrowBackIosIcon onClick={()=>(setPassSubmit(false), setSubmit(false))} style={{marginTop: "10px"}}/>
                <TextField style={{width: "250px", marginTop: "35px"}}
                placeholder= "Enter your new password here"
                type={showPassword?'text':'password'}
                value={password}
                InputProps={{
                    endAdornment:<InputAdornment position="end"
                    >
                        {showPassword?<VisibilityOffIcon style={{cursor: "pointer"}} onClick={()=>(setShowPassword(false))}/>:<VisibilityIcon style={{cursor: "pointer"}} onClick={()=>(setShowPassword(true))}/>}
                    </InputAdornment>
                }}
                onChange={(e)=>(setPassword(e.target.value),
                    setFields(false),
                    setSubmit(false))}
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
                {fields && <p style={{color: "red"}}>Set password that satisfy all required fields.</p>}
                <Button variant="contained" style={{background: changed?"green":"#2699c7"}} onClick={PasswordClicked}>{changed===false?"Submit":"Verified"}</Button>
                </div>}
        </div>    
    )
}