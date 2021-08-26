import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import { showDialog } from '../../features/appSlice'
import Input from '../Input'

const ChangePasswordDialog = () => {

    const dispatch = useDispatch()

    return (
        <StyledContainer>
            <h2>Change your password</h2>
            <Input type="password" placeholder="Current Password" />
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm Password" forcedPlaceholder="Enter your password confirmation"/>
            <ButtonsWrapper>
                    <SecondButton onClick={()=>dispatch(showDialog({show:false}))}>Cancel</SecondButton>
                    <PrimaryButton style={{ fontSize: '.95rem' }} >change</PrimaryButton>
            </ButtonsWrapper>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding: .83rem 1rem;
    gap: .9rem;
`

const ButtonsWrapper = styled.div`
    display:flex;
    justify-content: space-between;
`

export default ChangePasswordDialog
