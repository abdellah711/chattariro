import mongoose from 'mongoose'

const schema = mongoose.Schema({
    is_grp:{type: Boolean,default: false},
    img: String,
    users: [{type:mongoose.ObjectId,ref:"users"}],
    last_msg: {type:mongoose.ObjectId,ref:'Message',required:true}
},{
    timestamps:true
})

export default mongoose.model('Conversation', schema)