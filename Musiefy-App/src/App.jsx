import { useRef, useContext } from 'react'
import './App.css'
import Header from './Components/Header'
import Authentication from './Components/Authentication'
import { authenticationContext } from './ContextStore/Authentication-Context'

function App() {
const modal = useRef()
const {authenticationInfo, setAuthenticationInfo} = useContext(authenticationContext)
console.log(authenticationInfo)

function handleSignUp(){
  modal.current.openForm()
}

  return (
    <>
        <Header onSignup={handleSignUp}/>
        <Authentication ref={modal}/>
    </>
  )
}

export default App
