import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState("");
    return(
        <StateContext.Provider
        value={{
           user,
           setUser
        }}> 
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);