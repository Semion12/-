import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nickname:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps:true})

export const User = model('User', UserSchema)

