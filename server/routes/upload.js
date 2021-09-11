import express from 'express'
import { uploadGroupPhoto,uploadProfilePhoto,uploadMsgs } from '../controllers/upload.js'
import multer from 'multer'
import path from 'path'
import auth from '../middlewares/auth.js'

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'static/imgs/')
    },
    filename: (req,file,cb) =>{
        cb(null,req.user.id+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 10000000}
})

const router = express.Router()

router.post('/profile',[
    auth,
    upload.single('img'),
    uploadProfilePhoto
])
router.post('/group/:conv_id',[
    auth,
    upload.single('img'),
    uploadGroupPhoto
])

router.post('/message/:conv_id',[
    auth,
    upload.single('img'),
    uploadMsgs
])

export default router