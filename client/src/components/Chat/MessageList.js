import { useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Avatar from '../Avatar'
import Progress from '../Progress'


export default function MessageList({conv_id}) {

    const bottomRef = useRef()
    const [messages,userId,users] = useSelector(state => [state.app.messages[conv_id],state.app.user._id,state.app.conversations?.find(c=>c._id===conv_id)?.users])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    },[messages?.length])


    return (
        <StyledContainer style={{marginBottom:messages?'0':'auto'}}>
            {messages?
                messages.map(message=> <Message key={message._id} message={message} sender={users?.find(u=>u._id===message.sender)} isMe={message.sender ===userId}/>)
                :<Progress/>
            }
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
    align-items: center;
`

const Message = ({message,isMe,sender}) =>{
    if(message.type === 'event'){
        return (
        <StyledEvent>
            <span>{sender?.name}</span>{`'s ${message.content}`}
        </StyledEvent>)
    }
    return (
        <MsgContainer style={{alignSelf: isMe?'flex-end':'flex-start'}}>
            {!isMe && <Avatar name={sender?.name} src={sender?.img}/>}
            <StyledMessage style={isMe?{}: {backgroundColor:'var(--primary)',color:'var(--onPrimary)'}}>
                <p>{message.content}</p>
            </StyledMessage>
        </MsgContainer>
    )
}

const StyledEvent = styled.p`
    background-color: rgba(100,100,100,.5);
    max-width: 70%;
    padding: .3em .5em;
    border-radius: var(--border-radius);
    text-align: center;
    margin-block: .3em;
    &>span{
        text-transform: capitalize;
    }
`

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