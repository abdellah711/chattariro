import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export const getConversations = async (req,res,next) =>{
    const {id} = req.user
    const convs = await Conversation.find({users:ObjectId(id)}).populate('last_msg').populate('users').catch(next)
    res.json({success:true,data:convs})
}

export const newConversation = async (req,res,next) =>{
    const {is_grp,users,last_msg,img} = req.body

    if(!users || !last_msg) return res.status(403).json({success:false, message:'Please provide conversation users and last message'})

    const msg = await Message.create({...last_msg,sender:ObjectId(req.user.id)}).catch(next)


    const usersIds = users.map(u=>ObjectId(u._id))
    usersIds.push(ObjectId(req.user.id))

    const conv = await Conversation.create({is_grp,img,users:usersIds,last_msg:msg._id}).catch(next)
    await Message.findByIdAndUpdate(msg._id,{conv_id:conv._id})
    res.json({success:true,data:conv})
}

export const deleteConversation = async (req,res,next) =>{
    const conv_id = req.params.conversationId
    await Conversation.findByIdAndDelete(conv_id).catch(next)
    res.json({success:true})
}