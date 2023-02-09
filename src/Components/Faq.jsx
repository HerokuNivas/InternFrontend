import React from "react";

export default function Faq(){
    return(
        <div style={{marginLeft: "25px", marginRight: "25px"}}>
            <p style={{fontSize: "30px", color: "#2699c7", fontWeight: "bolder"}}>Frequently Asked Questions ❓❓</p>
            <p style={{fontSize: "20px", color: "red"}}>1) What advantage this game provide over normal tic tac toe?</p>
            <p style={{fontSize: "22px", color: "black"}}>A) Every game played by you will be stored, which can later on be used by you to <span style={{color: "#2699c7"}}>analyze, improve</span> yourself.</p>
            <p style={{fontSize: "20px", color: "red"}}>2) How to send request to my friend?</p>
            <p style={{fontSize: "22px", color: "black"}}>A) Make sure that your friend also created account with us, ask him for the email,
            then there is <span style={{color: "#2699c7"}}>New Game</span> option at bottom right corner, add your friend's email and send request.</p>
            <p style={{fontSize: "20px", color: "red"}}>3) Though I sent request why is the game not visible in dashboard?</p>
            <p style={{fontSize: "22px", color: "black"}}>A) Your friend needs to accept the request to create a game and get started. If the game is still not visible even after accepting the request then please drop a mail to us at
            <a href="mailto:tictactoeasync@gmail.com" style={{textDecoration: "none", color: "inherit"}}><span style={{color: "#2699c7"}}> tictactoeasync@gmail.com</span></a>.</p>
            <p style={{fontSize: "20px", color: "red"}}>4) Can I play different games with different users at same time?</p>
            <p style={{fontSize: "22px", color: "black"}}>A) Yes, you can do that. In dashboard <span style={{color: "#2699c7"}}>Click all the games you need to play</span>, they will be opening in different tabs which allows you to play the games simultaneously with different users.</p>
            <p style={{fontSize: "20px", color: "red"}}>5) How can I send request to AI?</p>
            <p style={{fontSize: "22px", color: "black"}}>A) You can send request to mail <span style={{color: "#2699c7"}}>async.ai.com</span>.</p>
            <p style={{fontSize: "20px", color: "red"}}>6) Can I win game with AI?</p>
            <p style={{fontSize: "22px", color: "black"}}>A) No, <span style={{color: "#2699c7"}}>We made sure that AI will never lose</span>.</p>
        </div>    
    )
}