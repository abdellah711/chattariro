import User from '../models/user.js'
import Conversation from '../models/conversation.js'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export default () =>({
    userConnection: async function(socket,connected=true){
        console.log(`user ${connected?'connection':'disconnection'}`,socket.user.name)

        await User.findByIdAndUpdate(socket.user.id,{isActive:connected}).catch(err => console.log(err))
        const convs = await Conversation.find({users:ObjectId(socket.user.id)},'_id').catch(err => console.log(err))
        socket.to([...convs.map(conv=>conv._id+"")]).emit('user-state-change',socket.user.id,connected)
    },
})