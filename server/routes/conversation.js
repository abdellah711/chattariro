import express from 'express'
import {getConversations,newConversation,deleteConversation} from '../controllers/conversation.js'
import auth from '../middlewares/auth.js'


const router = express.Router()

router.use(auth)
router.get('/',getConversations)
router.post('/',newConversation)
router.delete('/:conversationId',deleteConversation)

export default router