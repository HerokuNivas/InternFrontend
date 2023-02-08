import React from "react";
import "../css/Home.css";
import {useNavigate} from "react-router-dom";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useEffect } from "react";
import video1 from "../Animations/Tic tac toe.mp4";


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
            <div className="home1">
            <p className="mainHeading" style={{color: "black"}}>Asynchronous</p>
            <p style={{textAlign: "center", color: "black"}} className="mainName">Tic Tac Toe</p>
            <p className="mainLogin" onClick={()=>(navigate("/login"))}><span className="mainLoginText">Login 🔐</span></p>
            <p className="mainRegister" onClick={()=>{navigate("/register")}}><span className="mainRegisterText">Register ➕</span></p>
            <video width="250px" height="250px" className="video1" autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video>
            </div>
            <div className="home2" >
                <p className="animatedText" style={{fontSize: "35px", color: "white", marginBottom: "-20px", marginTop: "100px"}}>Play game</p>    
                <p className="animatedText"  style={{fontSize: "50px", color: "white", fontWeight: "bold"}}><span className="text_1">Simultaneously!!</span><span className="text_2">With breaks!!</span></p>
                <div className="animatedText" style={{fontSize: "20px", color: "white"}}>
                    <p>Play when you are free ! 😃</p>
                    <p>Play with multiple people at the same time ! 🧑‍🤝‍🧑</p>
                    <p>Get the progress of any game any time ! 💯</p>
                </div>
            </div>
        </div>    
    )
}