import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./config/db"
import { UserRouter } from "./routes/user.route"
import { initPine } from "./config/pine"
import cookieParser from "cookie-parser"
dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

app.use("/api/v1",UserRouter)

async function main (){
   try {
     await db()
     await initPine()
     app.listen(process.env.PORT,()=>{
         console.log(`server is running on port:${process.env.PORT} and your DB is connected`)
     })
   } catch (error) {
    //@ts-ignore
     console.log(error.message)
   }
}

main()