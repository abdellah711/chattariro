import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import userRoute from './routes/user.js'
import convRouter from './routes/conversation.js'
import conversationHandler from './handlers/conversation.js'
import messageHandler from './handlers/message.js'
import userHandler from './handlers/user.handler.js'
import {authIO} from './middlewares/auth.js'
import upload from './routes/upload.js'
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

app.use('/static',express.static('static'))
app.use('/user',userRoute)
app.use('/conversations',convRouter)
app.use('/upload',upload)

const io = new Server(server,{
    cors:['http://localhost:5000/']
})

const {createConversation,
    listConversations,
    joinConversation,
} = conversationHandler(io)

const {
    createMessage,
    listMessages,
    seenMessage,
} = messageHandler(io)

const {
    userConnection
} = userHandler()

io.use(authIO)

io.on('connection',socket=>{
    userConnection(socket)
    
    socket.on('conversation:list',listConversations)
    socket.on('conversation:create',createConversation)
    socket.on('conversation:join',joinConversation)
    socket.on('messages:create',createMessage)
    socket.on('messages:list',listMessages)
    socket.on('messages:seen',seenMessage)
    
    socket.on('disconnect',()=>userConnection(socket,false))

})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`))