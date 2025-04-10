import mongoose from "mongoose"
const ObjectId=mongoose.Schema.Types.ObjectId
const Schema=mongoose.Schema

const TagsSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    }
})

export const Tag=mongoose.model("Tag",TagsSchema)
