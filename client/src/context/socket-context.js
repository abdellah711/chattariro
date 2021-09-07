import React,{useContext, useMemo} from 'react';
import io from 'socket.io-client'
import { SERVER_URL } from '../Constants/api';
const SocketContext = React.createContext(null)

export const useSocketContext = () =>useContext(SocketContext)


export const SocketProvider = ({children,token})=>{
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