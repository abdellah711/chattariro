import React,{useContext, useMemo} from 'react';
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
const SocketContext = React.createContext(null)

export const useSocketContext = () =>{

    return useContext(SocketContext)
}

export const SocketProvider = ({children})=>{
    const token = useSelector(state=>state.app?.user?.token)
    const socket = useMemo(()=>new io('http://localhost:5000',{
        auth:{
            token
        }
    }),[])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}