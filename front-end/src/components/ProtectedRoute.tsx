import { useNavigate } from "react-router-dom"
import { Authcontext, useAuth } from "../context/AuthProvider"
import { Children, useContext, useEffect } from "react"

function ProtectedRoute({children}) {
    const {accessToken}=useContext(Authcontext)

    const navigate=useNavigate()

    useEffect(()=>{
        if(!accessToken){
            navigate("/signin")
        }
    },[accessToken,navigate])
  return accessToken ? children : null
}

export default ProtectedRoute
