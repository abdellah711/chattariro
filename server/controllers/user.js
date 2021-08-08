import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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