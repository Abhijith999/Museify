
function Input({label, type, onChange, onValidation, inputBind, ...props}){
    return(
        <div className="flex flex-col gap-1 mb-2">
            <label className="text-slate-50">{label}</label>
            <input type={type} {...props} value={inputBind} className='p-1 bg-slate-300' onChange={(e)=>onChange(e)}/>
            {onValidation && <p className="text-red-600">{onValidation}</p>}
        </div>
    )
}
export default Input
