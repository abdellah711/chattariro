import { useEffect,useRef } from 'react'
import styled from 'styled-components'
import Avatar from '../Avatar'

export default function MessageList() {

    const bottomRef = useRef()

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    },[])

    return (
        <StyledContainer>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
            <Message isMe message={{content:'Hello world!'}} sender={{name:"Alaoui"}}/>
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

const Message = ({message,isMe,sender}) =>{
    return (
        <MsgContainer style={isMe && {alignSelf: 'flex-end'}}>
            {!isMe && <Avatar name={sender.name} src={sender.img}/>}
            <StyledMessage style={isMe && {backgroundColor:'var(--primary)',color:'var(--onPrimary)'}}>
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
    background-color: #9a9a9a;
    align-self: center;
    padding: .5em;
    border-radius: 7px;
    color: #000;
    font-size:1.05rem;
    letter-spacing: .4px;
`