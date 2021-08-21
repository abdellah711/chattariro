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
    
    const data = {id:user._id,user: user.name}
    
    const token = jwt.sign(data,KEY)
    res.status(200).json({success:true,token,data})
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
    const data = {id:user._id,user: user.name}
    
    const token = jwt.sign(data,KEY)
    res.status(200).json({success:true,token,data})
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
        {$match:{_id:{$ne:mongoose.Types.ObjectId(req.user.id)}}},
        {$sample:{size:10}},
        {$project:{password:0,email:0}}
    ]).catch(next)

    res.json({success:true,data})
}