import { useEffect } from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat/Chat'
import Conversations from '../components/Conversations/Conversations'
import { useSocketContext } from '../context/socket-context'
import { useDispatch } from 'react-redux'
import { receiveMessage,createConversation } from '../features/appSlice'
import NewConversationDialog from '../components/Conversations/NewConversationDialog'
import useMobile from '../hooks/useMobile'
import { useLocation } from 'react-router'

export default function Dashboard() {

    const dispatch = useDispatch()
    
    const socket = useSocketContext()
    const isMobile = useMobile()
    const location = useLocation()
    const inConversation = location.pathname.split('/')[2]

    useEffect(()=>{
        socket.on('receive-message',(message)=>{
            dispatch(receiveMessage(message))
        })
        socket.on('new-conversation',(conversation)=>{
            console.log('receive conv',conversation)
            dispatch(createConversation({data:conversation}))
            socket.emit('conversation:join',conversation._id)
        })
        return ()=> {
            socket.off('receive-message')
            socket.off('new-conversation')
        }
    },[])

    return (
        <StyledContainer>
            {isMobile ? !inConversation && <Conversations/>: <Conversations/>}
            {isMobile ? inConversation && <Chat animate/>:<Chat/>}
            <NewConversationDialog/>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    height:calc(100% - 5rem);
    overflow-x: hidden;
`