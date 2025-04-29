import axios from "axios"

export const api=axios.create({
    baseURL:"http://localhost:3000/api/v1",
    withCredentials:true
})

//@ts-expect-error headers-failed
api.interceptors.request.use(async(config)=>{
    if(config.url?.includes("/login") || config.url?.includes("/signup")){
        return config
    }
    
    let token=localStorage.getItem("token")
    
    console.log("request interceptor worked")
    if(!token){
        try {
            console.log("get token using refresh token")
            const res = await api.post("/refresh",{})
            console.log(res)
            token=res.data.token
            localStorage.setItem("token",token as string)
            console.log(token)            

        } catch (error) {
            console.log("session expired, logging out")
            console.log(error)
            return null
        }
    }
    config.headers.token=token

    return config
},
(error)=>{
    Promise.reject(error)
})

//@ts-expect-error headers-failed
api.interceptors.response.use((response)=>response,async(error)=>{
    console.log("entered response interceptor")
    const orginalRequest=error.config
    if(error.response.status===401 && orginalRequest){
        console.log(error.response.status,orginalRequest)
        console.log("entered response if")
        orginalRequest._retry=true
        // console.log("entered response interceptor")
        try {
            const res=await api.post("/refresh",{})
            console.log(res)
            localStorage.setItem("token",res.data.token)

            orginalRequest.headers.token=res.data.token
            return api.request(orginalRequest)
        } catch (error) {
            console.log("session expired, logging out")
        }
    }
}
)