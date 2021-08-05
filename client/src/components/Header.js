import styled, {css} from 'styled-components'
import Logo from './Logo'
import PrimaryButton from './PrimaryButton'


export default function Header() {
    return (
        <StyledNav>
            <Logo/>
            <ButtonsContainer>
                <StyledButton>Log in</StyledButton>
                <PrimaryButton style={{'--btn-f-size':'1rem'}}>Sign up</PrimaryButton>
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