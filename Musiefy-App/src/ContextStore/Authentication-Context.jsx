import { createContext, useState } from "react";

export const authenticationContext = createContext({});

export const AuthenticationProvider = ({children}) =>{
    const [authenticationInfo, setAuthenticationInfo] = useState({
        userName : '',
        email : '',
        password : '',
        isLoggedIn : false,
        isSignup : false,
        signupUsername : '',
        signupEmail : '',
        signupPassword : '',
        profileName: ''
    })
    return(
        <authenticationContext.Provider value={{authenticationInfo, setAuthenticationInfo}}>
            {children}
        </authenticationContext.Provider>
    )
}
