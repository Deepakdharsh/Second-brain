import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import Signup from './components/Signup'
import DashBoard from './pages/DashBoard'
import { QueryClient , QueryClientProvider} from '@tanstack/react-query'
import AuthProvider from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient=new QueryClient()

function App() {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route index element={<Navigate to="/signup"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
        <Route path='/*' element={<div>Page not foud</div>}/>
      </Routes>
    </Router>
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

// interface auxProps{
//   children:React.ReactNode
// }

// function AuthRoute({children}:auxProps){
//   const [token, setToken] = useState("")
//   useEffect(()=>{
//   const val =  localStorage.getItem("token") || ""
//   setToken(val)
//   },[token])
//   console.log(token)
//   return token ? children : <div>some went wrong</div>
// }