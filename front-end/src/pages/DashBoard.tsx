import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Sidebar from '../components/Sidebar'
import AddIcon from '../icons/AddIcon'
import ShareIcons from '../icons/ShareIcons'
import SignIn from '../components/SignIn'

function DashBoard() {
  const [isToggle,SetIsToggle]=useState(false)
  function handleToggle(){
    SetIsToggle(state=>!state)
    console.log("hello from state")
  }
  return (
    <div className='bg-gray-100 '>
      <Modal isToggle={isToggle} handleToggle={handleToggle}/>
      <Sidebar/>
      <div className='ml-65 min-h-screen p-7'>
      <div className='flex justify-between items-center mt-3'>
      <h2 className='text-2xl font-semibold'>All Notes</h2>
      <div className='flex'>
      <Button size='lg' variant='secondary' text='Share brain' startIcon={<ShareIcons size='lg'/>}/>
      <Button onClick={handleToggle} size='lg' variant='primary' text='Add Content' startIcon={<AddIcon size="lg" />}/>
      </div>
      </div>
      <div className='p-4 flex gap-5 flex-wrap'>
      <Card type='tweeter'/> 
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
      </div>
   </div>
  )
}

export default DashBoard