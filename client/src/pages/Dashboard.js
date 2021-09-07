import { useEffect } from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat/Chat'
import Conversations from '../components/Conversations/Conversations'
import { useSocketContext } from '../context/socket-context'
import { useDispatch, useSelector } from 'react-redux'
import { receiveMessage,createConversation, seenMessage, updateUserState } from '../features/appSlice'
import NewConversationDialog from '../components/Conversations/NewConversationDialog'
import useMobile from '../hooks/useMobile'
import { useLocation } from 'react-router'
import Dialog from '../components/Dialog'
import dialogContent from '../Constants/dialog'
import DeleteAccountDialog from '../components/Profile/DeleteAccountDialog'
import ChangePasswordDialog from '../components/Profile/ChangePasswordDialog'
import Toast from '../components/Toast'

export default function Dashboard() {

    const dispatch = useDispatch()
    const [dialog,toasts] = useSelector(state => [state.app.dialog,state.app.toasts])
    const socket = useSocketContext()
    const isMobile = useMobile()
    const location = useLocation()
    const inConversation = location.pathname.split('/')[2]

    useEffect(()=>{
        socket.on('receive-message',(message)=>{
            dispatch(receiveMessage(message))
        })
        socket.on('new-conversation',(conversation)=>{
            dispatch(createConversation({data:conversation}))
            socket.emit('conversation:join',conversation._id)
        })
        socket.on('seen-message',(conv_id,user,msg)=>{
            dispatch(seenMessage({conv_id,msg_id:msg,uId:user}))
        })
        socket.on('user-state-change',(user,isActive)=>{
            console.log('user connection',user,isActive)
            dispatch(updateUserState({uId:user,isActive}))
        })
        return ()=> {
            socket.off('receive-message')
            socket.off('new-conversation')
            socket.off('seen-message')
            socket.off('user-state-change')
        }
    },[])

    const getContent = (type) => {
        switch(type){
            case dialogContent.NEW_CONVERSATION:
                return <NewConversationDialog/>
            case dialogContent.DELETE_ACCOUNT:
                return <DeleteAccountDialog/>
            case dialogContent.CHANGE_PASSWORD:
                return <ChangePasswordDialog/>
        }
    }

    return (
        <StyledContainer>
            {isMobile ? !inConversation && <Conversations/>: <Conversations/>}
            {isMobile ? inConversation && <Chat animate/>:<Chat/>}
            {dialog?.show && 
                <Dialog>
                    {getContent(dialog.content)}
                </Dialog>
            }
            {toasts.length>0 && <Toast toast={toasts[0]}/>}
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    height:calc(100% - 5rem);
    overflow-x: hidden;
`