import { useState, useRef} from 'react'
import './App.css'
import Header from './Components/Header'
import Authentication from './Components/Authentication'
import { authenticationContext } from './ContextStore/Authentication-Context'

function App() {
const modal = useRef()
const [authenticationInfo, setAuthenticationInfo] = useState({
  userName : '',
  email : '',
  password : '',
  isLoggedIn : false,
})

function handleSignUp(){
  modal.current.openForm()
}

  return (
    <authenticationContext.Provider value={{authenticationInfo, setAuthenticationInfo}}>
        <Header onSignup={handleSignUp}/>
        <Authentication ref={modal}/>
    </authenticationContext.Provider>
  )
}

export default App
