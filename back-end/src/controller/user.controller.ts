import { Response,response } from "express"
import bcrypt from "bcrypt"
import z from "zod"
import { User } from "../models/user.model"
import jwt from "jsonwebtoken"

export const signup=async(req:Request,res:Response)=>{
    //@ts-ignore
    const {username,email,password}=req.body

    const schema=z.object({
        username:z.string(),
        email:z.string(),
        password:z.string()
    })

    const {data,error}=schema.safeParse({
        username,
        email,
        password
    })

    if(error){
        console.log(error)
        return res.status(411).json({message:"invaild inputs"})
    }

    const user=await User.findOne({email:data.email})

    if(user){
        return res.status(403).json({message:"user already exists"})
    }

    const hashedPassword=await bcrypt.hash(data.password,10)

    
    const newUser = await User.create({
        username:data.username,
        email:data.email,
        password:hashedPassword,
    })
    //@ts-ignore
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)

    res.status(200).json({
        message:"user created",
        user:newUser,
        token
    })
}

export const login=async(req:Request,res:Response)=>{
      //@ts-ignore
      const {email,password}=req.body

      const schema=z.object({
          email:z.string(),
          password:z.string()
      })
  
      const {data,error}=schema.safeParse({
          email,
          password
      })
  
      if(error){
          console.log(error)
          return res.status(411).json({message:"invaild inputs"})
      }
  
      const user=await User.findOne({email:data.email})
  
      if(!user){
          return res.status(401).json({message:"invaild authorization"})
      }
      //@ts-ignore
      const isMatch=await bcrypt.compare(data.password,user.password)
  
      if(!isMatch){
        return res.status(403).json({
            message:"invaild credentails"
        })
      }

      //@ts-ignore
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
  
      res.status(201).json({
          message:"user created",
          user:user,
          token
      })
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