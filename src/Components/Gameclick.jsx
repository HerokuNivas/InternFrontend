import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";
import { useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import "../css/Gameclick.css";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function Gameclick() {
  let navigate = useNavigate();
  const location = useLocation();
  const { user1Is, user2Is, boardIsIs, currentIs, winbyIs } = location.state;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const { user } = useStateContext();
  const [current, setCurrent] = useState(currentIs);
  const [winby, setWinBy] = useState(winbyIs);
  const [opponent, setOpponent] = useState("");
  const [piece, setPiece] = useState("");
  const [placed, setPlaced] = useState(false);
  const [came, setCame] = useState(false);
  const [boardIs, setBoardIs] = useState(boardIsIs);
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({current: user, board: boardIsIs});
  const [cameIn, setCameIn] = useState(false);
  const [rendered, alreadyRendered] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (user1Is === user) {
      setPiece("x");
      setOpponent(user2Is);
    } else {
      setPiece("o");
      setOpponent(user1Is);
    }
    setBoardIs(boardIsIs);
  }, []);


  useEffect(() => {
    const timeInvterval = setInterval(async () => {
      const dataIs = await axios({
        method: "get",
        url:
          "https://intern-backend-ten.vercel.app/pargame?user1=" +
          user1Is +
          "&user2=" +
          user2Is,
      });

      const data = await dataIs.data;
      const games = await data.games;

      setGame(games);
      

    }, 5000);
    return () => clearInterval(timeInvterval);
  });

    useEffect(()=>{
        console.log(game, game.board, boardIs);
        console.log(game.board === boardIs);
        var count1 = 0;
        var count2 = 0;
        if(game.board !== undefined){
        for(var i=0; i < 3; i++){
            for(var j=0; j < 3; j++){
                if(game.board[i][j] !== "") count1 = count1+1;
                if(boardIs[i][j] !== "") count2 = count2+1;
            }
        }}
        console.log(count1, count2);
        if(count1 === count2+1){
            setBoardIs(game.board);
            setCurrent(game.current);
            setWinBy(game.winby);
        }
    }, [game, boardIs])


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
    setCameIn(true);
    alreadyRendered(false);
    Submit();
    setLoading(false);
  }

  async function Submit() {
    if (!came) return;
    setPlaced(false);
    setCame(false);
    var draw = "";
    draw = checkWinning();
    var count = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (boardIs[i][j] !== "") count = count + 1;
      }
    }
    if (draw !== "" && count === 9) draw = "draw";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user1: piece === "x" ? user : opponent,
        user2: piece === "x" ? opponent : user,
        current: draw === "" ? opponent : "",
        board: boardIs,
        winby: draw,
        time: new Date().toLocaleString(),
      }),
    };
    await fetch("https://intern-backend-ten.vercel.app/update", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
      });
    await axios({
      method: "get",
      url:
        "https://intern-backend-ten.vercel.app/pargame?user1=" +
        user1Is +
        "&user2=" +
        user2Is,
    }).then(
      (data) => (
        setGame(data.data.games),
        setCurrent(data.data.games.current),
        setWinBy(data.data.games.winby)
      )
    );
    setLoading(false);
  }

  function checkWinning() {
    const value = piece === "x" ? "X" : "O";
    if (
      boardIs[0][0] === value &&
      boardIs[1][1] === value &&
      boardIs[2][2] === value
    )
      return user;
    if (
      boardIs[0][2] === value &&
      boardIs[1][1] === value &&
      boardIs[2][0] === value
    )
      return user;
    if (
      boardIs[0][0] === value &&
      boardIs[1][0] === value &&
      boardIs[2][0] === value
    )
      return user;
    if (
      boardIs[0][1] === value &&
      boardIs[1][1] === value &&
      boardIs[2][1] === value
    )
      return user;
    if (
      boardIs[0][2] === value &&
      boardIs[1][2] === value &&
      boardIs[2][2] === value
    )
      return user;
    if (
      boardIs[0][0] === value &&
      boardIs[0][1] === value &&
      boardIs[0][2] === value
    )
      return user;
    if (
      boardIs[1][0] === value &&
      boardIs[1][1] === value &&
      boardIs[1][2] === value
    )
      return user;
    if (
      boardIs[2][0] === value &&
      boardIs[2][1] === value &&
      boardIs[2][2] === value
    )
      return user;
    return "";
  }

  return (
    <div>
      {!loading && (
        <div>
          <div>
            <ArrowBackIosIcon
              fontSize="small"
              onClick={() => navigate("/dashboard")}
              className="arrowBackRegister"
            />
          </div>
          <div style={{ marginLeft: "20px", marginTop: "50px" }}>
            <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
              Game with {opponent}
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
                  background: "#FFE79E",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger" }}>
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
                  background: "#FFE79E",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger" }}>
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
                  background: "#FFE79E",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger" }}>
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
                  background: "#FFE79E",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger" }}>
                  {opponent} won.
                </span>
              </p>
            )}
            {winby === "draw" && (
              <p
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "35px",
                  background: "#FFE79E",
                  marginTop: "-100px",
                }}
              >
                <span style={{ marginLeft: "100px", fontSize: "larger" }}>
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
              </p>
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
              </p>
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
                  background: "#F2C94C",
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
    </div>
  );
}
