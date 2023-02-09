import React from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";
import {useState} from "react";
import axios from "axios";
import Video1 from "../Animations/Profile.mp4";
import ReactApexChart from "react-apexcharts";

export default function Profile(){
    
    const data = window.location.href.split("/");
    const user = data[data.length-1];

    const [userIs, setUserIs] = useState("-1");
    const [email, setEmail] = useState("");
    const [won, setWon] = useState(-1);
    const [lost, setLost] = useState(-1);
    const [draw, setDraw] = useState(-1);
    const [options, setOptions] = useState({
        series: [won, lost, draw],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ["Won", "Lost", "Draw"],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      });

    useState(()=>{
        async function value(){
            const returnValue = await axios({
                method: "get",
                url: "https://intern-backend-ten.vercel.app/profile/?user="+user
            })
            const data = await returnValue.data;
            setUserIs(data.user.UserName);
            setEmail(data.user.Email);
            setWon(data.user.Won);
            setLost(data.user.Lost);
            setDraw(data.user.Draw);
            var optionsCurr = {
              series: [data.user.Won, data.user.Lost, data.user.Draw],
              options: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: ["Won", "Lost", "Draw"],
                responsive: [{
                  breakpoint: 2000,
                  options: {
                    chart: {
                      width: 300
                    },
                    legend: {
                      show: true,
                      position: 'bottom'
                    }
                  }
                }]
              },
            };
            setOptions(optionsCurr);
        }
        value();
    }, [])

    return(
        <div>
            {(userIs === "-1" || email === "" || won === -1 || lost === -1 || draw === -1) && <div><video width="250px" height="250px" style={{display: "grid", margin: "auto", marginTop: "100px"}} autoPlay loop muted playsInline >
                            <source src={Video1} type="video/mp4"/></video></div>}
            {(userIs !== "-1" && email !== "" && won !== -1 && lost !== -1 && draw !== -1) && <div style={{marginRight: "10px"}}>
                <div style={{textAlign: "center"}}><p style={{fontSize: "75px", marginTop: "20px", marginBottom: "5px", color: "white", border: "2px solid black", display: "inline-block", height: "100px", width: "100px", borderRadius: "50%", background: "#2699c7"}}>{userIs[0].toUpperCase()}</p></div>    
                 
                 <div style={{display: "table", margin: "auto", marginTop: "0px", padding: "10px"}}>
                  {user!=="@Async" && <div>
                <p style={{textAlign: "center", fontSize: "25px", color: "black", marginBottom: "-15px", fontWeight: "bold"}}>User Details</p>
                <p style={{textAlign: "center", margin: "auto", marginTop: "18px", display:"grid", marginLeft: "36%", marginRight: "36%", color: "#2699c7"}}></p>
                <div style={{textAlign: "center"}}><p style={{fontSize: "20px", marginTop: "5px"}}>User name : <span style={{fontSize: "20px", color: "#2699c7"}}>{userIs}</span></p></div>
                <div style={{textAlign: "center", marginTop: "-15px"}}><a style={{textDecoration: "none", color: "inherit"}} href={"mailto:"+email}><p style={{fontSize: "20px", marginTop: "30px"}}>Email     : <span style={{fontSize: "20px", color: "#2699c7"}}>{email}</span></p></a></div></div>}
                {user === "@Async" && <div style={{fontSize: "20px"}}>I am friendly AI bot designed to play Tic Tac Toe. It's difficult to win over me.</div>}
                <p style={{textAlign: "center", fontSize: "25px", color: "black", marginBottom: "-15px", fontWeight: "bold"}}>Statistics</p>
                <p style={{textAlign: "center", margin: "auto", marginTop: "18px", display:"grid", marginLeft: "40%", marginRight: "40%", color: "#2699c7", marginBottom: "10px"}}></p>
                
                
                {(won === 0 && lost === 0 && draw === 0) && <div style={{textAlign: "center", color: "#2699c7", fontSize: "30px"}}><p>No Games Played</p></div>}
                </div>
            </div>} 
            {(won!==0 || lost!==0 || draw!==0) && userIs!=="-1" && <div style={{marginLeft: "15px", display: "table", margin: "auto"}}><ReactApexChart options={options.options} series={options.series} type="pie" width={"320px"}/></div>}
        </div>    
    )
}