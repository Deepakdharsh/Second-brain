import React, { useState } from 'react'
import ShareIcons from '../icons/ShareIcons'
import CopyIcon from '../icons/CopyIcon'
import DeleteIcon from '../icons/DeleteIcon'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { DeleteContent } from '../api/endPoints'

interface card{
  title?:string,
  type?:"youtube"|"twitter"|"text",
  link?:string,
  tags?:string[],
  id:string
}

function Card({title,type,link,tags,id}:card) {
  const [textData,setTextData]=useState(false)
  const queryClient=useQueryClient()
  const mutation=useMutation({
    mutationFn:DeleteContent,
    onSuccess:()=>{
        console.log("content deleted")
        queryClient.invalidateQueries({queryKey:["content"]})

    },
    onError:(error)=>{
        console.log(error)
    }
})

  function handleDelete(){
    mutation.mutate({
      contentId:id
    })
  }

  function handleCopyToClipboard(){
    const text=type === "youtube"? link.replace("embed/","watch?v=") : link.replace("twitter.com","x.com")
    if(text){
      navigator.clipboard.writeText(text).then(()=>{
        setTextData(true)
        setTimeout(()=>{
          setTextData(false)
        },2000)
      })
    }
  }
  return (
    <div  className='content-card flex-[1] min-w-60 max-w-70 bg-white border border-gray-300  shadow-md rounded-sm min-h-64 p-5'>
      <div className='flex justify-between'>
      <div className='flex items-center '>
       <span className='mr-3'>
      {<CopyIcon textData={textData} handleCopyToClipboard={handleCopyToClipboard} />}
       </span>
      {title}
      </div>
      <div className='flex items-center'>
        <span className='mr-2'>
      {<ShareIcons size='md'/>}
        </span>
      {<DeleteIcon handleDelete={handleDelete} />}
      </div>
      </div>
      <div className='mt-4'>
        {
          type === "youtube" && <iframe className='w-full rounded-md' src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        }
        {/* https://www.youtube.com/watch?v=jGUuqugL1wI */}
     
        {
          type === "twitter" && <blockquote className="twitter-tweet">
          <a href={link}></a> 
        </blockquote>
        }

    {/* https://x.com/deepakDotCom_/status/1907850741395632138 */}
      </div>
      <div className='m-1 p-2'>
        {
          tags && tags.map((cur,i)=>{
            return (<span key={i+1} className='bg-purple-600 text-white pt-0 pb-1 px-3 rounded-[30px] m-1'>{cur.title}</span>)
          })
        }
      </div>
    </div>
  )
}

export default Card