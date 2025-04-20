import React from 'react'
import ShareIcons from '../icons/ShareIcons'

interface card{
  title?:string,
  type?:"youtube"|"tweeter"|"text",
  link?:string
}

function Card({title,type="youtube",link}:card) {
  return (
    <div className='max-w-70 bg-white border  border-grey-200  shadow-md rounded-sm min-h-64 p-5'>
      <div className='flex justify-between'>
      <div className='flex items-center '>
       <span className='mr-3'>
      {<ShareIcons size='md'/>}
       </span>
      Project Ideas
      </div>
      <div className='flex items-center'>
        <span className='mr-2'>
      {<ShareIcons size='md'/>}
        </span>
      {<ShareIcons size='md'/>}
      </div>
      </div>
      <div className='mt-4'>
        {
          type === "youtube" && <iframe className='w-full rounded-md' src="https://www.youtube.com/embed/jGUuqugL1wI?si=E682Ev8jFhDDOmHi" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        }
        {/* https://www.youtube.com/watch?v=jGUuqugL1wI */}
     
        {
          type === "tweeter" && <blockquote className="twitter-tweet">
          <a href="https://twitter.com/username/status/807811447862468608"></a> 
        </blockquote>
        }

    {/* https://x.com/deepakDotCom_/status/1907850741395632138 */}
      </div>
    </div>
  )
}

export default Card