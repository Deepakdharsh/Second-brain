import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import Modal from './components/Modal'
import Sidebar from './components/Sidebar'
import AddIcon from './icons/AddIcon'
import ShareIcons from './icons/ShareIcons'

function App() {
  const [isToggle,SetIsToggle]=useState(false)
  function handleToggle(){
    SetIsToggle(state=>!state)
    console.log("hello from state")
  }
  return (
    <div>
    <Modal isToggle={isToggle} handleToggle={handleToggle}/>
    <Button size='lg' variant='secondary' text='Share brain' startIcon={<ShareIcons size='lg'/>}/>
    <Button onClick={handleToggle} size='lg' variant='primary' text='Add Content' startIcon={<AddIcon size="lg" />}/>
    <Card/>
    <Sidebar/>
   </div>
  )
}

export default App