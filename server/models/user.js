import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {type: String,required: true},
        email: {type: String,required: true,unique:true},
        password: {type: String,required: true},
        img: String
    }
)

export default mongoose.model('users',userSchema)