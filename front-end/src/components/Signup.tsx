import React,{useRef} from 'react'
import Input from './Input'

const ForwardRef=React.forwardRef(Input)

function Signup() {
  const usernameRef=useRef<HTMLInputElement>(null)
  function handleSubmit(){
    console.log(usernameRef.current?.value)
  }
  return (
    <div className='bg-gradient-to-r from-[#a9a3f0] to-[#f2ebeb] min-h-screen flex justify-center items-center'>
      <div className='bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[12.5px] rounded-[10px] border border-white/20 h-86 w-80 rounded flex flex-col justify-center p-5'>
        <ForwardRef placeholder='username' type='text' ref={usernameRef}/>
        <ForwardRef placeholder='email' type='email'/>
        <ForwardRef placeholder='password' type='password'/>
        <button onClick={handleSubmit} className='mt-1 bg-[#a9a3f0] rounded w-30 py-2 ml-3'>Create account</button>
      </div>
    </div>
  )
}

export default Signup