import React, { useEffect, useState } from 'react'
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
        <Route path='/dashboard' element={<AuthRoute><DashBoard/></AuthRoute>}/>
        <Route path='/*' element={<div>Page not foud</div>}/>
      </Routes>
    </Router>
    </QueryClientProvider>
  )
}

export default App

interface auxProps{
  children:React.ReactNode
}

function AuthRoute({children}:auxProps){
  const token=localStorage.getItem("token")  
  return token ? children : <Navigate to="/signin" replace/>
}