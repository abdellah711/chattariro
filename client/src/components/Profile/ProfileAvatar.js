import styled from 'styled-components'
import { ReactComponent as CameraIcon } from '../../imgs/camera.svg'
import Avatar from '../Avatar'


const ProfileAvatar = ({isMyProfile,data,onChange,isGrp,uId}) => {
    const canUpdatePhoto = isMyProfile || (isGrp && data.creator === uId)
    return (
        <>
          <StyledLabel htmlFor="profile-img">
                <Avatar name={data.name} src={data.img} style={{ '--size': "9rem", fontSize: "3em" }} />
                {canUpdatePhoto && <IconWrapper><CameraIcon /></IconWrapper>}
            </StyledLabel>
            {canUpdatePhoto &&<StyledInput type="file" name="img" id="profile-img" accept="image/*" onChange={onChange} />}
        </>
    )
}

const StyledLabel = styled.label`
    position:relative;
`
const IconWrapper = styled.div`
        position: absolute;
        bottom: 3px;
        right:-3px;
        border-radius: 50%;
        background-color: #afafaf;
        height: 2.5rem;
        width:2.5rem;
        cursor: pointer;
    &>svg{
        margin: .3rem;
        }
`
const StyledInput = styled.input`
    display: none;
`

export default ProfileAvatar
