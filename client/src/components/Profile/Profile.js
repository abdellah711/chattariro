import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePhoto,logout, showDialog, updateProfile,showToast } from '../../features/appSlice'
import authFetch from '../../utils/authFetch'
import { SERVER_URL } from '../../Constants/api'
import { ReactComponent as BackIcon } from '../../imgs/back-arrow.svg'
import PrimaryButton from '../PrimaryButton'
import Switch from '../Switch'
import MediaList from './MediaList'
import ProfileAvatar from './ProfileAvatar'
import dialogContent from '../../Constants/dialog'
import Progress from '../Progress'
import MembersList from './MembersList'


export default function Profile({ location }) {


    let isMyProfile = false
    let noProfile = true
    if (location.pathname.endsWith('profile')) {
        noProfile = false
    } else if (location.hash === '#profile') {
        isMyProfile = true
        noProfile = false
    }
    const dispatch = useDispatch()
    const conv_id = location.pathname.split('/')[2]

    let [data, user,messages] = useSelector(state => [isMyProfile ? state.app.user : state.app.conversations, state.app.user,!isMyProfile && state.app.messages && state.app.messages[conv_id]])

    if (noProfile) return <></>
    if (!isMyProfile) {
        data = data?.find(conv => conv._id === conv_id)
        data = data && { name: data?.name ?? data?.users?.map(u => u.name).join(', ') ,...data}
    }
    
    if (!data) return <ProfileContainer><Progress/></ProfileContainer>
    const isGrp = data?.users?.length>2

    const handleFileChange = async e => {

        const file = e.target.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append('img', file)
        const res = await authFetch(`${SERVER_URL}upload/${!isGrp?'profile':'group/'+conv_id}`, user.token, 'POST', formData,false).catch(err => console.error('Error', err))
        if (res.success) {
            dispatch(updateProfilePhoto({img:res.data,isGrp,conv_id}))
        }else{
            dispatch(showToast({message:res.message}))
        }
    }

    const handlePrivacyChange = async e =>{
        const res = await authFetch(SERVER_URL+'user/privacy',user?.token,'PUT',{isPrivate:e.target.checked});
        if(res.success){
            dispatch(updateProfile({privacy:res.isPrivate}))
        }else{
            dispatch(showToast({message:res.message}))
        }

    }
    return (
        <ProfileContainer>
            <ProfileAvatar data={data} isMyProfile={isMyProfile} onChange={handleFileChange} uId={user._id} isGrp={isGrp}/>
            <StyledContainer>
                <StyledName>{data.name}</StyledName>
                {isMyProfile && <StyledEmail>{data.email}</StyledEmail>}
            </StyledContainer>
            {isMyProfile &&
            <>
                <ActionsContainer>
                    <StyledAction onClick={()=>dispatch(showDialog({show:true,content:dialogContent.CHANGE_PASSWORD}))}>
                        <h3>Change Password</h3>
                        <BackIcon/>
                        <p>Change your account password</p>
                    </StyledAction>
                    <StyledAction>
                        <h3>Private Account</h3>
                        <Switch initialValue={user?.isPrivate} onChange={handlePrivacyChange}/>
                        <p>No one can create conversation with you</p>
                    </StyledAction>
                </ActionsContainer>
                <ButtonsContainer>
                    <DeleteButton onClick={()=>dispatch(showDialog({show:true,content:dialogContent.DELETE_ACCOUNT}))}>Delete Account</DeleteButton>
                    <PrimaryButton style={{ fontSize: '1rem' }} onClick={()=>dispatch(logout())}>Log out</PrimaryButton>
                </ButtonsContainer>
                </>
            }
            {!isMyProfile &&
                <>
                    {isGrp && 
                        <>
                            <StyledTitle>Members</StyledTitle>
                            <MembersList members={data.users}/>
                        </>
                        }
                    <StyledTitle>Media</StyledTitle>
                    <MediaList 
                        items={messages?.filter(msg => msg.type === 'image')}
                        />
                </>
            }
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
    display: flex;
    flex-direction: column;
    width: 100%;
    gap:.5rem;
    flex-grow:1;
    margin-top: max(1rem,5vh);
`
const StyledAction = styled.label`
    display:grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    text-align: start;
    column-gap: 1rem;
    padding: .7rem 2rem;
    cursor:pointer;
    
    &:hover{
        background-color: rgba(100,100,100,.3);
    }
    &>p{
        color:var(--text-second);
    }
    &>input,svg{
        grid-row: 1/3;
        grid-column: 2;
        align-self: center;
    }
    &>svg{
        height: 50%;
        transform: rotate(180deg);
    }
`
const StyledTitle = styled.h2`
    align-self: flex-start;
    padding-inline: 1.2rem;
`
const StyledName = styled.p`
    text-transform: capitalize;
    font-size:1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
    text-overflow: ellipsis;
    overflow: hidden;
`
const StyledEmail = styled.p`
    color: var(--text-second);
`

const ButtonsContainer = styled.div`
    display:flex;
    justify-content: space-evenly;
    margin-top: 2rem;
    align-self: stretch;
`
const DeleteButton = styled.button`
    background-color: #00000000;
    color: var(--error-color);
    padding: .3em .83em;
    border: 0;
    font-family: inherit;
    font-size: 1.1rem;
    cursor:pointer;
    border-radius: var(--border-radius);
    transition: background-color .3s;
    &:hover{
        background-color: var(--error-color20);
    }
`