import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const KEY = process.env.KEY||'1234569'
// const JKEY = process.env.JKEY||'1234569'

export const signin = async (req,res,next) =>{
    const {email, password} = req.body

    //validation
    const user = await User.findOne({email})

    if(!user) return res.status(403).json({success:false,field:'email',message:'User doesn\'t exist'})

    const isCorrect = await bcrypt.compare(password,user.password)

    if(!isCorrect) return res.status(403).json({success:false,field:'password',message:'Wrong Password!'})
    
    const data = {id:user._id,user: user.name,email:user.email}
    
    const token = jwt.sign(data,KEY)

    res.status(200).json({success:true,token,data:user})
}

export const signup = async (req,res,next) =>{
    const {name,email,password} = req.body

    //validation
    const existingUser = await User.findOne({email}).catch(next)
    if(existingUser) return res.status(403).json({success:false,field:'email',message:'User already exists'})

    if(password.length<8)return res.status(403).json({success:false,field:'password',message:'Password should have at least 8 characters'})

    //creating user
    const pwd = await bcrypt.hash(password,12).catch(next)
    const user = await User.create({name,email,password:pwd}).catch(next)

    //returning token
    const data = {id:user._id,user: user.name,email:user.email}
    
    const token = jwt.sign(data,KEY)

    res.status(200).json({success:true,token,data:user})
}

export const search = async (req,res,next) =>{
    const query = req.query.q
    const regex = new RegExp(query, 'i')
    const data = await User.find({
        name:{$regex: regex},
        _id:{$ne: mongoose.Types.ObjectId(req.user.id)}
    },).select({password:0,email:0}).limit(10).catch(next)
    
    res.json({success:true,data})
}

export const listUsers = async (req,res,next) =>{

    const data = await User.aggregate([
        {$match:{_id:{$ne:mongoose.Types.ObjectId(req.user.id)},isPrivate:{$ne:true}}},
        {$sample:{size:10}},
        {$project:{password:0,email:0}}
    ]).catch(next)

    res.json({success:true,data})
}

export const deleteAccount = async (req,res,next) =>{
    const {password} = req.body
    const user = await User.findById(req.user.id).select('password').catch(next)
    const isCorrect = await bcrypt.compare(password,user.password)
    if(!isCorrect) return res.status(401).json({success:false,message:'Wrong Password!',field:'password'})
    await User.findByIdAndDelete(req.user.id).catch(next)
    res.json({success:true})
}

export const changePassword = async (req,res,next)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user.id).select('password').catch(next)
    const isCorrect = await bcrypt.compare(oldPassword,user.password)
    if(!isCorrect) return res.status(401).json({success:false,message:'Wrong Password!',field:'oldPassword'})
    if(newPassword.length<8) return res.status(403).json({success:false,message:'New Password too short!',field:'newPassword'})

    const hashedPassword = await bcrypt.hash(newPassword,12).catch(next)
    user.password = hashedPassword
    await User.findByIdAndUpdate(req.user.id,{password:hashedPassword}).catch(next)

    res.json({success:true})
}

export const changePrivacy = async (req,res,next) =>{
    const {isPrivate} = req.body
    
    await User.findByIdAndUpdate(req.user.id,{isPrivate}).catch(next)

    res.json({success:true,isPrivate})
}