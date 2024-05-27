import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const userSchema=mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email :{
        unique :true,
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    },
    address :{
        type : String,
        require : true
    },
    refreshToken :{
        type : String
    }
},{timestamps : true});

userSchema.pre("save",async function (next) {
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password);
}

//Mostly async is not required for jwt.
userSchema.methods.generateAccessToken=function () {
    return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    ) 
}
userSchema.methods.generateRefreshToken=function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const userModel=mongoose.model('users',userSchema);