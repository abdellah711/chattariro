import styled,{css} from 'styled-components'
import {Link } from 'react-router-dom'


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
`

export default function Avatar({src,name,to,style}) {

    const StyledContainer = to ?styled(Link)`${containerCss}`: styled.div`${containerCss}`

    return (
        <StyledContainer to={to} style={style}>
           {src? <StyledImg src={src} />
           : <StyledChar>{name[0].toUpperCase()}</StyledChar>
           } 
        </StyledContainer>
    )
}



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