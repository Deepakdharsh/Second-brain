import { useNavigate } from "react-router-dom"
import { Authcontext, useAuth } from "../context/AuthProvider"
import { Children, useContext, useEffect } from "react"

function ProtectedRoute({children}) {
    const {accessToken,setAccessToken}=useContext(Authcontext)

    const navigate=useNavigate()

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token){
            setAccessToken(token)
        }

        if(!accessToken && !token){
            navigate("/signin")
        }


    },[accessToken,navigate,setAccessToken])
  return accessToken ? children : null
}

export default ProtectedRoute
