import React,{useContext, useRef} from 'react'
import Input from './Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostSignup } from '../api/endPoints'
import { useNavigate } from 'react-router-dom'
import { Authcontext, useAuth } from '../context/AuthProvider'

const ForwardRef=React.forwardRef(Input)

function Signup() {
  const {setAccessToken}=useContext(Authcontext)
  const queryClient=useQueryClient()
  const navigate=useNavigate()

  const mutation=useMutation({
    mutationFn:PostSignup,
    onSuccess:(data)=>{
      setAccessToken(data.token)
      localStorage.setItem("token",data.token)
      navigate("/dashboard")
    },
    onError:(error)=>{
      console.log(error)
    }
  })

  const usernameRef=useRef<HTMLInputElement>(null)
  const emailRef=useRef<HTMLInputElement>(null)
  const passwordRef=useRef<HTMLInputElement>(null)

  function handleSubmit(){
    mutation.mutate({
      username:usernameRef.current?.value,
      email:emailRef.current?.value,
      password:passwordRef.current?.value
    })
  }
  return (
    <div className='bg-gradient-to-r from-[#a9a3f0] to-[#f2ebeb] min-h-screen flex justify-center items-center'>
      <div className='bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[12.5px] rounded-[10px] border border-white/20 h-86 w-80 rounded flex flex-col justify-center p-5'>
        <ForwardRef placeholder='username' type='text' ref={usernameRef}/>
        <ForwardRef placeholder='email' type='email' ref={emailRef}/>
        <ForwardRef placeholder='password' type='password' ref={passwordRef}/>
        <button onClick={handleSubmit} className='mt-1 bg-[#a9a3f0] rounded w-30 py-2 ml-3'>Create account</button>
      </div>
    </div>
  )
}

export default Signup