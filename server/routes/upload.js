import express from 'express'
import { uploadImg } from '../controllers/upload.js'
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
    limits: {fileSize: 5000000}
})

const router = express.Router()

router.post('/',[
    auth,
    upload.single('img'),
    uploadImg
])

export default router