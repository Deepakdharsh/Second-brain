import React from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import Signup from './components/Signup'
import DashBoard from './pages/DashBoard'
import { QueryClient , QueryClientProvider} from '@tanstack/react-query'

const queryClient=new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route index element={<Navigate to="/signup"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/*' element={<div>Page not foud</div>}/>
      </Routes>
    </Router>
    </QueryClientProvider>
  )
}

export default App