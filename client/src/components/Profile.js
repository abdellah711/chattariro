import styled from 'styled-components'
import Avatar from './Avatar'
import { useSelector } from 'react-redux'

export default function Profile({location,history}) {
    
    let data = useSelector(state=>state.app)
    
    let isMyProfile = false
    let noProfile = true
    if(location.pathname.endsWith('profile')){
        noProfile = false
    }else if( location.hash === '#profile'){
        isMyProfile = true
        noProfile = false
    }
    if(noProfile) return <></>

    return (
        <ProfileContainer>
            <Avatar name={data.user} style={{'--size':"9rem",fontSize:"3em"}}/>
            <StyledContainer>
                <StyledName>Alaoui</StyledName>
                {isMyProfile && <StyledEmail>alaoui@abdellah.com</StyledEmail>}
            </StyledContainer>
            <ActionsContainer>
                
            </ActionsContainer>
        </ProfileContainer>
    )
}


const ProfileContainer = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 80%;
    align-items:center;
    gap:1em;
`
const StyledContainer = styled.div`
    text-align: center;
`

const ActionsContainer = styled.div`

`

const StyledName = styled.p`
    text-transform: capitalize;
    font-size:1.5rem;
`
const StyledEmail = styled.p`
    color: var(--text-second);
`