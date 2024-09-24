import { createContext, useState } from "react";

export const authenticationContext = createContext({});

export const AuthenticationProvider = ({children}) =>{
    const [authenticationInfo, setAuthenticationInfo] = useState({
        userName : '',
        email : '',
        password : '',
        isLoggedIn : false,
    })
    return(
        <authenticationContext.Provider value={{authenticationInfo, setAuthenticationInfo}}>
            {children}
        </authenticationContext.Provider>
    )
}
