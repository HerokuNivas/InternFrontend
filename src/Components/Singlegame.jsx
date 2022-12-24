import React from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useState } from "react";
import "../css/SingleBoard.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Singlegame({user1, user2, current, winby, board, time, id}){

    let navigate = useNavigate();

    
    const {user} = useStateContext();
    const [opponent, setOpponent] = useState("");

    
    useEffect(()=>{
        if(user === user1) setOpponent(user2);
        else setOpponent(user1);
    }, [])

    useEffect(()=>{
        if(user === ""){
            navigate("/login");
        }
    }, [])
     

    return(
        <div className="singleBoardLayout" style={{marginTop: "20px", marginLeft: "10px"}}>
            <p style={{fontSize: "20px", fontWeight: "bolder", marginTop: "-10px"}}>Game with {opponent}</p>
            {current===opponent && winby==="" && <div style={{marginTop: "-40px", fontSize: "15px"}}><p>You have made your move!</p><p>Waiting for them.</p></div>}
            {current===user && winby==="" && <div style={{marginTop: "-40px", fontSize: "15px"}}><p>{opponent} just made their move!</p><p>It's your turn to play now.</p></div>}
            {winby!=="" && winby===opponent && <div style={{marginTop: "-20px", fontSize: "15px"}}><p>{opponent} won!</p></div>}
            {winby!=="" && winby===user && <div style={{marginTop: "-20px", fontSize: "15px"}}><p>You won!</p></div>}
            {winby==="draw" && <div style={{marginTop: "-20px", fontSize: "15px"}}><p>It's a Draw!</p></div>}
            <p style={{marginTop: "-20px"}}>{time}</p>
            {(winby!=="" || current===opponent) && <p className="gameView"><Link to={"/games/"+id} style={{textDecoration: "none"}} state={{user1Is: user1, user2Is: user2, currentIs: current, winbyIs: winby, boardIsIs: board, id: id}}><span className="mainLoginText">View game</span></Link></p>}
            {(winby==="" && current===user) && <p className="gameView"><Link to={"/games/"+id} style={{textDecoration: "none"}} state={{user1Is: user1, user2Is: user2, currentIs: current, winbyIs: winby, boardIsIs: board, id: id}}><span className="mainLoginText">Play!</span></Link></p>}
        </div>    
    )
}