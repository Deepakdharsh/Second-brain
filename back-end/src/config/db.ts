import mongoose from "mongoose"

export async function db(){
    try {
       await mongoose.connect(process.env.MONGO_DB_URI || "")
    } catch (error) {
        //@ts-ignore
        console.log(error.message)
    }
} 