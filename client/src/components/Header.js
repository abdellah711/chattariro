import styled from 'styled-components'
import Logo from './Logo'
import PrimaryButton from './PrimaryButton'
import { useHistory } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Avatar from './Avatar'

export default function Header() {
    
    const history = useHistory()
    const {user} = useSelector(state => state.app)

    return (
        <StyledNav>
            <Logo home/>
            <ButtonsContainer>
                {   user?
                    <Avatar name={user.user} to={{hash:"#profile",state:{openModal:true}}}/>
                :
                    <>
                        <StyledButton onClick={()=>history.push({pathname:'/login',state:{openModal:true}})}>Log in</StyledButton>
                        <PrimaryButton style={{'--btn-f-size':'1rem'}} onClick={()=>history.push({pathname:'/signup',state:{openModal:true}})}>Sign up</PrimaryButton>
                    </>
                }
            </ButtonsContainer>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: calc(5% - 7px);
    padding-block: .5rem;
    height: 5rem;
`
const ButtonsContainer = styled.div`
    display: flex;
    gap: 9px;
    padding-block: 5px;
`
const StyledButton = styled.button`
    background-color: transparent;
    border: 0;
    font-size: 1rem;
    color:inherit;
    cursor:pointer;
    font-weight: 600;
    font-family: inherit;
    letter-spacing: 1px;
    border-radius: var(--border-radius);
    padding: .5em 1em;
    transition: background-color .3s;
    :hover{
        background-color: rgba(0,0,0,.15);
    }
`