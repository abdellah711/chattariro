import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Input from './Input'
import PrimaryButton from './PrimaryButton'
import { Link as Anchor } from 'react-router-dom'
import { useAuthMutation } from '../features/authApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/appSlice'
import Progress from './Progress'

export default function Form(props) {
    const isLogin = props.location.pathname === '/login'
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({name:'',password:'',email:''})
    const [errors, setErrors] = useState({})

    const [authenticate,{isLoading,data,error,isError,isSuccess}] = useAuthMutation()
    
    useEffect(() => {
        if(isSuccess && data){
            dispatch(setUser({token:data.token,...data.data}))
            return
        }
        if(isError && error){
            if(error.data){
                setErrors({...errors,[error.data.field]:error.data.message})
                return
            }
            setErrors({none:"Please check your internet connection!"})
        }
    }, [data,error])
    

    const handleInput = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
        setErrors({})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        authenticate({isLogin,formData})
    }

    return (
        <StyledForm onSubmit={ handleSubmit}>
            <h1>{isLogin?"Login":"Register"}</h1>
            <InputContainer>
                {!isLogin && <Input type="name" name="name" placeholder="Name" value={formData.name} onChange={handleInput} error={errors.name}/>}
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInput}  error={errors.email}/>
                <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInput}  error={errors.password}/>
            </InputContainer>
            
            {isLoading && <Progress style={{alignSelf:'center',flexShrink:0}}/>}
            
            <PrimaryButton style={{fontSize:'.9em','--btn-p-block':'.7em'}} disabled={Object.values(errors).length>0}>Sign {isLogin?'in':'up'}</PrimaryButton>
            {errors.none && <StyledError>{errors.none}</StyledError>}
            {isLogin && <Link to="forget">Forgot password?</Link>}
            <StyledP>{isLogin?'Not':'Already'} member? <Link to={isLogin?'/signup':'/login'}>Sign {!isLogin?'in':'up'}</Link></StyledP>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    display:flex;
    gap:2rem;
    flex-direction: column;
    padding: 1.5em 4em;
    height:100%;
`
const InputContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 1.2rem;
`
const Link = styled(Anchor)`
    color: var(--primary);
    cursor:pointer;
    text-align:center;
    font-size: 1.09rem;
    :hover{
        text-decoration: underline;
    }
`
const StyledP = styled.div`
    text-align:center;
    font-size: 1.09rem;
`

const StyledError = styled.p`
    border: 1px solid var(--error-color);
    border-radius: var(--border-radius);
    padding: .5em .6em;
    background: var(--error-color20);
    color: var(--error-color);
`