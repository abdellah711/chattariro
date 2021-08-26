import User from '../models/user.js'
import {unlink} from 'fs/promises'

export const uploadImg = async (req,res,next) => {
    const prevImg = await User.findById(req.user.id).select('img').catch(next)
    await User.findByIdAndUpdate(req.user.id,{img:req.file.path}).catch(next)
    res.json({success:true,data:req.file.path})

    if(prevImg){
        await unlink('.'+prevImg.img).catch(err=>console.log(err))
    }
}