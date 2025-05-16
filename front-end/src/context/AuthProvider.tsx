import { Children, createContext,useContext, useEffect, useState } from "react"
import { api, setupInterceptors } from "../api/axiosInstance"

//@ts-ignore
const Authcontext=createContext()

function AuthProvider({children}) {
    const [user,setUser]=useState(null)
    const [accessToken,setAccessToken]=useState(null)

    useEffect(()=>{
      setupInterceptors(setAccessToken)
    },[])

    const login = async (credentials) => {
    const response = await api.post('/login', credentials, {
      withCredentials: true
    });
    setAccessToken(response.data.accessToken);
    };

  const logout = async () => {
    await api.post('/logout', {});
    setAccessToken(null);
    setUser(null);
  };


  return (
    <Authcontext.Provider value={{user,accessToken,setAccessToken,login,logout}}>
        {children}
    </Authcontext.Provider>
  )
}

export default AuthProvider
export  { Authcontext }
// export const useAuth=()=>useContext(Authcontext)
