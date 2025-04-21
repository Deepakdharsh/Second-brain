import mongoose from "mongoose";
const ObjectId=mongoose.Schema.Types.ObjectId
const Schema=mongoose.Schema

const ContentSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["image","video","article","audio","youtube","tweeter"],
        required:true
    },
    tags:[{type:ObjectId,ref:"Tag"}],
    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    }
})

export const Content=mongoose.model("Content",ContentSchema)