import jwt from 'jsonwebtoken'


const KEY = process.env.KEY||'1234569'

export default function (req,res,next){
    const token = req.headers.authorization?.split(' ')[1]
    
    if(!token) return res.status(401).json({success:false,message:'Unauthorized'})

    if(!jwt.verify(token,KEY)) return res.status(403).json({success:false,message:'Invalid Token'})

    const {user,id} = jwt.decode(token)

    req.user = {id,name:user}
    
    next()
}

export const authIO = (socket,next)=>{
    const token = socket.handshake.auth.token
    // if(!token){
    //     socket.emit('logout')
    // }

    if(!jwt.verify(token,KEY)) return next(new Error('Invalid Token'))

    const {user,id} = jwt.decode(token)

    socket.user = {id,name:user}
    

    next()
}