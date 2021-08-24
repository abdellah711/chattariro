import styled,{css} from 'styled-components'
import {Link } from 'react-router-dom'
import {ReactComponent as CheckedIcon } from '../imgs/check.svg'


const containerCss = css`
    height:var(--size,3rem);
    width:var(--size,3rem);
    border-radius:50%;
    overflow:hidden;
    text-align: center;
    background-color: var(--primary);
    cursor:pointer;
    display:flex;
    align-items: center;
    text-decoration: none;
    justify-content:center;
    flex-shrink:0;
`

export default function Avatar({src,name,to,style,selected=false,...rest}) {

    const StyledContainer = to ?StyledLink: StyledWrapper

    return (
        <StyledContainer to={to} style={style} {...rest}>
           {selected? <StyledIcon/>
           : src ?<StyledImg src={src} />
           : <StyledChar>{name&&name[0]?.toUpperCase()}</StyledChar>
           } 
        </StyledContainer>
    )
}

const StyledLink = styled(Link)`${containerCss}`
const StyledWrapper = styled.div`${containerCss}`

const StyledChar = styled.h1`
    user-select:none;
    font-size: 1.7em;
    color: #fff;
`
const StyledImg = styled.img`
    height:100%;
    width:100%;
    object-fit:cover;
`

const StyledIcon = styled(CheckedIcon)`
    padding: .3em;
`