import { useRef, useImperativeHandle} from "react"
import { useContext } from "react"
import { authenticationContext } from "../ContextStore/Authentication-Context"
import { forwardRef} from "react"
import {createPortal} from "react-dom"
import Input from "./Input"

function Authentication({}, ref){
    const dialogRef = useRef()
    const {authenticationInfo, setAuthenticationInfo} = useContext(authenticationContext)

    useImperativeHandle(ref, ()=>{
        return{
            openForm : function(){
                dialogRef.current.showModal();
            }
        }
    })
    
    return createPortal(
        <dialog ref={dialogRef} className='bg-slate-500 max-w-[500px] w-full p-5 rounded-md'>
            <form method="dialog" className="flex flex-col">
                <h1 className="text-2xl capitalize text-center font-semibold mb-4">Sign up to start listening</h1>
                <Input label='User Name' type='text'/>
                <Input label='Email' type='email' placeholder='abc@gmail.com'/>
                <Input label='Password' type='password'/>
                <button type="submit" className="self-end px-5 py-2 rounded-md mt-4 hover:bg-slate-300 hover:font-semibold">Sign up</button>
            </form>
        </dialog>, document.getElementById('authentication-modal')
    )
}
export default forwardRef(Authentication)