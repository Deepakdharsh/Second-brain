import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import AddIcon from './icons/AddIcon'
import ShareIcons from './icons/ShareIcons'

function App() {
  return (
    <div >
    <Button size='lg' variant='secondary' text='Share brain' startIcon={<ShareIcons size='lg'/>}/>
    <Button size='lg' variant='primary' text='Add Content' startIcon={<AddIcon size="lg" />}/>
    <Card/>
   </div>
  )
}

export default App