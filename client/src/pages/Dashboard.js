import { useEffect } from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat/Chat'
import Conversations from '../components/Conversations/Conversations'
import { useSocketContext } from '../context/socket-context'
import { useDispatch } from 'react-redux'
import { receiveMessage,createConversation } from '../features/appSlice'

export default function Dashboard() {

    const dispatch = useDispatch()
    
    const socket = useSocketContext()

    useEffect(()=>{
        socket.on('receive-message',(message)=>{
            console.log('receiveMessage')
            dispatch(receiveMessage(message))
        })
        socket.on('new-conversation',(conversation)=>{
            dispatch(createConversation(conversation))
        })
        return ()=> {
            socket.off('receive-message')
            socket.off('new-conversation')
        }
    },[])

    return (
        <StyledContainer>
            <Conversations/>
            <Chat/>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    /* flex:1; */
    height:calc(100% - 5rem);
    
`