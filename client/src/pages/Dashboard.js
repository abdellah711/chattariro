import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Chat from '../components/Chat/Chat'
import Conversations from '../components/Conversations/Conversations'
import useMobile from '../hooks/useMobile'

export default function Dashboard() {

    const isMobile = useMobile()
    const location = useLocation()


    return (
        <StyledContainer>
            <Conversations/>
            <Chat/>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    flex:1;
`