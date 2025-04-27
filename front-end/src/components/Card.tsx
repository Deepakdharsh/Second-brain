import React from 'react'
import ShareIcons from '../icons/ShareIcons'
import CopyIcon from '../icons/CopyIcon'
import DeleteIcon from '../icons/DeleteIcon'

interface card{
  title?:string,
  type?:"youtube"|"twitter"|"text",
  link?:string,
  tags?:string[]
}

function Card({title,type,link,tags}:card) {
  return (
    <div className='flex-[1] min-w-60 max-w-70 bg-white border border-gray-300  shadow-md rounded-sm min-h-64 p-5'>
      <div className='flex justify-between'>
      <div className='flex items-center '>
       <span className='mr-3'>
      {<CopyIcon />}
       </span>
      {title}
      </div>
      <div className='flex items-center'>
        <span className='mr-2'>
      {<ShareIcons size='md'/>}
        </span>
      {<DeleteIcon />}
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
      <div className='bg-red-100 m-1 p-2'>
        <span>{tags[0].title}</span>
      </div>
    </div>
  )
}

export default Card