import { useEffect } from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat/Chat'
import Conversations from '../components/Conversations/Conversations'
import { useSocketContext } from '../context/socket-context'
import { useDispatch } from 'react-redux'
import { receiveMessage,createConversation } from '../features/appSlice'
import NewConversationDialog from '../components/Conversations/NewConversationDialog'

export default function Dashboard() {

    const dispatch = useDispatch()
    
    const socket = useSocketContext()

    useEffect(()=>{
        socket.on('receive-message',(message)=>{
            dispatch(receiveMessage(message))
        })
        socket.on('new-conversation',(conversation)=>{
            dispatch(createConversation(conversation))
            socket.emit('conversation:join',conversation._id)
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
            <NewConversationDialog/>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    height:calc(100% - 5rem);
    
`