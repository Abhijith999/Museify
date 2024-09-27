import { useRef, useContext } from 'react'
import './App.css'
import Header from './Components/Header'
import Authentication from './Components/Authentication'
import { authenticationContext } from './ContextStore/Authentication-Context'

function App() {
const modal = useRef()
const {authenticationInfo, setAuthenticationInfo} = useContext(authenticationContext)

function handleSignUp(){
  modal.current.openForm()
}
function handleLogin(){
  if(authenticationInfo.isSignup){
    modal.current.openForm()
  }else{
    alert('Please signup first')
  }
}

  return (
    <>
      <Header onSignup={handleSignUp} onLogin={handleLogin}/>
      <Authentication ref={modal}/>
    </>
  )
}

export default App
