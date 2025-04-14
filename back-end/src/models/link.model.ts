import mongoose from "mongoose";
const ObjectId=mongoose.Schema.Types.ObjectId
const Schema=mongoose.Schema

const LinkSchema=new Schema({
    hash:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    }
})

export const Link=mongoose.model("Link",LinkSchema)