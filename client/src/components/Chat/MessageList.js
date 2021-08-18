import { useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Avatar from '../Avatar'

export default function MessageList({conv_id}) {

    const bottomRef = useRef()
    const [messages,userId] = useSelector(state => [state.app.messages[conv_id],state.app.user.id])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    },[messages?.length])


    return (
        <StyledContainer>
            {messages?.map(message=> <Message key={message._id} message={message} isMe={message.sender ===userId}/>)}
            <div ref={bottomRef}></div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    margin-top:auto;
    width:100%;
    display:flex;
    flex-direction: column;
    overflow-y: auto;
`

const Message = ({message,isMe}) =>{
    return (
        <MsgContainer style={isMe? {alignSelf: 'flex-end'}:{}}>
            {!isMe && <Avatar name={'message.sender.name'} src={message.sender?.img}/>}
            <StyledMessage style={isMe?{}: {backgroundColor:'var(--primary)',color:'var(--onPrimary)'}}>
                <p>{message.content}</p>
            </StyledMessage>
        </MsgContainer>
    )
}

const MsgContainer = styled.div`
    display:flex;
    max-width: 60%;
    margin-inline: .75em;
    gap: 7px;
    margin-block: 5px;
`
const StyledMessage = styled.div`
    background-color: #4a4a4ab8;
    align-self: center;
    padding: .5em;
    border-radius: 7px;
    color: #fff;
    font-size:1.05rem;
    letter-spacing: .4px;
`