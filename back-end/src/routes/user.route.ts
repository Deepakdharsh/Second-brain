import express from "express"
import { login,signup,createContent,getContent,deleteContent,createLink,createTag,LinkShare } from "../controller/user.controller"
import { auth } from "../middlewares/auth.middleware"
import { rag } from "../controller/rag.controller"

const UserRouter=express.Router()
//@ts-ignore
UserRouter.post("/rag",rag)
//@ts-ignore
UserRouter.post("/signup",signup)
//@ts-ignore
UserRouter.post("/login",login)
//@ts-ignore
UserRouter.post("/content",auth,createContent)
//@ts-ignore
UserRouter.get("/content",auth,getContent)
//@ts-ignore
UserRouter.post("/tag",auth,createTag)
//@ts-ignore
UserRouter.delete("/content",auth,deleteContent)
//@ts-ignore
UserRouter.post("/brain/share",auth,createLink)
//@ts-ignore
UserRouter.get("/brain/:sharelink",LinkShare)

export { UserRouter }