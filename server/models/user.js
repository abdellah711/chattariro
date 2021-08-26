import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {type: String,required: true},
        email: {type: String,required: true,unique:true},
        password: {type: String,required: true},
        img: String,
        private: {type: Boolean, default:false}
    }
)

export default mongoose.model('users',userSchema)