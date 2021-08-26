import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import { showDialog } from '../../features/appSlice'
import { useDispatch } from 'react-redux'
import Input from '../Input'


const DeleteAccountDialog = () => {

    const dispatch = useDispatch()


    return (
        <StyledContainer>
            <h2>Delete Account</h2>
            <p>If you deleted your account you will not be able to access it again!</p>
            <Input type="password" placeholder="Password" />
            <ButtonsWrapper>
                <SecondButton onClick={() => dispatch(showDialog({ show: false }))}>Cancel</SecondButton>
                <PrimaryButton style={{ fontSize: '.95rem','--primary':'var(--error-color)','--primaryHover':'var(--error-color)' }} >Delete</PrimaryButton>
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

export default DeleteAccountDialog
