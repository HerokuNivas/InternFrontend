import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import "../css/Gameclick.css";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useBeforeunload } from 'react-beforeunload';
import PersonIcon from '@mui/icons-material/Person';
import Lottie from 'react-lottie-player'
import crackerJson from "../LottieJson/Crackers.json";
export default function Gameclick() {
  let navigate = useNavigate();

  const { user, setUser, cookies } = useStateContext();
  const status = cookies.get("Game");



  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  
  

    useBeforeunload((event) => {
      if ( user !== "") {
          setUser(user);
          navigate("/dashboard");
      }
    });

    useEffect(()=>{
      if(user === ""){
          setUser(cookies.get('TicTacToe'));
      }
      if(cookies.get('TicTacToe') === undefined){
          navigate("/");
      }
  }, []);


  const [current, setCurrent] = useState(status[3]);
  const [winby, setWinBy] = useState(status[4]);
  const opponent = status[7];
  const piece = status[8];
  const [placed, setPlaced] = useState(false);
  const [came, setCame] = useState(false);
  const [boardIs, setBoardIs] = useState(status[2]);
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({ current: user, board: status[2] });
  const [cameIn, setCameIn] = useState(false);
  const [crackers, setCrackers] = useState(false);
  const [checkin, setCheckin] = useState(true);


  const [error, setError] = useState(false);

  const data = window.location.href.split("/");
  const url = data[data.length-1];

  useEffect(() => {
    if(winby !== "" && winby!==""){
      showCrackers();
    }
    if(game.winpo!==undefined && game.winpo !== "")
      try{
        document.getElementById("Win"+status[6]).classList.add("win"+status[6]);
      }
      catch(error){
        // Not expected;
      }
  }, []);

  useEffect(() => {
    const timeInvterval = setInterval(async () => {
      const dataIs = await axios({
        method: "get",
        url: "https://intern-backend-ten.vercel.app/pargame?id=" + url,
      });

      const data = await dataIs.data;
      const games = await data.games;
      setGame(games);
      console.log(games);
      if(games.winpo!==undefined && games.winpo !== "" && !loading){
        document.getElementById("Win"+games.winpo).classList.add("win"+games.winpo);
        }
      if (games.winby !== "") {
        setWinBy(games.winby);
        setCurrent(games.current);
        setBoardIs(games.board);
        showCrackers();
      }
    }, 1000);
    return () => clearInterval(timeInvterval);
  });

  useEffect(() => {
    var count1 = 0;
    var count2 = 0;
    if (game.board !== undefined) {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (game.board[i][j] !== "") count1 = count1 + 1;
          if (boardIs[i][j] !== "") count2 = count2 + 1;
        }
      }
    }
    if (count1 === count2 + 1) {
      setBoardIs(game.board);
      setCurrent(game.current);
      setWinBy(game.winby);
      setCameIn(false);
      setError(false);
    }
  }, [game, boardIs]);

  function showCrackers(){
    if(winby !== opponent && winby !== "" && checkin){
      setCrackers(true);
      
      setTimeout(() => {
        setCrackers(false);
      }, 5000);
    }
    setCheckin(false);
  }

  function function1() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[0][0] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[0][0] = "X";
    else boardCheck[0][0] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function2() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[0][1] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[0][1] = "X";
    else boardCheck[0][1] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function3() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[0][2] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[0][2] = "X";
    else boardCheck[0][2] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function4() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[1][0] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[1][0] = "X";
    else boardCheck[1][0] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function5() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[1][1] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[1][1] = "X";
    else boardCheck[1][1] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function6() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[1][2] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[1][2] = "X";
    else boardCheck[1][2] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function7() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[2][0] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[2][0] = "X";
    else boardCheck[2][0] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function8() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[2][1] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[2][1] = "X";
    else boardCheck[2][1] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  function function9() {
    if (current === opponent || came || winby !== "" || cameIn === true) return;
    if (boardIs[2][2] !== "") {
      setPlaced(true);
      return;
    }
    const boardCheck = boardIs;
    if (piece === "x") boardCheck[2][2] = "X";
    else boardCheck[2][2] = "O";
    setBoardIs(boardCheck);
    setCame(true);
  }

  async function submitParent() {
    setLoading(true);
    if(came === true){
      Submit();
      setCameIn(true);
    }
    setLoading(false);
  }

  async function Submit() {
    if (!came) return;
    setPlaced(false);
    setCame(false);
    var draw = checkWinning();
    var count = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (boardIs[i][j] !== "") count = count + 1;
      }
    }
    if (draw.user === "" && count === 9) draw.user = "draw";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: url,
        user1: piece === "x" ? user : opponent,
        user2: piece === "x" ? opponent : user,
        current: draw.user === "" ? opponent : "",
        board: boardIs,
        winby: draw.user,
        winpo: draw.winpo,
        time: new Date().toLocaleString(),
      }),
    };
    await fetch("https://intern-backend-ten.vercel.app/update", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {});
    await axios({
      method: "get",
      url: "https://intern-backend-ten.vercel.app/pargame?id=" + url,
    }).then(
      (data) => (
        setGame(data.data.games),
        setCurrent(data.data.games.current),
        setWinBy(data.data.games.winby)
      )
    );
    if(draw.winpo !== ""){
      const requestOptions1 = {
        method: "POST", 
         headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user1 : user,
          user2 : opponent,
          status: draw.user==="draw"?"Draw":"Won"
        }),
      }
      await fetch("https://intern-backend-ten.vercel.app/countWonLost", requestOptions1)
      .then((response) => response.json())
      .then((responseData) => {});
    }
    setLoading(false);
    setError(false);
  }

  function checkWinning() {
    const value = piece === "x" ? "X" : "O";
    if (
      boardIs[0][0] === value &&
      boardIs[1][1] === value &&
      boardIs[2][2] === value
    ){
        document.getElementById("Win7").classList.add("win7");
      return {user: user, winpo: "7"};
    }
    if (
      boardIs[0][2] === value &&
      boardIs[1][1] === value &&
      boardIs[2][0] === value
    ){
        document.getElementById("Win8").classList.add("win8");
      return {user: user, winpo: "8"};
    }
    if (
      boardIs[0][0] === value &&
      boardIs[1][0] === value &&
      boardIs[2][0] === value
    ){
        document.getElementById("Win1").classList.add("win1");
      return {user: user, winpo: "1"};
    }
    if (
      boardIs[0][1] === value &&
      boardIs[1][1] === value &&
      boardIs[2][1] === value
    ){
        document.getElementById("Win2").classList.add("win2");
      return {user: user, winpo: "2"};
    }
    if (
      boardIs[0][2] === value &&
      boardIs[1][2] === value &&
      boardIs[2][2] === value
    ){
        document.getElementById("Win3").classList.add("win3");
      return {user: user, winpo: "3"};
    }
    if (
      boardIs[0][0] === value &&
      boardIs[0][1] === value &&
      boardIs[0][2] === value
    ){
        document.getElementById("Win4").classList.add("win4");
      return {user: user, winpo: "4"};
    }
    if (
      boardIs[1][0] === value &&
      boardIs[1][1] === value &&
      boardIs[1][2] === value
    ){
        document.getElementById("Win5").classList.add("win5");
      return {user: user, winpo: "5"};
    }
    if (
      boardIs[2][0] === value &&
      boardIs[2][1] === value &&
      boardIs[2][2] === value
    ){
        document.getElementById("Win6").classList.add("win6");
      return {user: user, winpo: "6"};
    }
    return {user: "", winpo: ""};
  }

  return (
    <div>
      {!loading && (
        <div>
          <div>
            <ArrowBackIosIcon
              fontSize="small"
              onClick={() => {navigate("/dashboard"); cookies.remove("Game")}}
              className="arrowBackRegister"
            />
          </div>
          <div style={{ marginLeft: "20px", marginTop: "50px" }}>
            <p style={{ fontSize: "20px", fontWeight: "bolder", color: "#2699c7" }}>
              Game with {opponent} <Link to={"/profile/"+opponent} target="_blank"><PersonIcon style={{color: "#2699c7"}}/></Link>
            </p>
            <p>Your piece</p>
            <p
              style={{
                color: piece === "x" ? "#2C8DFF" : "#FF4F4F",
                fontSize: "100px",
                fontWeight: "bolder",
                marginTop: "-50px",
              }}
            >
              {piece}
            </p>
            {current === user && (
              <p
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "35px",
                  background: "#2699c7",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger", color: "white" }}>
                  Your move
                </span>
              </p>
            )}
            {current === opponent && (
              <p
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "35px",
                  background: "#2699c7",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger", color: "white" }}>
                  Their move
                </span>
              </p>
            )}
            {winby !== "" && winby === user && (
              <p
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "35px",
                  background: "#2699c7",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger", color: "white" }}>
                  You won.
                </span>
              </p>
            )}
            {winby !== "" && winby === opponent && (
              <p
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "35px",
                  background: "#2699c7",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "85px", fontSize: "larger", color: "white" }}>
                  Opponent won.
                </span>
              </p>
            )}
            {winby === "draw" && (
              <p
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "35px",
                  background: "#2699c7",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger", color: "white" }}>
                  It's draw.
                </span>
              </p>
            )}
            <div
              onClick={() => {
                if (current === opponent || cameIn === true) {
                  setError(true);
                }
              }}
            >
              <div>
                <p
                  className="box1"
                  onClick={() => {
                    function1();
                  }}
                >
                  <span
                    style={{
                      fontSize: "80px",
                      marginLeft: "20px",
                      color: boardIs[0][0] === "X" ? "#2C8DFF" : "#FF4F4F",
                      fontWeight: "bolder",
                    }}
                  >
                    {boardIs[0][0]}
                  </span>
                </p>
                <div id="Win1"></div>
                <div id="Win4"></div>
                <div id="Win7"></div>
              </div>
              <div>
              <p
                className="box2"
                onClick={() => {
                  function2();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[0][1] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[0][1]}
                </span>
              </p>
                  <div id="Win2"></div>
              </div>
              <div>
              <p
                className="box3"
                onClick={() => {
                  function3();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[0][2] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[0][2]}
                </span>
              </p><div id="Win3"></div>
              
              </div>
              <div>
              <p
                className="box4"
                onClick={() => {
                  function4();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[1][0] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[1][0]}
                </span>
              </p>
              <div id="Win5"></div>
              </div>
              <p
                className="box5"
                onClick={() => {
                  function5();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[1][1] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[1][1]}
                </span>
              </p>
              <p
                className="box6"
                onClick={() => {
                  function6();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[1][2] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[1][2]}
                </span>
              </p>

              <div>
              <p
                className="box7"
                onClick={() => {
                  function7();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[2][0] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[2][0]}
                </span>
              </p><div id="Win6"></div>
              <div id="Win8"></div>
              </div>
              <p
                className="box8"
                onClick={() => {
                  function8();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[2][1] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[2][1]}
                </span>
              </p>
              <p
                className="box9"
                onClick={() => {
                  function9();
                }}
              >
                <span
                  style={{
                    fontSize: "80px",
                    marginLeft: "20px",
                    color: boardIs[2][2] === "X" ? "#2C8DFF" : "#FF4F4F",
                    fontWeight: "bolder",
                  }}
                >
                  {boardIs[2][2]}
                </span>
              </p>
            </div>
          </div>
          {error && (
            <p style={{ color: "red", marginTop: "430px", marginLeft: "20px" }}>
              Opps! It's not your turn
            </p>
          )}
          {current === user && placed && !came && (
            <p style={{ color: "red", marginTop: "430px", marginLeft: "20px" }}>
              Already placed a bead at that location
            </p>
          )}
          {came && (
            <p
              style={{ color: "green", marginTop: "430px", marginLeft: "20px" }}
            >
              You placed a bead you can submit!
            </p>
          )}
          {winby === "" && current === user && (
            <div>
              <Button
                onClick={submitParent}
                variant="contained"
                style={{
                  background: "#2699c7",
                  marginLeft: "20px",
                  marginTop: placed || came || error ? "10px" : "320px",
                  marginBottom: "20px",
                  paddingLeft: "60px",
                  paddingRight: "60px",
                }}
              >
                Submit!
              </Button>
            </div>
          )}
          {winby === "" && current === opponent && (
            <div>
              <Button
                variant="contained"
                style={{
                  background: "#E0E0E0",
                  marginLeft: "20px",
                  marginTop: error ? "10px" : "320px",
                  marginBottom: "20px",
                  color: "black",
                }}
              >
                Waiting for {opponent}
              </Button>
            </div>
          )}
        </div>
      )}
      {loading && (
        <CircularProgress style={{ marginLeft: "48%", marginTop: "150px" }} />
      )}
      {crackers && <div style={{position: "absolute", top: "0px", width: "100%", height: "100%"}}><Lottie
      loop
      animationData={crackerJson}
      play
      style={{ width: "100%", height: "100%" }}
    /></div>}
      
    </div>
  );
}