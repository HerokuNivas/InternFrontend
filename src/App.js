import "./css/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NewGame from "./Components/NewGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/newgame" element={<NewGame/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
