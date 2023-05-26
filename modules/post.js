import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    description:String,
    imageSrc:{
        type:String,
        default:''
    }
}, {timestamps:true})

export const Post = model('Post', PostSchema)