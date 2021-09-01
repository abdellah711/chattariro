import { useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Progress from '../Progress'
import Message from './Message'

export default function MessageList({conversation}) {

    const bottomRef = useRef()
    const conv_id = conversation?._id
    const [messages,userId,users] = useSelector(state => [state.app.messages[conv_id],state.app.user._id,state.app.conversations?.find(c=>c._id===conv_id)?.users])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    },[messages?.length])

    const usersWithSeen = conversation?.read.map(r => ({...r,user:conversation.users.find(u=>u._id===r.user)}))
    return (
        <StyledContainer style={{marginBottom:messages?'0':'auto'}}>
            {messages?
                messages.map((message,index)=> <Message key={message._id} users={usersWithSeen} message={message} sender={users?.find(u=>u._id===message.sender)} messageBefore={messages[index-1]} userId={userId}/>)
                :<Progress/>
            }
            <div ref={bottomRef} style={{paddingBlock:'.5rem'}}></div>
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

