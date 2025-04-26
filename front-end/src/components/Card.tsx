import React from 'react'
import ShareIcons from '../icons/ShareIcons'
import CopyIcon from '../icons/CopyIcon'
import DeleteIcon from '../icons/DeleteIcon'

interface card{
  title?:string,
  type?:"youtube"|"tweeter"|"text",
  link?:string
}

function Card({title,type,link}:card) {
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
          <a href="https://twitter.com/username/status/807811447862468608"></a> 
        </blockquote>
        }

    {/* https://x.com/deepakDotCom_/status/1907850741395632138 */}
      </div>
    </div>
  )
}

export default Card