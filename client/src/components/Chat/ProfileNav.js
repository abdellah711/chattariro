import styled from 'styled-components'
import Avatar from '../Avatar'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router'
import {useMemo} from 'react'


export default function ProfileNav() {
    
    const location = useLocation()
    console.log(location.pathname)
    const path = useMemo(() => location.pathname+(location.pathname.endsWith('/')?'':'/') + 'profile', [location])
    return (
        <StyledContainer to={path}>
            <Avatar name="alaoui" style={{gridRow:'1/3'}}/>
            <StyledName>Alaoui</StyledName>
            <StyledStatus>Online</StyledStatus>
        </StyledContainer>
    )
}

const StyledContainer = styled(Link)`
    width:100%;
    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-column-gap: 1em;
    padding: .5rem .83rem;
    background-color: var(--bg);
    text-decoration:none;
    color: inherit;
`

const StyledName = styled.p`
    font-size: 1.1rem;
    font-weight: bold;
    opacity:.98;
`
const StyledStatus = styled.p`
    color: var(--text-second);
    font-size:.9rem;
    opacity:.98;
`