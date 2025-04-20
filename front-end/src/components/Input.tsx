import React from 'react'

interface input{
    placeholder:string,
    type:string,
    toggleModel:()=>void
}

function Input({placeholder,type="text",toggelModel}:input){
    return (
        <div className='bg-white rounded-xs p-2 m-2'>
            <input type="text" placeholder='Title'/>
        </div>
    )
}

export default Input