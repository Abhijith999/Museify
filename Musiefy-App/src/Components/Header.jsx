import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faHouse, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import NodeImg from "../assets/Node.png"

function Header(){
    return(
        <header className="flex justify-between items-center px-5 py-2">
            <div><img src={NodeImg} alt="header-logo" className="max-w-16"/></div>
            <div className="flex items-center gap-3">
                <button className="bg-zinc-800 w-10 aspect-square rounded-full text-gray-400 hover:text-gray-200"><FontAwesomeIcon icon={faHouse} /></button>
                <span className="min-w-[300px] md:min-w-[400px] py-2 px-1 rounded-3xl bg-zinc-800 flex justify-center hover:bg-zinc-700 focus-within:outline-white focus-within:outline-2 focus-within:outline relative">
                    <i className="absolute left-4 text-gray-400 text-base"><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <input type="text" className="basis-3/4 bg-transparent focus:outline-none caret-white text-white"/>
                </span>
            </div>
            <div className="flex gap-5">
                <button className="font-bold text-gray-400 hover:text-slate-100 transform transition hover:scale-105 duration-200">Sign up</button>
                <button className="border-none bg-slate-50 rounded-3xl pt-2 pb-3 px-5 text-slate-950 font-bold hover:bg-slate-100 transform transition hover:scale-105 duration-200">Log in</button>
            </div>
        </header>
    )
}
export default Header