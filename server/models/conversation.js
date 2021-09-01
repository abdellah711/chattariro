import mongoose from 'mongoose'

const readSchema = mongoose.Schema({
    user: {type:mongoose.ObjectId,ref:"users",required:true},
    msg: {type:mongoose.ObjectId,ref:'Message'}
})

const schema = mongoose.Schema({
    is_grp:{type: Boolean,default: false},
    img: String,
    users: [{type:mongoose.ObjectId,ref:"users"}],
    last_msg: {type:mongoose.ObjectId,ref:'Message',required:true},
    read:{type:[readSchema]}
},{
    timestamps:true
})

export default mongoose.model('Conversation', schema)