import styled, { keyframes } from 'styled-components'
import {useHistory, useLocation} from 'react-router-dom'
import {ReactComponent as WelcomeIcon} from '../../imgs/welcome.svg'
import ChatForm from './ChatForm'
import ProfileNav from './ProfileNav'
import MessageList from './MessageList'
import { useEffect,useMemo,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useSocketContext } from '../../context/socket-context'
import { receiveMessages,seenMessage,showToast } from '../../features/appSlice'
import SendImgDialog from './SendImgDialog'
import DropImgDialog from './DropImgDialog'
export default function Chat({animate}) {
    
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const conv_id = useMemo(()=>location.pathname.split('/')[2],[location.pathname])
    const [conversation,messages,isLoading,user] = useSelector(state => [state.app.conversations?.find(c=>c._id===conv_id),state.app.messages[conv_id],state.app.isLoadingConversation,state.app.user])
    const [images, setImages] = useState()
    const [showDropContainer, setShowDropContainer] = useState(false)
    const socket = useSocketContext()

    const uId = user._id
    useEffect(() => {
        if(isLoading){
            return
        }
        if(!conversation){
            history.push('/c')
            return
        }
        if(!messages){
            socket.emit('messages:list',conv_id,res=>{
                if(res.success){
                    console.log(res.data)
                    dispatch(receiveMessages({
                        conv_id,
                        messages:res.data
                    }))
                }else{
                    dispatch(showToast({message:res.message}))
                }
            })
        }
    },[isLoading,location.pathname])

    useEffect(()=>{
        if(!conversation) return
        const last_msg = conversation.last_msg
        if(conversation.read.find(r=>r.user===uId).msg === last_msg._id) return

        if(!last_msg.sender !== uId && conversation.read.find(r=>r.user===uId).msg !== last_msg){
            socket.emit('messages:seen',conversation.last_msg)
        }
        dispatch(seenMessage({conv_id,msg_id:last_msg._id,uId}))
    },[messages])

    const handleImgSelect = e =>{
        if(e.target.files.length === 0 ) return
        setImages([...e.target.files])
    }
    const handleDragEnter = (e,enter = true) =>{
        e.stopPropagation();
        e.preventDefault()
        if(enter === showDropContainer) return
        if(!e.dataTransfer?.types.includes('Files')) return console.log('no file')
        setShowDropContainer(enter)
    }
    const handleDrop = e =>{
        e.preventDefault()
        setShowDropContainer(false)
        let selectedFiles = [...e.dataTransfer.files].filter(file => file.type.startsWith('image'))
        selectedFiles = selectedFiles.length === 0?null: selectedFiles
        setImages(selectedFiles)

    }
    return (
        <StyledContainer animate={animate}>
            {!(conv_id && conv_id.length)? <NoChat/>
            :
            <ChatContainer onDragOver={handleDragEnter}>
                <ProfileNav conv_id={conv_id}/>
                <MessageList conversation={conversation} />
                {images && <SendImgDialog images={images} setImages={setImages} token={user.token} conv_id={conv_id}/>}
                {showDropContainer && <DropImgDialog onDrop={handleDrop} onDragLeave={e=>handleDragEnter(e,false)}/>}
                <ChatForm conv_id={conv_id} onImgSelect={handleImgSelect}/>
            </ChatContainer>}
        </StyledContainer>
    )
}



const enterAnimation = keyframes`
    from{transform: translate(50vw);opacity:0}
    to{transform: translate(0);opacity:1}
`

const StyledContainer = styled.div`
    flex:2;
    height:100%;
    background-color:var(--bg-card);
    border-radius:var(--border-radius);
    animation: ${p=>p.animate && enterAnimation} .2s;
`

const ChatContainer = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    position: relative;
`

//no chat
const NoChat = ()=>(
    <NoChatContainer>
        <WelcomeIcon/>
        <p>Select conversation or start new one.</p>
    </NoChatContainer>
)

const NoChatContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    height:100%;
    svg{
        max-width:50%;
    }
    p{
        color: var(--text-second);
        font-size: 1.1rem;
    }
`