import "./css/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NewGame from "./Components/NewGame";
import Requests from "./Components/Requests";
import Gameclick from "./Components/Gameclick";
import Forogt from "./Components/Forgot password";
import Profile from "./Components/Profile";
import Faq from "./Components/Faq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/newgame" element={<NewGame/>}></Route>
        <Route path="/requests" element={<Requests/>}></Route>
        <Route path="/games/:id" element={<Gameclick/>}></Route>
        <Route path="/profile/:id" element={<Profile/>}></Route>
        <Route path="/forgotpassword" element={<Forogt/>}></Route>
        <Route path="/faq" element={<Faq/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
