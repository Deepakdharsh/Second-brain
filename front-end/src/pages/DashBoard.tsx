import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Sidebar from '../components/Sidebar'
import AddIcon from '../icons/AddIcon'
import ShareIcons from '../icons/ShareIcons'
import { useQuery } from '@tanstack/react-query'
import { GetContent } from '../api/endPoints'
import ShareModal from '../components/ShareModal'

function DashBoard() {
  const [isToggle,SetIsToggle]=useState(false)
  const [isShareToggle,SetisShareToggle]=useState(false)
  function handleToggle(){
    SetIsToggle(state=>!state)
  }
  function handleShareToggle(){
    SetisShareToggle(state=>!state)
  }

  //just added this line need to use the data from it
  const {data}=useQuery({queryKey:["content"],queryFn:GetContent})
  console.log(data)
  return (
    <div className='bg-gray-100 '>
      <Modal isToggle={isToggle} handleToggle={handleToggle}/>
      <ShareModal isToggle={isShareToggle} handleToggle={handleShareToggle}/>
      <Sidebar/>
      <div className='ml-65 min-h-screen p-7'>
      <div className='flex justify-between items-center mt-3'>
      <h2 className='text-2xl font-semibold'>All Notes</h2>
      <div className='flex'>
      <Button onClick={handleShareToggle} size='lg' variant='secondary' text='Share brain' startIcon={<ShareIcons size='lg'/>}/>
      <Button onClick={handleToggle} size='lg' variant='primary' text='Add Content' startIcon={<AddIcon size="lg" />}/>
      </div>
      </div>
      <div className='p-4 flex gap-5 flex-wrap'>
        {
          data && data?.contents.map((cur,i)=>(
            <Card key={i+1} title={cur.title} tags={cur.tags} type={cur.type} link={cur.link} id={cur._id}/>
          ))
        }
      </div>
      </div>
   </div>
  )
}

export default DashBoard