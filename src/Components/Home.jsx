import React from "react";
import "../css/Home.css";
import {useNavigate} from "react-router-dom";

export default function Home(){
    let navigate = useNavigate();
    return(
        <div>
            <p className="mainHeading">async</p>
            <p style={{textAlign: "center"}} className="mainName">tic tac toe</p>
            <p className="mainLogin" onClick={()=>(navigate("/login"))}><span className="mainLoginText">Login</span></p>
            <p className="mainRegister" onClick={()=>{navigate("/register")}}><span className="mainRegisterText">Register</span></p>
        </div>    
    )
}