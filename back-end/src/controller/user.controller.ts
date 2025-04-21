import { Response,response } from "express"
import bcrypt from "bcrypt"
import z from "zod"
import { User } from "../models/user.model"
import jwt from "jsonwebtoken"
import { Content } from "../models/content.model"
import { random } from "../utils/randomString"
import { Link } from "../models/link.model"
import { Tag } from "../models/tags.model"

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
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
  
      res.status(201).json({
          message:"user created",
          user:user,
          token
      })
}

export const createTag=async(req:Request,res:Response)=>{
    //@ts-ignore
    const {title}=req.body 

    const schema=z.object({
        title:z.string()
    })

    const {data,error}=schema.safeParse({title})

    console.log(data)
    
    if(error){
        return res.json(411).json({message:"invaild inputs"})
    }

    const tag=await Tag.create({title:data.title})

    res.status(201).json({
        tag
    })
}

export const createContent=async(req:Request,res:Response)=>{
      //@ts-ignore
      const userId=req.userId
      //@ts-ignore
      const {link,type,tags,title}=req.body

      const schema=z.object({
          link:z.string(),
          type:z.string(),
          title:z.string(),
          tags:z.array(z.string())
      })
  
      const {data,error}=schema.safeParse({
          link,
          type,
          title,
          tags
      })

      console.log(data)
  
      if(error){
          console.log(error)
          return res.status(411).json({message:"invaild inputs"})
      }
  
      const content=await Content.create({
        title:data.title,
        link:data.link,
        type:data.type,
        tags:data.tags,
        userId:userId
      })
  
      res.status(201).json({
          message:"content created",
          content
      })
}

export const getContent=async(req:Request,res:Response)=>{
    //@ts-ignore
    const userId=req.userId

    const contents=await Content.find({userId}).populate({path:"tags",select:"title"})

    if(!contents){
        return res.status(401).json({
            message:"Not found"
        })
    }

    res.status(201).json({
        message:"match found",
        contents
    })
}

export const deleteContent=async(req:Request,res:Response)=>{
    //@ts-ignore
    const userId=req.userId
    //@ts-ignore
    const {contentId}=req.body

    const schema=z.object({
        contentId:z.string(),
    })

    const {data,error}=schema.safeParse({
        contentId
    })

    if(error){
        console.log(error)
        return res.status(411).json({message:"invaild inputs"})
    }

    const deleteContent=await Content.deleteOne({userId,_id:contentId})

    console.log(deleteContent)

    res.status(201).json({
        message:"content deleted",
        deleteContent
    })
}

export const createLink=async(req:Request,res:Response)=>{
    //@ts-ignore
    const userId=req.userId
    //@ts-ignore
    const {share}=req.body

    const schema=z.object({
        share:z.boolean(),
    })

    const {data,error}=schema.safeParse({
        share
    })

    if(error){
        console.log(error)
        return res.status(411).json({message:"invaild inputs"})
    }

    if(!share){
    await Link.deleteOne(userId)
    return res.status(200).json({
        message:"deleted link",
    })
    }

    const randomId=random(6)

    const linkData=await Link.create({
    hash:randomId,
    userId
    })

    res.status(201).json({
    message:"Link created",
    link:linkData.hash
    })
}

export const LinkShare=async(req:Request,res:Response)=>{
    //@ts-ignore
    const {sharelink}=req.params
    //@ts-ignore
    // console.log(req.sharelink)
    console.log(sharelink)

    const schema=z.object({
        sharelink:z.string(),
    })

    const {data,error}=schema.safeParse({
        sharelink
    })

    if(error){
        console.log(error)
        return res.status(404).json({message:"Page not found"})
    }

    // const user=await Link.findOne({hash:shareLink}).populate("userId")
    const user=await Link.findOne({hash:sharelink})

    console.log(user)

    //@ts-ignore
    const contents=await Content.find({userId:user.userId})

    res.status(201).json({
        contents
    })
}