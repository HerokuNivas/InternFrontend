import React from "react";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Singlegame from "./Singlegame";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard(){
    let navigate = useNavigate();
    const {user, cookies, setUser} = useStateContext();
    const [game, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user === ""){
            navigate("/login");
        }
    }, [])

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    useEffect(()=>{
        const timeInvterval = setInterval(async () => {
            await axios({
                method: "get",
                url: "https://intern-backend-ten.vercel.app/games?user="+user
            }).then((data)=>(setGames(data.data.games)))
     }, 1000);
     return ()=> clearInterval(timeInvterval);
    }, []);



    return(
        <div>
            {loading && <CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/>}
        {!loading && <div>
            <p style={{fontWeight: "bold", fontSize: "30px", marginLeft: "20px", marginRight: "20px"}}>Your games</p>
            <MoveToInboxIcon onClick={()=>(navigate(("/requests")))} style={{position: "absolute", right: "15px", top: "15px"}}/>
            <LogoutIcon onClick={()=> {
                cookies.remove('TicTacToe');
                setUser("");
                navigate("/")
            }} style={{position: "absolute", right: "25px", top: "15px", color: "red"}}/>
            {game.length === 0 && <div>
                <p className="dashBoardNogames">No Games Found</p>
                <p className="mainLogin" onClick={()=>{navigate("/newgame")}} style={{marginTop: "-50px"}}><span className="mainLoginText" style={{marginLeft: "-30px"}}>Create new game</span></p>
                </div>}
        {game.length !== 0 && <div style={{marginTop: "20px"}}>{game.map((key)=>(
            <Singlegame user1 = {key.user1} user2 = {key.user2} current = {key.current}  winby = {key.winby} board = {key.board} time = {key.time} id = {key._id}/>
        ))}<p className="newGameText" onClick={()=>(navigate("/newgame"))}><span style={{color: "white", cursor: "pointer"}}>+ New Game</span></p></div>}
        </div>}
        </div>
    )
}