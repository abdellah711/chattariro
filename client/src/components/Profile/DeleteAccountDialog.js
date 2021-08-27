import {useState} from 'react'
import styled from 'styled-components'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import { logout, showDialog } from '../../features/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input'
import { SERVER_URL } from '../../Constants/api'
import authFetch from '../../utils/authFetch'

const DeleteAccountDialog = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.app.user?.token)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleDelete = async e =>{
        e.preventDefault()
        setLoading(true)
        const res =  await authFetch(SERVER_URL+'user',token,'DELETE',{password})
        if(res?.success){
            dispatch(logout())
        }else if(res?.message){
            setError(res.message)
        }
        setLoading(false)
    }
    const handleChange = e=>{
        setError(null)
        setPassword(e.target.value)
    }

    return (
        <StyledContainer onSubmit={handleDelete}>
            <h2>Delete Account</h2>
            <p>If you deleted your account you will not be able to access it again!</p>
            <Input type="password" placeholder="Password" error={error} value={password} onChange={handleChange}/>
            <ButtonsWrapper>
                <SecondButton type="button" onClick={() => dispatch(showDialog({ show: false }))}>Cancel</SecondButton>
                <PrimaryButton loading={loading} style={{ fontSize: '.95rem','--primary':'var(--error-color)','--primaryHover':'var(--error-color)' }} >Delete</PrimaryButton>
            </ButtonsWrapper>
        </StyledContainer>

    )
}
const StyledContainer = styled.form`
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
