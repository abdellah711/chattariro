import mongoose from 'mongoose'

const readSchema = mongoose.Schema({
    user: {type:mongoose.ObjectId,ref:"users",required:true},
    msg: {type:mongoose.ObjectId,ref:'Message'}
})

const schema = mongoose.Schema({
    img: String,
    users: [{type:mongoose.ObjectId,ref:"users"}],
    last_msg: {type:mongoose.ObjectId,ref:'Message',required:true},
    read:{type:[readSchema]},
    name:String,
    creator: String
},{
    timestamps:true
})

export default mongoose.model('Conversation', schema)