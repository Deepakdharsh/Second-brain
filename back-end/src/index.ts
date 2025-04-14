import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./config/db"
import { UserRouter } from "./routes/user.route"
dotenv.config()
const app=express()

app.use(express.json())
// app.use(cors({
//     origin:["http://localhost:5173"]
// }))

app.use("/api/v1",UserRouter)

async function main (){
    await db()
    app.listen(process.env.PORT,()=>{
        console.log(process.env.HF+' '+"hello from HF")
        console.log(`server is running on port:${process.env.PORT} and your DB is connected`)
    })
}

main()