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

    if(!token){
        try {
            const res = await api.post("/refresh",{})
            token=res.data.token
            localStorage.setItem("token",token as string)
            console.log(token)            

        } catch (error) {
            console.log("session expired, logging out")
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
    const orginalRequest=error.config
    if(error.response.status===401&&!orginalRequest){
        orginalRequest.retry=true
        try {
            const res=await api.post("/refresh",{})
            localStorage.setItem("token",res.data.token)

            orginalRequest.headers.token=res.data.token
            return api.request(orginalRequest)
        } catch (error) {
            console.log("session expired, logging out")
        }
    }
}
)