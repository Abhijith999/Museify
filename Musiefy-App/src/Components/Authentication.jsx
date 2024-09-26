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
    const [signupValue, setSignupValue] = useState({
        userName : '',
        email : '',
        password : '',
        isSignup : false,
    })

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
        setSignupValue((prevValue)=>{
            return{
                ...prevValue,
                [name] : value,
            }
        })
    }

    //form validtion function
    function validate(){
        let errorGroup = {}

        if(signupValue.userName === ''){
            errorGroup.errorNanme = 'Plese Enter the name'
        }

        if(signupValue.email === ''){
            errorGroup.errorEmail = 'Please Enter the email'
        }
        else if(!/\S+@\S+\.\S+/.test(signupValue.email)){
            errorGroup.errorEmail = 'Invalid Email'
        }

        if(signupValue.password === ''){
            errorGroup.errorPassword = 'Please Enter the password'
        }
        else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(signupValue.password)){
            errorGroup.errorPassword = 'Please Enter valid password'
        }
        return errorGroup;
    }

    //handling onSubmit form event
    function handleForm(event, key){
        event.preventDefault()
        const validationErrors = validate()
        
        if(Object.keys(validationErrors).length > 0){
            setError(validationErrors)
            setSignupValue((prevValue)=>{
                return{
                    ...prevValue,
                    isSignup : false,
                }
            })
        }
        else{
            setError({})
            setSignupValue((prevValue)=>{
                return{
                    ...prevValue,
                    isSignup : true,
                }
            })
            localStorage.setItem(key, JSON.stringify(signupValue))
            setSignupValue((prevValue)=>{
                return{
                    ...prevValue,
                    userName : '',
                    email : '',
                    password : '',
                }
            })
            console.log(signupValue)
        }
    }

    //handling login onLogin
    function handleLogin(key){
        const storedObject = JSON.parse(localStorage.getItem(key))
        if(storedObject.userName === signupValue.userName && storedObject.password === signupValue.password){
            alert('logged successfully')
        }
        else{
            alert('login failed')
        }
        console.log(signupValue)
    }
    
    return createPortal(
        <dialog ref={dialogRef} className='bg-slate-500 max-w-[500px] w-full p-5 rounded-md backdrop:bg-stone-900/90'>
            <form method="dialog" onSubmit={(e)=>handleForm(e, storageKey)} className="flex flex-col">
                <h1 className="text-2xl capitalize text-center font-semibold mb-4">Sign up to start listening</h1>
                <Input label='User Name' type='text' name='userName' onChange={handleInput} onValidation={error.errorNanme} inputBind={signupValue.userName}/>
                {!signupValue.isSignup && <Input label='Email' type='email' placeholder='abc@gmail.com' name='email' onChange={handleInput} onValidation={error.errorEmail} inputBind={signupValue.email}/>}
                <Input label='Password' type='password' name='password' onChange={handleInput} onValidation={error.errorPassword} inputBind={signupValue.password}/>
                <div className="flex justify-end">
                <button type="button" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold" onClick={cancelModal}>Cancel</button>
                {signupValue.isSignup ? <button type="button" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold" onClick={()=>handleLogin(storageKey)}>Login</button> :
                <button type="submit" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold">Sign up</button>}
                </div>
            </form>
        </dialog>, document.getElementById('authentication-modal')
    )
}
export default forwardRef(Authentication)