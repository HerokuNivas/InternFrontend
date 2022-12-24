import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import Cookies from "universal-cookie";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const cookies = new Cookies();
    return(
        <StateContext.Provider
        value={{
           user,
           setUser,
           cookies
        }}> 
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);