import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileImg,logout, showDialog, updateProfile } from '../../features/appSlice'
import authFetch from '../../utils/authFetch'
import { SERVER_URL } from '../../Constants/api'
import { ReactComponent as BackIcon } from '../../imgs/back-arrow.svg'
import PrimaryButton from '../PrimaryButton'
import Switch from '../Switch'
import MediaList from './MediaList'
import ProfileAvatar from './ProfileAvatar'
import dialogContent from '../../Constants/dialog'


export default function Profile({ location, history }) {


    let isMyProfile = false
    let noProfile = true
    if (location.pathname.endsWith('profile')) {
        noProfile = false
    } else if (location.hash === '#profile') {
        isMyProfile = true
        noProfile = false
    }
    const dispatch = useDispatch()

    let [data, user] = useSelector(state => [isMyProfile ? state.app.user : state.app.conversations, state.app.user])
    const uId = user?._id

    if (noProfile) return <></>
    const conv_id = location.pathname.split('/')[2]
    if (!isMyProfile) {
        data = data?.find(conv => conv._id === conv_id)
        console.log(data?.users.filter(u => u._id !== uId))
        data = { name: data?.users?.filter(u => u._id !== uId).map(u => u.name).join(', ') }
    }

    if (!data) return <></>

    const handleFileChange = async e => {

        const file = e.target.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append('img', file)
        const res = await authFetch(`${SERVER_URL}upload`, user.token, 'POST', formData,'multipart/form-data').catch(err => console.error('Error', err))
        if (res.success) {
            dispatch(updateProfileImg(res.data))
        }
    }

    const handlePrivacyChange = async e =>{
        console.log(e.target.checked)
        const res = await authFetch(SERVER_URL+'user/privacy',user?.token,'PUT',{isPrivate:e.target.checked});
        if(res.success){
            dispatch(updateProfile({privacy:res.isPrivate}))
        }

    }

    return (
        <ProfileContainer>
            <ProfileAvatar data={data} isMyProfile={isMyProfile} onChange={handleFileChange}/>
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
                    <h2 style={{ alignSelf: 'flex-start', paddingInline: '1.2rem' }}>Media</h2>
                    <MediaList>

                    </MediaList>
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
const StyledName = styled.p`
    text-transform: capitalize;
    font-size:1.5rem;
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