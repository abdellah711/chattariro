import express from 'express'
import {signin, signup,listUsers,search} from '../controllers/user.js'
import auth from '../middlewares/auth.js'

const userRoute = express.Router()

userRoute.get('/',auth,listUsers)
userRoute.get('/search',auth,search)
userRoute.post('/signin',signin)
userRoute.post('/signup',signup)

export default userRoute