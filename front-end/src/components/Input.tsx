import React from 'react'

interface input{
    placeholder:string,
    type:string,
    ref:HTMLInputElement
}

function Input({placeholder,type="text",ref}:input){
    return (
        <div className='bg-white rounded-xs p-2 m-2'>
            <input ref={ref} type="text" placeholder='Title'/>
        </div>
    )
}

export default Input