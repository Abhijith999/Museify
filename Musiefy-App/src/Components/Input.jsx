
function Input({label, type, ...props}){
    return(
        <div className="flex flex-col gap-1 mb-2">
            <label className="text-slate-50">{label}</label>
            <input type={type} {...props} className='p-1 bg-slate-300'/>
        </div>
    )
}
export default Input
