import express from "express"
import { login,signup,createContent,getContent,deleteContent,createLink,shareLink } from "../controller/user.controller"

const UserRouter=express.Router()
//@ts-ignore
UserRouter.post("/login",login)
//@ts-ignore
UserRouter.post("/signup",signup)
//@ts-ignore
UserRouter.post("/content",createContent)
//@ts-ignore
UserRouter.get("/content",getContent)
//@ts-ignore
UserRouter.delete("/content",deleteContent)
//@ts-ignore
UserRouter.post("/brain/share",createLink)
//@ts-ignore
UserRouter.get("/brain/:sharelink",shareLink)

export { UserRouter }