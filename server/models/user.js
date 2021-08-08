import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {type: String,required: true},
        email: {type: String,required: true},
        password: {type: String,required: true},
        lastname: {type: String,default: ''},
        image: String
    }
)

export default mongoose.model('users',userSchema)