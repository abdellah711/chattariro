import styled from 'styled-components'
import Avatar from '../Avatar'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import useMobile from '../../hooks/useMobile'
import { ReactComponent as BackIcon } from '../../imgs/back-arrow.svg'

export default function ProfileNav() {
    
    const isMobile = useMobile()
    const history = useHistory()
    const location = history.location

    const path = useMemo(() => location.pathname+(location.pathname.endsWith('/')?'':'/') + 'profile', [location])
    const conv_id = path.split('/')[2]
    const [conversation,uId] = useSelector(state => [state.app.conversations?.find(c=>c._id===conv_id),state.app.user._id])
    
    if(!conversation) return <></>

    const name = conversation.users.length>2? 
        conversation.users.map(u=>u.name).join(',')
        : conversation.users.find(u=>u._id!==uId).name

    const handleBackClick = ()=>{
        history.goBack()
        history.replace('/c')
    }

    return (
        <Wrapper>
            { isMobile && <BackIcon onClick={handleBackClick}/>}
            <StyledContainer to={path}>
                <Avatar name={name} style={{gridRow:'1/3'}}/>
                <StyledName>{name}</StyledName>
                <StyledStatus>Online</StyledStatus>
            </StyledContainer>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    display:flex;
    align-items: center;
    padding: .5rem .83rem;
    background-color: var(--bg);
    gap: .3em;
    &>svg{
        height:35px;
        width:35px;
        padding: 5px;
        border-radius: 50%;
        cursor:pointer;
        transition: .3s;
        &:hover{
            background-color:rgba(100,100,100,.2);
        }
    }
`

const StyledContainer = styled(Link)`
    flex:1;
    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-column-gap: 1em;
    text-decoration:none;
    color: inherit;
`

const StyledName = styled.p`
    font-size: 1.1rem;
    font-weight: bold;
    opacity:.98;
    text-transform: capitalize;
`
const StyledStatus = styled.p`
    color: var(--text-second);
    font-size:.9rem;
    opacity:.98;
`