import React from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import Signup from './components/Signup'
import DashBoard from './pages/DashBoard'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/signup"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
    </Router>
  )
}

export default App