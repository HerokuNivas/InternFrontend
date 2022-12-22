import React from "react";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    let navigate = useNavigate();
    const {user} = useStateContext();
    const [game, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    useEffect(()=>{
         setInterval(async () => {
            await axios({
                method: "get",
                url: "http://localhost:5000/games?user="+user
            }).then((data)=>(setGames(data.data.games)))
     }, 2000);
    }, []);



    return(
        <div>
            {loading && <CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/>}
        {!loading && <div>
            <p style={{fontWeight: "bold", fontSize: "larger", marginLeft: "20px", marginRight: "20px"}}>Your games</p>
            <MoveToInboxIcon style={{position: "absolute", right: "15px", top: "15px"}}/>
            {game.length === 0 && <div>
                <p className="dashBoardNogames">No Games Found</p>
                <p className="mainLogin" onClick={()=>{navigate("/newgame")}} style={{marginTop: "-50px"}}><span className="mainLoginText" style={{marginLeft: "-30px"}}>Create new game</span></p>
                </div>}
        </div>}</div>
    )
}