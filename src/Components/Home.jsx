import React from "react";
import "../css/Home.css";
import {useNavigate} from "react-router-dom";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useEffect } from "react";

export default function Home(){
    let navigate = useNavigate();
    const {cookies, setUser, user} = useStateContext();
    useEffect(()=>{
        if(cookies.get('TicTacToe') !== undefined){
            setUser(cookies.get('TicTacToe'));
            navigate("/dashboard");
        }
    }, [])

    useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === undefined){
            navigate("/");
        }
    }, [])
    
    return(
        <div>
            <p className="mainHeading">async</p>
            <p style={{textAlign: "center"}} className="mainName">tic tac toe</p>
            <p className="mainLogin" onClick={()=>(navigate("/login"))}><span className="mainLoginText">Login</span></p>
            <p className="mainRegister" onClick={()=>{navigate("/register")}}><span className="mainRegisterText">Register</span></p>
        </div>    
    )
}