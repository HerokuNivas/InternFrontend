import React from "react";
import { useEffect } from "react";

export default function EmailVerification({email}){

    useEffect(()=>{
        // eslint-disable-next-line no-undef
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "asynctictactoe@gmail.com",
            Password : "A41716B46FDA1AD53D57045901ACB253905E",
            // SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
            To: email,
            From: "asynctictactoe@gmail.com",
            Subject: "OTP for Verification",
            // eslint-disable-next-line no-undef
            Body: decodeURI("Hello ,%0D%0APlease enter the following code to proceed further [OTP].%0D%0A%0D%0AThanks for using Asynchronous Tic Tac Toe,%0D%0ATeam CHINXTUS.")
        }).then(
          message => alert(message)
        );
    }, [])

    return(
        <div>
            
        </div>    
    )
}