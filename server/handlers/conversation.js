import Conversation from "../models/conversation.js"
import Message from "../models/message.js"
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId


export default (io) =>({
    createConversation: async function(payload,cb){
        const socket = this
        const {is_grp,users,img} = payload

        if(!users) return cb({success:false, message:'Please provide conversation members'})
        const usersIds = users.map(u=>ObjectId(u))
        !users.includes(socket.user.id) && usersIds.push(ObjectId(socket.user.id))
        
        if(usersIds.length === 2){
            const existingConv = await Conversation.findOne({users:usersIds}).populate('users')
            if(existingConv) return cb({success:true,exists:true,data:existingConv})
        }


        const msg = await Message.create({sender:ObjectId(socket.user.id),type:"event",content:"started new conversation"}).catch(err=>cb({success:false,message:err.message}))
    
    
        let conv = await Conversation.create({is_grp,img,users:usersIds,last_msg:msg._id}).catch(err=>cb({success:false,message:err.message}))
        conv = await Conversation.populate(conv,'users')
        
        const newMsg = await Message.findByIdAndUpdate(msg._id,{conv_id:conv._id},{new:true})
        conv.last_msg = newMsg
        socket.to(users).emit('new-conversation',conv)
        socket.join(conv._id)
        cb({success:true,data:conv})
    },
    listConversations: async function(cb){
        const socket = this
        const {id} = socket.user
        const convs = await Conversation.find({users:ObjectId(id)},null,{sort:{updatedAt:-1}}).populate('last_msg').populate('users',{password:0}).catch(err=>cb({success:false,message:err.message}))
        //joining conversations
        socket.join([...convs?.map(conv=>conv._id+""),id])
        cb({success:true,data:convs})
    },
   createMessage: async function(msg,cb){
       const socket = this
        const {conv_id,content} = msg
        const message = await Message.create({conv_id,content,sender:ObjectId(socket.user.id)}).catch(err=>cb({success:false,message:err.message}))
        const c = await Conversation.findByIdAndUpdate(conv_id,{last_msg:message._id})
        socket.to(conv_id).emit('receive-message',message)
        cb({success:true,data:message})
   },
   listMessages: async function(conv_id,cb){
        const messages = await Message.find({conv_id}).catch(err=>cb({success:false,message:err.message}))
        cb({success:true,data:messages})
   },
   joinConversation: async function(conv_id){
       const socket = this
       socket.join(conv_id)
   }
})