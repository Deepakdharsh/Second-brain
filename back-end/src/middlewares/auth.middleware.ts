import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const auth=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers.token
        if(token){
            //@ts-ignore
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded,"from the auth middleware")
            if(!decoded){
                return res.status(401).json({
                    message:"invaild token"
                })
            }
            //@ts-ignore
            req.userId=decoded.id
            next()
                
        }else{
            return res.status(401).json({
                message:"invaild token"
            })
        }
    } catch (error) {
        //@ts-ignore
        console.log(`Error in Auth middleware ${error.message}`)
        res.status(401).json({
            message:"Internal server error"
        })
    }
}
