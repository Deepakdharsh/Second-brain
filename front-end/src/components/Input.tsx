import React from 'react'

interface input{
    placeholder:string,
    type:string,
}

function Input({placeholder,type="text"}:input,ref:React.Ref<HTMLInputElement>){
    return (
        <div className='bg-white rounded-md p-2 m-3'>
            <input className='w-full outline-none' ref={ref} type={type} placeholder={placeholder}/>
        </div>
    )
}

export default Input