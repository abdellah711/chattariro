import User from '../models/user.js'
import {unlink} from 'fs/promises'
import Message from '../models/message.js'
import Conversation from '../models/conversation.js'


export const uploadProfilePhoto = async (req,res,next) => {
    const prevImg = await User.findById(req.user.id).select('img').catch(next)
    await User.findByIdAndUpdate(req.user.id,{img:req.file.path}).catch(next)
    res.json({success:true,data:req.file.path})

    if(prevImg?.img){
        await unlink('.'+prevImg.img).catch(err=>console.log(err))
    }
}

export const uploadGroupPhoto = async (req,res,next) => {
    const conv_id = req.params.conv_id
    const prevImg = await Conversation.findById(conv_id).select('img').catch(next)

    const conv = await Conversation.findById(conv_id).catch(next)
    if(conv.creator!== req.user.id) return res.status(401).json({success:false,message:'you are not the creator of this conversation'})
    conv.img = req.file.path
    await conv.save().catch(next)
    res.json({success:true,data:req.file.path})

    if(prevImg?.img){
        await unlink('.'+prevImg.img).catch(err=>console.log(err))
    }
}

export const uploadMsgs = async (req,res,next) =>{
    const {conv_id} = req.params

    //validation
    const conv = await Conversation.findById(conv_id).catch(next)
    if(!conv) return res.status(404).json({success:false,message:'There is no conversation with that id '+conv_id})
    if(!conv.users.includes(req.user.id)) return res.status(401).json({success:false,message:'You\'re not part of that conversation'})

    res.json({
        success: true,
        data:req.file.path
    })
}