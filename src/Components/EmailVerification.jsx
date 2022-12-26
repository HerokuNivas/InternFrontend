import React from "react";
import { useEffect } from "react";

export default function EmailVerification(){

    useEffect(()=>{
        const name = "John";
        const apellido = "Green";
        const modelo = "Model";
        const talla = "This";
        const obj = {Body : `ADVENTUREBOOTS!
${name} ${apellido}
DATOS DE DISEÑO
Modelo ${modelo}
Talla ${talla}`};
        // eslint-disable-next-line no-undef
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "asynctictactoe@gmail.com",
            Password : "A41716B46FDA1AD53D57045901ACB253905E",
            // SecureToken : "3d7638a5-656f-4a2c-a4a8-858cacaa042a",
            To: "202051197@iiitvadodara.ac.in",
            From: "asynctictactoe@gmail.com",
            Subject: "OTP for Verification",
            // Body: "Hello,<br>Please enter the following OTP to proceed further [OTP].<br><br>Thanks for using Asynchronous Tic Tac Toe,<br>Team CHINXTUS."
            Body: obj.Body
        }).then(
          message => alert(message)
        );
    }, [])

    return(
        <div>
            
        </div>    
    )
}