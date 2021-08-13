import styled from 'styled-components'
import {useLocation} from 'react-router-dom'
import {ReactComponent as WelcomeIcon} from '../../imgs/welcome.svg'
import ChatForm from './ChatForm'
import ProfileNav from './ProfileNav'
import MessageList from './MessageList'

export default function Chat() {

    const location = useLocation()

    const conv_id = location.pathname.split('/')[2]
    

    

    return (
        <StyledContainer>
            {!(conv_id && conv_id.length)? <NoChat/>
            :
            <ChatContainer>
                <ProfileNav/>
                <MessageList/>
                <ChatForm/>
            </ChatContainer>}
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    flex:2;
    height:100%;
    background-color:var(--bg-card);
    border-radius:var(--border-radius);
`

const ChatContainer = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
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