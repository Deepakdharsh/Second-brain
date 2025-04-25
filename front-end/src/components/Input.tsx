import React, { useEffect, useState } from 'react'
import Button from './Button'

interface input{
    placeholder:string,
    type:string,
    isTag:boolean
}

function Input({placeholder,type="text",isTag}:input,ref:React.Ref<HTMLInputElement>){
    const [value,setValue]=useState([])

    useEffect(()=>{
        //@ts-ignore
        ref.current.value=""
    },[value])

    function handleAdd(){
        //@ts-ignore
        if(!ref.current?.value) return 
            //@ts-ignore
        setValue(state=>[...state,ref.current.value])
        //@ts-ignore
        ref.addedtags=value
    }
    return (
        <>
        <div className={`${isTag ? "flex " : ''}bg-white rounded-md p-2 m-3`}>
            <input className='w-full outline-none' ref={ref} type={type} placeholder={placeholder}/>
            {isTag && <button className='text-purple-500' onClick={handleAdd}>Add</button>}
        </div>
        <div className=' flex flex-wrap'>
        {value && value.map((cur,i)=><span key={i+1} className='bg-purple-600 p-1  rounded-full m-1 text-white'>{cur}</span>)}
        </div>
        </>
    )
}

export default Input