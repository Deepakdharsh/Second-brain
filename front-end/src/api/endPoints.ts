import { api } from "./axiosInstance";

const PostRag=async()=>{
    const res=await api.post("/rag",{})
    return res.data
}

const PostSignup=async(data)=>{
    const res=await api.post("/signup",data)
    return res.data
}

const PostLogin=async(data)=>{
    console.log(data)
    const res=await api.post("/login",data)
    return res.data
}

const PostContent=async(data)=>{
    const res=await api.post("/content",data)
    return res.data
}

const GetContent=async()=>{
    const res=await api.get("/content")
    return res.data
}

const DeleteContent=async(id)=>{
    const res=await api.delete("/content",{data:{id}})
    return res.data
}

const PostTag=async(data)=>{
    const res=await api.post("/tag",{data})
    return res.data
}

const PostBrain=async(data)=>{
    const res=await api.post("/brain/share",data)
    return res.data
}

const GetBrain=async()=>{
    const res=await api.get("/brain/:sharelink")
    return res.data
}

export {PostBrain,PostContent,PostLogin,PostRag,PostSignup,DeleteContent,GetBrain,GetContent,PostTag,}