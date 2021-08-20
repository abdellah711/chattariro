import styled from 'styled-components'
import Avatar from './Avatar'
import { useSelector } from 'react-redux'

export default function Profile({location,history}) {
    
    
    let isMyProfile = false
    let noProfile = true
    if(location.pathname.endsWith('profile')){
        noProfile = false
    }else if( location.hash === '#profile'){
        isMyProfile = true
        noProfile = false
    }
    
    let [data,uId] = useSelector(state => [isMyProfile? state.app.user : state.app.conversations, state.app.user?.id])

    if(noProfile) return <></>
    const conv_id = location.pathname.split('/')[2]
    if(isMyProfile){
        data = {...data,name:data.user}
    }else{
        data = data?.find(conv => conv._id===conv_id)
        console.log(data?.users.filter(u=> u._id!==uId))
        data = {name:data?.users?.filter(u=> u._id!==uId).map(u=>u.name).join(', ')}
    }

    if(!data) return <></>
    console.log('profile',data)
    return (
        <ProfileContainer>
            <Avatar name={data.name} style={{'--size':"9rem",fontSize:"3em"}}/>
            <StyledContainer>
                <StyledName>{data.name}</StyledName>
                {isMyProfile && <StyledEmail>{data.email}</StyledEmail>}
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