import styled from 'styled-components'
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileImg } from '../features/appSlice'
import authFetch from '../utils/authFetch'
import {SERVER_URL} from '../Constants/api'
import { ReactComponent as CameraIcon } from '../imgs/camera.svg'
export default function Profile({location,history}) {
    
    
    let isMyProfile = false
    let noProfile = true
    if(location.pathname.endsWith('profile')){
        noProfile = false
    }else if( location.hash === '#profile'){
        isMyProfile = true
        noProfile = false
    }
    const dispatch = useDispatch()

    let [data,user] = useSelector(state => [isMyProfile? state.app.user : state.app.conversations, state.app.user])
    const uId = user?.id

    if(noProfile) return <></>
    const conv_id = location.pathname.split('/')[2]
    if(isMyProfile){
        data = {...data,name:data?.user}
    }else{
        data = data?.find(conv => conv._id===conv_id)
        console.log(data?.users.filter(u=> u._id!==uId))
        data = {name:data?.users?.filter(u=> u._id!==uId).map(u=>u.name).join(', ')}
    }

    if(!data) return <></>
    
    const handleFileChange = async e =>{

        const file = e.target.files[0]
        if(!file) return
        const formData = new FormData()
        formData.append('img',file)
        const res = await authFetch(`${SERVER_URL}upload`,user.token,'POST',formData).catch(err => console.error('Error',err))
        if(res.success){
            dispatch(updateProfileImg(res.data))
        }
    }

    return (
        <ProfileContainer>
            <StyledLabel htmlFor="profile-img">
                <Avatar name={data.name} src={data.img} style={{'--size':"9rem",fontSize:"3em"}}/>
                {isMyProfile && <IconWrapper><CameraIcon/></IconWrapper>}
            </StyledLabel>
            <StyledInput type="file" name="img" id="profile-img" accept="image/*" onChange={handleFileChange}/>
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
const StyledLabel = styled.label`
    position:relative;

    
`
const IconWrapper = styled.div`
        position: absolute;
        bottom: 3px;
        right:-3px;
        border-radius: 50%;
        background-color: var(--text-second);
        height: 2.5rem;
        width:2.5rem;
        cursor: pointer;
    &>svg{
        margin: .3rem;
        }
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
const StyledInput = styled.input`
    display: none;
`