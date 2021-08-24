import User from '../models/user.js'
import {unlink} from 'fs/promises'

export const uploadImg = async (req,res,next) => {
    const url = req.protocol+'://'+req.get('host')+'/'+req.file.path
    const prevImg = await User.findById(req.user.id).select('img').catch(next)
    await User.findByIdAndUpdate(req.user.id,{img:url}).catch(next)
    res.json({success:true,data:url})

    if(prevImg){
        const path = prevImg.img.slice(prevImg.img.indexOf('/static'))
        // console.log(__dirname)
        await unlink('.'+path).catch(err=>console.log(err))
    }
}