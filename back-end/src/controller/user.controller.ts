import { Response,response } from "express"

export const login=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from login controller")
}

export const signup=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from signup controller")
}

export const createContent=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from createContent controller")
}

export const getContent=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from getContent controller")
}

export const deleteContent=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from deleteContent controller")
}

export const createLink=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from createLink controller")
}

export const shareLink=(req:Request,res:Response)=>{
    console.log("hello")
    res.send("hello this from shareLink controller")
}