import Conversation from "../models/conversation.js"
import Message from "../models/message.js"
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export default io =>({
    createMessage: async function(msg,cb){
        const socket = this
        const {conv_id,content,type} = msg

        const message = await Message.create({conv_id,content,type,sender:ObjectId(socket.user.id)}).catch(err=>cb({success:false,message:err.message}))
        const conv = await Conversation.findById(conv_id).catch(err => cb({success:false,message:err.message}))
        conv.last_msg = message._id
        const index =conv.read.findIndex(r => r.user.toString() === socket.user.id)
        conv.read[index].msg = message._id
        await conv.save()
        socket.to(conv_id).emit('receive-message',message)
        cb({success:true,data:message})
    },
    listMessages: async function(conv_id,cb){
         const messages = await Message.find({conv_id}).catch(err=>cb({success:false,message:err.message}))
         cb({success:true,data:messages})
    },
    seenMessage: async function(msg){
        const socket = this
        const conversation = await Conversation.findById(msg.conv_id).catch(err => cb({success:false,message:err.message}))
        socket.to(msg.conv_id).emit('seen-message',msg.conv_id,socket.user.id,msg._id)
        const index =conversation.read.findIndex(r => r.user.toString() === socket.user.id)
        conversation.read[index].msg = msg._id
        await conversation.save()
    },
})