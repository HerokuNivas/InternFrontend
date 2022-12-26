import React from "react";
import { useEffect } from "react";

export default function EmailVerification(){

    useEffect(()=>{
        // eslint-disable-next-line no-undef
        Email.send({
            SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
            To: "vsnsainivasand2003@gmail.com",
            From: "asynctictactoe@gmail.com",
            Subject: "OTP for Asynchronous Tic Tac Toe",
            Body: "Hello,\nPlease enter the following OTP to proceed further [OTP].\n\nThanks for using Asynchronous Tic Tac Toe,\nTeam CHINXTUS."
        }).then(
          message => alert(message)
        );
    }, [])

    return(
        <div>
            
        </div>    
    )
}