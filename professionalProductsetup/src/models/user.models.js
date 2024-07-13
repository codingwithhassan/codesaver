import mongoose from "mongoose";
import bcrypt from 'bcrypt'
let userSchema= new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique : true,
        lowercase: true,
        
        trim : true
    },
    fullname:{
        required : true,
        type: String,
        trim : true,
    },
    role: {
        type : String,
        required : true,
        default : 'user'
    },
    avatar : {
        type : String,
        required : true
    },
    coverImage : {
        type : String,
    },
    password : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    refreshToken : {
        type : String
    }
},{
    timestamps : true
})

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

userSchema.method.isPasswordMatch = async function(password){
    const user = this
    return await bcrypt.compare(password, user.password)
}

export const User = mongoose.model('User', userSchema)