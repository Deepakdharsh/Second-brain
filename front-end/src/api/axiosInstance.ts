import axios from "axios"

export const api=axios.create({
    baseURL:"http://localhost:3000/api/v1",
    withCredentials:true
})

//@ts-expect-error headers-failed
// api.interceptors.request.use(async(config)=>{
//     if(config.url?.includes("/login") || config.url?.includes("/signup")){
//         return config
//     }
    
//     let token=localStorage.getItem("token")
    
//     if(!token){
//         try {
//             const res = await api.post("/refresh",{})
//             console.log(res,"response by backend")
//             token=res.data.token
//             localStorage.setItem("token",token as string)
//             config.headers.token=token
//         } catch (error) {
//             console.log("session expired, logging out")
//             console.log(error)
//             return null
//         }
//     }

//     return config
// },
// (error)=>{
//     console.log(error)
//     Promise.reject(error)
// })

//@ts-expect-error headers-failed
// api.interceptors.response.use((response)=>response,async(error)=>{
//     const orginalRequest=error.config
//     if(error.response.status===401 && orginalRequest){
//         console.log("entere response if check")
//         console.log(error.response.status,orginalRequest)
//         orginalRequest._retry=true
//         // console.log("entered response interceptor")
//         try {
//             const res=await api.post("/refresh",{})
//             console.log(res)
//             localStorage.setItem("token",res.data.token)
            
//             orginalRequest.headers.token=res.data.token
//             return api.request(orginalRequest)
//         } catch (error) {
//             localStorage.removeItem("token")
//             console.log(error)
//             console.log("session expired, logging out")
//         }
//     }
// }
// )

export const setupInterceptors = (setAccessToken) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await api.post('/refresh');
          const token = response.data.token;
          
          localStorage.setItem('token', token);
          setAccessToken(token);
          
          originalRequest.headers.token=token
          return api(originalRequest);
        } catch (refreshError) {
          console.log('Refresh token failed', refreshError);
          localStorage.removeItem('token');
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};