import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import styled from 'styled-components'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import { showDialog,showToast } from '../../features/appSlice'
import Input from '../Input'
import authFetch from '../../utils/authFetch'
import { SERVER_URL } from '../../Constants/api'

const ChangePasswordDialog = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.app.user?.token)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({oldPassword:'',newPassword:'',confirmation:''})
    const [errors, setErrors] = useState({})
    const handleChangeClick = async e =>{
        e.preventDefault()
        if(isLoading) return
        if(formData.newPassword!== formData.confirmation){
            return setErrors({...errors,confirmation:'Confirmation doesn\'t match password'})
        }
        if(formData.newPassword.length < 8){
            return setErrors({...errors,newPassword:'Password should be minimum 8 characters!'})
        }
        if(formData.newPassword=== formData.oldPassword){
            return setErrors({...errors,newPassword:'The new password is the same as the old!'})
        }

        setIsLoading(true)
        const res = await authFetch(SERVER_URL+'user/password',token,'PUT',formData).catch(err => console.error(err))
        if(res?.success){
            dispatch(showDialog({show:false}))
            dispatch(showToast({message:'Password has been Changed Successfully!'}))
        }else if(res.field){
            setErrors({...errors,[res.field]:res.message})
        }
        setIsLoading(false)
    }
    const handleChange = e =>{
        setFormData(data => ({...data,[e.target.name]:e.target.value}))
        setErrors({})
    }
    return (
        <StyledContainer onSubmit={handleChangeClick}>
            <h2>Change your password</h2>
            <Input type="password" name="oldPassword" onChange={handleChange} placeholder="Current Password"  error={errors.oldPassword}/>
            <Input type="password" name="newPassword" onChange={handleChange} placeholder="New Password"  error={errors.newPassword}/>
            <Input type="password" name="confirmation" onChange={handleChange} placeholder="Confirm Password" forcedPlaceholder="Enter your password confirmation" error={errors.confirmation}/>
            <ButtonsWrapper>
                    <SecondButton type="button" onClick={()=>dispatch(showDialog({show:false}))}>Cancel</SecondButton>
                    <PrimaryButton style={{ fontSize: '.95rem' }} loading={isLoading}>change</PrimaryButton>
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

export default ChangePasswordDialog
