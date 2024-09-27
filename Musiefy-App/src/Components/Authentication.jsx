import { useRef, useImperativeHandle} from "react"
import { useContext, useState } from "react"
import { authenticationContext } from "../ContextStore/Authentication-Context"
import { forwardRef} from "react"
import {createPortal} from "react-dom"
import Input from "./Input"

function Authentication({}, ref){
    const dialogRef = useRef()
    const storageKey = 'signupValues'
    const {authenticationInfo, setAuthenticationInfo} = useContext(authenticationContext)
    const [error, setError] = useState({})

    // modal opening code
    useImperativeHandle(ref, ()=>{
        return{
            openForm : function(){
                dialogRef.current.showModal();
            }
        }
    })

    //modal closing code
    function closeModal(){
        dialogRef.current.close()
    }

    //modal closing on cancel
    function cancelModal(){
        dialogRef.current.close()
        setError({})
    }

    //handling onchange event
    function handleInput(event){
        const {name, value} = event.target;
        setAuthenticationInfo((prevValue)=>{
            return{
                ...prevValue,
                [name] : value,
            }
        })
    }

    //form validtion function
    function validate(){
        let errorGroup = {}

        if(authenticationInfo.signupUsername === ''){
            errorGroup.errorNanme = 'Plese Enter the name'
        }

        {if(authenticationInfo.signupEmail === ''){
            errorGroup.errorEmail = 'Please Enter the email'
        }
        else if(!/\S+@\S+\.\S+/.test(authenticationInfo.signupEmail)){
            errorGroup.errorEmail = 'Invalid Email'
        }}

        if(authenticationInfo.signupPassword === ''){
            errorGroup.errorPassword = 'Please Enter the password'
        }
        else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(authenticationInfo.signupPassword)){
            errorGroup.errorPassword = 'Please Enter valid password'
        }
        return errorGroup;
    }

    //handling form onSubmit
    function handleForm(event, key){
        event.preventDefault()
        const validationErrors = validate()
        
        if(Object.keys(validationErrors).length > 0){
            setError(validationErrors)
            setAuthenticationInfo((prevValue)=>{
                return{
                    ...prevValue,
                    isSignup : false,
                }
            })
        }
        else{
            setError({})
            setAuthenticationInfo((prevValue)=>{
                return{
                    ...prevValue,
                    isSignup : true,
                }
            })
            localStorage.setItem(key, JSON.stringify(authenticationInfo))
            setAuthenticationInfo((prevValue)=>{
                return{
                    ...prevValue,
                    signupUsername : '',
                    signupEmail : '',
                    signupPassword : '',
                }
            })
        }
    }

    //handling login onLogin
    function handleLogin(key){
        const storedObject = JSON.parse(localStorage.getItem(key))
        const validationErrors = validate()

        if(validationErrors.errorNanme || validationErrors.errorPassword){
            setError(validationErrors)
        }
        else{
            setError({})
            if(storedObject.signupUsername === authenticationInfo.signupUsername && storedObject.signupPassword === authenticationInfo.signupPassword){
                alert('logged successfully')
                setAuthenticationInfo((prevValue)=>{
                    return{
                        ...prevValue,
                        isLoggedIn : true,
                        profileName : storedObject.signupUsername,
                        signupUsername : '',
                        signupPassword : '',
                    }
                })
                closeModal()
            }
            else{
                alert('login failed')
            }
        } 
    }
    
    return createPortal(
        <dialog ref={dialogRef} className='bg-slate-500 max-w-[500px] w-full p-5 rounded-md backdrop:bg-stone-900/90'>
            <form method="dialog" onSubmit={(e)=>handleForm(e, storageKey)} className="flex flex-col">
                <h1 className="text-2xl capitalize text-center font-semibold mb-4">Sign up to start listening</h1>
                <Input label='User Name' type='text' name='signupUsername' onChange={handleInput} onValidation={error.errorNanme} inputBind={authenticationInfo.signupUsername}/>
                {!authenticationInfo.isSignup && <Input label='Email' type='email' placeholder='abc@gmail.com' name='signupEmail' onChange={handleInput} onValidation={error.errorEmail} inputBind={authenticationInfo.signupEmail}/>}
                <Input label='Password' type='password' name='signupPassword' onChange={handleInput} onValidation={error.errorPassword} inputBind={authenticationInfo.signupPassword}/>
                <div className="flex justify-end">
                <button type="button" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold" onClick={cancelModal}>Cancel</button>
                {authenticationInfo.isSignup ? <button type="button" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold" onClick={()=>handleLogin(storageKey)}>Login</button> :
                <button type="submit" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold">Sign up</button>}
                </div>
            </form>
        </dialog>, document.getElementById('authentication-modal')
    )
}
export default forwardRef(Authentication)