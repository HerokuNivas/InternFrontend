import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import emailjs from '@emailjs/browser';

export default function EmailVerification({ mail, setVerified, setInside, setEmailError, generateOTP, setGenerateOTP }) {
  const [OTP, setOTP] = useState("");
  const [time, setTime] = useState(60);
  const [sendOTP, setSendOTP] = useState(true);
  const [error, setError] = useState(false);

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
            setVerified(true);
            setInside(false);
            setEmailError(false);
        }
        else{
            setError(true);
        }
    }

    function submitClicked(){
      if(time < 0){
        setTime(60);
    }
        setSendOTP(true);
        setError(false);
        const Generated = Math.floor(100000 + Math.random() * 900000).toString(); 
        setGenerateOTP(Generated);
        // eslint-disable-next-line no-undef
      emailjs.send(process.env.REACT_APP_SERVICE,process.env.REACT_APP_TEMPLATE,{
        otp: Generated,
        email: mail,
        });
    }
 

  return (
    <div>
        <div style={{marginTop: "50px", marginLeft: "50px"}}>
        <ArrowBackIosIcon
              fontSize="small"
              onClick={() => {setInside(false)}}
              className="arrowBackRegister"
            />
      <>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="char"
          disabled={false}
        />
      </>
      {sendOTP && <div style={{marginTop: "25px", marginBottom: "25px", cursor: "pointer"}}>Resend OTP in {time}</div>}
      {!sendOTP && <div style={{marginTop: "25px", marginBottom: "25px", cursor: "pointer", textDecoration: "underline", color: "blue"}} onClick={submitClicked}>Resend OTP</div>}
      <div><Button variant="contained" onClick={verify}>Verify</Button></div>
      {error && <p style={{color: "red"}}>Oops! Enter a valid OTP.</p>}
      <p><span style={{fontWeight: "bold"}}>Note : </span>Please check your spam and promotion folders too.</p>
      </div>
    </div>
  );
}
