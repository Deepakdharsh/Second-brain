import React, { useRef } from 'react'
import CloseIcon from '../icons/CloseIcon'
import Input from './Input'

function Modal({isToggle,handleToggle}):any {
    const inputRef=useRef<HTMLInputElement>(null)
    function handleSubmit(){
        console.log(inputRef.current?.value)
        console.log(isToggle)
    }
  return (
    <>
        {isToggle ? (
            <div className='absolute w-full min-h-screen bg-slate-300 opacity-60 flex justify-center items-center'>
            <div className='size-100 bg-slate-700 rounded-md p-12 relative'>
                <span onClick={handleToggle} className='absolute top-3 left-91'><CloseIcon/></span>
                <Input placeholder="title" INPref={inputRef} type='text' />
                <Input placeholder="title" INPref={inputRef} type='text' />
                <Input placeholder="title" INPref={inputRef} type='text' />
                <Input placeholder="title" INPref={inputRef} type='text' />
                <Input placeholder="title" INPref={inputRef} type='text' />
                <button onClick={handleSubmit} className=' mt-3 text-white bg-purple-600 px-5 py-2 rounded-xs ml-2'>Submit</button>
            </div>
        </div>
        ) : null}
    </>
)
}

export default Modal
