import styled from 'styled-components'
import { useState } from 'react'
import Input from './Input'
import PrimaryButton from './PrimaryButton'

export default function Form() {

    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({name:'',password:'',email:''})

    const handleInput = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return (
        <StyledForm onSubmit={ ()=>{} }>
            <h1>{isLogin?"Login":"Register"}</h1>
            <InputContainer>
                {!isLogin && <Input type="name" name="name" placeholder="Name" value={formData.name} onChange={handleInput}/>}
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInput}/>
                <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInput}/>
            </InputContainer>

            <PrimaryButton style={{'font-size':'.9em','--btn-p-block':'.7em'}}>Sign {isLogin?'in':'up'}</PrimaryButton>
            <Link>Forgot password?</Link>
            <StyledP>{isLogin?'Not':'Already'} member? <Link onClick={()=>setIsLogin(l=>!l)}>Sign {!isLogin?'in':'up'}</Link></StyledP>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    display:flex;
    gap:2rem;
    flex-direction: column;
    padding: 1.5em 4em;
    height:100%;
    overflow-y:auto;
`
const InputContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 1.2rem;
`
const Link = styled.span`
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