"use strict";
// import jwt from "jsonwebtoken"
// export const auth=(req,res,next)=>{
//     const token=req.headers.token
//     if(token){
//         //@ts-ignore
//         const decoded=jwt.verify(token,process.env.JWT_SECRET)
//         if(decoded){
//             //@ts-ignore
//             req.userId=decoded.id
//             next()
//         }else{
//             return res.status(401).json({
//                 message:"invaild token"
//             })
//         }
//     }else{
//         return res.status(401).json({
//             message:"invaild token"
//         })
//     }
// }
