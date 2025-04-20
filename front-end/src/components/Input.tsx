import React from 'react'

/* interface input{
    placeholder:string,
    type:string,
    INPref:React.InputHTMLAttributes<HTMLInputElement>
} */

function Input({placeholder,type="text",INPref}:any){
    return (
        <div className='bg-white rounded-xs p-2 m-3'>
            <input className='w-full outline-none' ref={INPref} type={type} placeholder={placeholder}/>
        </div>
    )
}

export default Input