import './App.css'
import Button from './components/Button'
import ShareIcons from './icons/ShareIcons'

function App() {
  return (
    <div >
    <Button size='lg' variant='secondary' text='Share brain' startIcon={<ShareIcons/>}/>
    <Button size='lg' variant='primary' text='Add Content'/>
   </div>
  )
}

export default App