import React from "react";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Singlegame from "./Singlegame";
import LogoutIcon from '@mui/icons-material/Logout';
import video1 from "../Animations/Dashboard.mp4";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Dashboard(){
    let navigate = useNavigate();
    const {user, cookies, setUser} = useStateContext();
    const [game, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState("0");
    const [expandClick, setExpandClicked] = useState(false);

    useEffect(()=>{
        if(user === ""){
            setUser(cookies.get('TicTacToe'));
        }
        if(cookies.get('TicTacToe') === undefined){
            navigate("/");
        }
        
    }, []);

    useEffect(()=>{
        setLoading(true);
        setTimeout(async () => {
            await axios({
                method: "get",
                url: "https://intern-backend-ten.vercel.app/games?user="+user
            }).then((data)=>{
                try{
                    setGames(data.data.games)
                }
                catch(err){
                    setGames([]);
                }
                })
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user : user})
              };
              await fetch("https://intern-backend-ten.vercel.app/totalRequests", requestOptions).then((response) => response.json()).then((responseData) => {
              if(responseData.number <= 9)
                setRequests(responseData.number.toString());
              else
                setRequests("9+");
            })
            setLoading(false);
        }, 5000);
        
    }, []);

    useEffect(()=>{
        const timeInvterval = setInterval(async () => {
            await axios({
                method: "get",
                url: "https://intern-backend-ten.vercel.app/games?user="+user
            }).then((data)=>{
                try{
                    setGames(data.data.games)
                }
                catch(err){
                    setGames([]);
                }
            })
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user : user})
              };
              await fetch("https://intern-backend-ten.vercel.app/totalRequests", requestOptions).then((response) => response.json()).then((responseData) => {
              if(responseData.number <= 9)
                setRequests(responseData.number.toString());
              else
                setRequests("9+");
            })
     }, 1000);
     return ()=> clearInterval(timeInvterval);
    });

    

    return(
        <div>
            {/* {loading && <CircularProgress style={{marginLeft: "48%", marginTop: "150px"}}/>} */}
            {loading && <video width="250px" height="250px" style={{display: "grid", margin: "auto", marginTop: "150px"}} autoPlay loop muted playsInline >
                            <source src={video1} type="video/mp4"/></video>}
        {!loading && <div>
            <div className="dashboardLeft" id="animatedDashboard">
                {!expandClick && <ArrowCircleRightIcon style={{position: "absolute", left:"56px", titleAccess: "Expand", cursor: "pointer", top: "2px"}} onClick={()=>{var element = document.getElementById("animatedDashboard"); element.classList.add("activeClick"); setExpandClicked(true)}}/>}
                {expandClick && <ArrowCircleLeftIcon style={{position: "absolute", left: "145px", titleAccess: "Collapse", cursor: "pointer", top: "2px"}} onClick={()=>{var element = document.getElementById("animatedDashboard"); element.classList.remove("activeClick"); setExpandClicked(false)}}/>}
            <Link to={`/profile/${user}`} target="_blank"><AccountCircleIcon titleAccess="Account" style={{color: "white", position: "fixed", left: "14px", top: "15px", fontSize: "25px", cursor: "pointer"}}/></Link>
            {expandClick && <Link to={`/profile/${user}`} style={{textDecoration: "none"}} target="_blank"><p style={{color: "white", marginLeft: "56px"}}>Account</p></Link>}
            <MoveToInboxIcon titleAccess="Inbox" onClick={()=>(navigate(("/requests")))} style={{position: "fixed", left: "14px", top: "65px", color: "white", fontSize: "25px", cursor: "pointer"}}/>
            <p style={{position: "fixed", color: "white", top: expandClick?"54px":"40px", left: expandClick?"100px":"25px", border: "solid 2px red", borderRadius: "50%", height: "20px", width: "20px", background: "red", fontSize: "12px", cursor: "pointer"}}><span style={{paddingRight: "10px", marginLeft: "4px"}}>{requests}</span></p>
            {expandClick && <p onClick={()=>(navigate(("/requests")))} style={{color: "white", marginLeft: "56px", marginTop: "30px", cursor: "pointer"}}>Inbox</p>}

            <LogoutIcon titleAccess="Logout" onClick={()=> {
                cookies.remove('TicTacToe');
                setUser("");
                navigate("/")
            }} style={{position: "fixed", right: "60px", bottom: "15px", color: "white", left: "14px", cursor: "pointer", fontSize: "25px"}}/>
            {expandClick && <p onClick={()=> {
                cookies.remove('TicTacToe');
                setUser("");
                navigate("/")
            }} style={{color: "white", marginLeft: "56px", position: "absolute", bottom: "2px", cursor: "pointer"}}>Logout</p>}

            <Link to={"/faq"} target="blank"><QuestionMarkIcon titleAccess="Faq" style={{color: "white", left: "10px", position: "fixed", bottom: "60px", cursor: "pointer",fontSize: "25px"}}/></Link>
            {expandClick && <Link to="/faq" target="blank"><p style={{color: "white", marginLeft: "56px", position: "absolute", bottom: "45px", cursor: "pointer"}}>Faq</p></Link>}

            <a href="https://www.linkedin.com/in/asynchronous-tic-tac-toe-b96703265/" target="_blank" rel="noopener"><LinkedInIcon titleAccess="Linkedin" style={{color: "white", left: "12px", position: "fixed", bottom: "108px", cursor: "pointer", fontSize: "25px"}}/></a>
            {expandClick && <a href="https://www.linkedin.com/in/asynchronous-tic-tac-toe-b96703265/" target="_blank" rel="noopener"><p style={{color: "white", marginLeft: "56px", position: "absolute", bottom: "94px", cursor: "pointer"}}>Linkedin</p></a>}

            <a href="https://www.instagram.com/asynctictactoe/" target="_blank" rel="noopener"><InstagramIcon titleAccess="Linkedin" style={{color: "white", left: "12px", position: "fixed", bottom: "160px", cursor: "pointer", fontSize: "25px"}}/></a>
            {expandClick && <a href="https://www.instagram.com/asynctictactoe/" target="_blank" rel="noopener"><p style={{color: "white", marginLeft: "56px", position: "absolute", bottom: "147px", cursor: "pointer"}}>Instagram</p></a>}

            </div>
            <div className="dashboardRight" id="animatedDashboardRight">
            <p style={{marginLeft: "20px", marginTop: "25px"}}>Welcome back <span style={{color: "#2699c7", fontSize: "larger", fontWeight: "bolder", marginBottom: "-100px"}}>{user}</span>!</p>
            { game.length!==undefined && game.length!==0 && <p style={{fontWeight: "bold", fontSize: "30px", marginLeft: "20px", marginRight: "20px"}}>Your games</p>}
            
            {game.length === 0 && <div>
                <p className="dashBoardNogames">No Games Found</p>
                <p className="mainLogin" onClick={()=>{navigate("/newgame")}} style={{marginTop: "-50px"}}><span className="mainLoginText" style={{marginLeft: expandClick?"-42px":"-40px"}}>Create new game</span></p>
                </div>}
                
        {game!==[] && game.length !== undefined && <div className="gameFlex" style={{marginTop: "20px", marginBottom: "25px"}}>{
        game.map((key)=>(
            <Singlegame user1 = {key.user1} user2 = {key.user2} current = {key.current}  winby = {key.winby} board = {key.board} time = {key.time} id = {key._id} winpo = {key.winpo}/>
        ))
        }<p className="newGameText" onClick={()=>(navigate("/newgame"))}><span style={{color: "white", cursor: "pointer"}}>+ New Game</span></p></div>}
        </div></div>}
        </div>
    )
}