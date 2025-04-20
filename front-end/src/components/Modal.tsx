import React from 'react'
import Button from './Button'
import CloseIcon from '../icons/CloseIcon'
import Input from './Input'

function Modal() {
  return (
    <div className='absolute w-full min-h-screen bg-slate-300 opacity-60 flex justify-center items-center'>
        <div className='size-100 bg-red-500 p-12 relative'>
            <span className='absolute top-3 left-91'><CloseIcon/></span>
            <Input/>
            <Input/>
            <Input/>
            <Input/>
            <Input/>
            <button className='text-white bg-purple-600 px-5 py-2 rounded-xs ml-2'>Submit</button>
        </div>
    </div>
  )
}

export default Modal
