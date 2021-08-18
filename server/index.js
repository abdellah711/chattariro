import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import userRoute from './routes/user.js'
import convRouter from './routes/conversation.js'
import handler from './handlers/conversation.js'
import {authIO} from './middlewares/auth.js'
import cors from 'cors'

const PORT = process.env.PORT||5000
const URL = process.env.DB_URL|| 'mongodb+srv://alaoui:alaoui@cluster0.fshzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

const server = createServer(app)

app.use(express.json())
app.use(cors())


mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
    .then(()=>console.log('db connected successfully'))
    .catch(()=>console.log('db failed to connect'))

app.use('/user',userRoute)
app.use('/conversations',convRouter)


const io = new Server(server,{
    cors:['http://localhost:5000/']
})

const {createConversation,listConversations,createMessage,listMessages} = handler(io)

io.use(authIO)

io.on('connection',socket=>{
    console.log('connection',socket.id)

    socket.on('conversation:list',listConversations)
    socket.on('conversation:create',createConversation)
    socket.on('messages:create',createMessage)
    socket.on('messages:list',listMessages)
})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`))