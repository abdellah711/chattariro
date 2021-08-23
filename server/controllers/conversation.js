import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export const getConversations = async (req,res,next) =>{
    const {id} = req.user
    const convs = await Conversation.find({users:ObjectId(id)},null,{sort:{updatedAt:1}}).populate('last_msg').populate('users',{password:0}).catch(next)
    res.json({success:true,data:convs})
}

export const newConversation = async (req,res,next) =>{
        const {is_grp,users,img} = req.body

        if(!users) return res.json({success:false, message:'Please provide conversation members'})

        const usersIds = users.map(u=>ObjectId(u))
        !users.includes(req.user.id) && usersIds.push(ObjectId(req.user.id))

        if(usersIds.length === 2){
            const existingConv = await Conversation.findOne({users:{$all:users, $size:2}})
            if(existingConv) return res.json({success:true,exists:true,data:existingConv})
        }

        const msg = await Message.create({sender:ObjectId(req.user.id),type:"event",content:"started new conversation"}).catch(err=>res.json({success:false,message:err.message}))
    
        
    
        let conv = await Conversation.create({is_grp,img,users:usersIds,last_msg:msg._id}).catch(err=>res.json({success:false,message:err.message}))
        conv = await Conversation.populate(conv,'users')
        
        const newMsg = await Message.findByIdAndUpdate(msg._id,{conv_id:conv._id},{new:true})
        conv.last_msg = newMsg
        res.json({success:true,data:conv})
}

export const deleteConversation = async (req,res,next) =>{
    const conv_id = req.params.conversationId
    await Conversation.findByIdAndDelete(conv_id).catch(next)
    res.json({success:true})
}