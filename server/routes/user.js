import express from 'express'
import {signin, signup,listUsers,search,deleteAccount,changePassword,changePrivacy} from '../controllers/user.js'
import auth from '../middlewares/auth.js'

const userRoute = express.Router()

userRoute.get('/',auth,listUsers)
userRoute.get('/search',auth,search)
userRoute.post('/signin',signin)
userRoute.post('/signup',signup)
userRoute.put('/password',auth,changePassword)
userRoute.put('/privacy',auth,changePrivacy)
userRoute.delete('/',auth,deleteAccount)

export default userRoute