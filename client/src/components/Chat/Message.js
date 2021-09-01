import styled from 'styled-components'
import Avatar from '../Avatar'

const Message = ({message,userId,sender,users,messageBefore}) =>{
    const isMe = userId === message.sender
    const hasSendMsgBefore = messageBefore?.sender=== message.sender && messageBefore?.type !== 'event'
    
    const seen = users
        .filter(u=>u.msg === message._id && u.user._id !== userId)
        .map(u =>(<Avatar name={u.user.name} src={u.user.img} style={{'--size':'20px','--font-size':'15px'}}/>))
    
    if(message.type === 'event'){
        return (
        <Wrapper>
            <StyledEvent>
                <span>{sender?.name}</span>{`'s ${message.content}`}
            </StyledEvent>
            <SeenWrapper>{seen}</SeenWrapper>
        </Wrapper>)
    }


    


    return (
        <Wrapper>
            <MsgContainer style={{alignSelf: isMe?'flex-end':'flex-start'}}>
                {!isMe && !hasSendMsgBefore &&<Avatar name={sender?.name} src={sender?.img}/>}
                <StyledMessage style={isMe?{}: {backgroundColor:'var(--primary)',color:'var(--onPrimary)',marginLeft:hasSendMsgBefore?'calc(3rem + 7px)':''}}>
                    <p>{message.content}</p>
                </StyledMessage>
            </MsgContainer>
            {seen.length>0 && <SeenWrapper>{seen}</SeenWrapper>}
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
`
const StyledEvent = styled.p`
    background-color: rgba(100,100,100,.5);
    max-width: 70%;
    padding: .3em .5em;
    border-radius: var(--border-radius);
    text-align: center;
    align-self: center;
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
    margin-top: 5px;
`
const StyledMessage = styled.div`
    background-color: #4a4a4ab8;
    align-self: center;
    padding: .5em;
    border-radius: 7px;
    color: #fff;
    font-size:1.05rem;
    letter-spacing: .4px;
    /* margin-right: 20px; */
`
const SeenWrapper = styled.div`
    display:flex;
    justify-content: flex-end;
    gap: 3px;
    padding: 3px 9px;
`
export default Message
