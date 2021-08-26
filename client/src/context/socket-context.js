import React,{useContext, useMemo} from 'react';
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import { SERVER_URL } from '../Constants/api';
const SocketContext = React.createContext(null)

export const useSocketContext = () =>{

    return useContext(SocketContext)
}

export const SocketProvider = ({children})=>{
    const token = useSelector(state=>state.app?.user?.token)
    const socket = useMemo(()=>new io(SERVER_URL,{
        auth:{
            token
        }
    }),[token])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}