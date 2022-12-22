import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useEffect } from "react";

export default function Gameclick(){
    const location = useLocation();
    const {user1, user2, current, winby, board, time, id} = location.state
    const {user} = useStateContext();
    const [opponent, setOpponent] = useState("");
    const [piece, setPiece] = useState("");
    useEffect(()=>{
        if(user1 === user){
            setPiece("X");
            setOpponent(user2);
        }
        else{
            setPiece("O");
            setOpponent(user1);
        }
    },[])

    return(
        <div>
            Hello world 
        </div>    
    )
}