import React from "react";
import { useEffect } from "react";

export default function EmailVerification(){

    useEffect(()=>{
        // eslint-disable-next-line no-undef
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "asynctictactoe@gmail.com",
            Password : "A41716B46FDA1AD53D57045901ACB253905E",
            // SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
            To: "202051197@iiitvadodara.ac.in",
            From: "asynctictactoe@gmail.com",
            Subject: "OTP for Verification",
            Body: "Hello,\nPlease enter the following OTP to proceed further [OTP].\n\nAThanks for using Asynchronous Tic Tac Toe,\nTeam CHINXTUS."
        }).then(
          message => alert(message)
        );
    }, [])

    return(
        <div>
            
        </div>    
    )
}