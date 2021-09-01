import mongoose from 'mongoose'

const schema = mongoose.Schema({
        content:{type:String,},
        type: {type: String,default:'text'},
        conv_id:{type:mongoose.ObjectId,ref:'Conversation'},
        sender:{type:mongoose.ObjectId,required:true,ref:'users'}
    },{
        timestamps:true
    })

export default mongoose.model('Message', schema)