import React, { useRef } from 'react'
import CloseIcon from '../icons/CloseIcon'
import Input from './Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostContent } from '../api/endPoints'
import { useNavigate } from 'react-router-dom'

// interface ModalType {
//     isToggle:boolean,
//     handleToggle:()=>void
// }

const ForwardedChild=React.forwardRef(Input)
//@ts-ignore
function Modal({isToggle,handleToggle}):any {
    const navigate=useNavigate()
    const titletRef=useRef<HTMLInputElement>(null)
    const linkRef=useRef<HTMLInputElement>(null)
    const typeRef=useRef<HTMLInputElement>(null)
    const tagRef=useRef<HTMLInputElement>(null)

    const queryClient=useQueryClient()

    const mutation=useMutation({
        mutationFn:PostContent,
        onSuccess:(data)=>{
            console.log("added content")
            handleToggle()
            queryClient.invalidateQueries({queryKey:["content"]})

        },
        onError:(error)=>{
            console.log(error)
        }
    })

    function handleSubmit(){

        // if(titletRef.current?.value.trim()=="" ||linkRef.current?.value.trim()=="" ||typeRef.current?.value.trim()=="" ||tagRef.current?.value.trim()==""){
        //     return 
        // }

        //@ts-ignore
        console.log(tagRef?.addedtags)
        //@ts-ignore
        const link= typeRef.current?.value === "youtube"? linkRef.current?.value.replace("watch?v=","embed/") : linkRef.current?.value.replace("x.com","twitter.com")
        mutation.mutate({
            title:titletRef.current?.value,
            link,
            type:typeRef.current?.value,
            //@ts-ignore
            tags:tagRef?.addedtags
        })
    }

  return (
    <>
        {isToggle ? (
            <>
            <div onClick={handleToggle} className='fixed z-1 w-full min-h-screen bg-slate-300 opacity-60'>
            </div>
            <div className='size-100 z-2  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[12.5px] rounded-[10px] border border-white/20  rounded-md p-12 fixed'>
                <span onClick={handleToggle} className='absolute top-3 left-91'><CloseIcon/></span>
                <ForwardedChild placeholder="title" ref={titletRef} type='text' />
                <ForwardedChild placeholder="link" ref={linkRef} type='text' />
                <ForwardedChild placeholder="type" ref={typeRef} type='text' />
                <ForwardedChild placeholder="tag" isTag={true} ref={tagRef} type='text' />
                <button onClick={handleSubmit} className=' mt-3 text-white bg-purple-600 px-5 py-2 rounded-xs ml-2'>Submit</button>
            </div>
            </>
        ) : null}
    </>
)
}

export default Modal
