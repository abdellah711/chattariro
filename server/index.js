import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/user.js'

const PORT = process.env.PORT||5000
const URL = process.env.DB_URL|| 'mongodb+srv://alaoui:alaoui@cluster0.fshzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.use(express.json())

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=>console.log('db connected successfully'))
    .catch(()=>console.log('db failed to connect'))

app.use('/user',userRoute)

app.listen(PORT,()=>console.log(`server listening on port ${PORT}`))