import styled from 'styled-components'
import {Link as Anchor} from 'react-router-dom'


export default function Logo({home}) {
    return home?(
        <Link to="/">
            <StyledH1>
                Chat<span>Tariro</span>
            </StyledH1>
        </Link>
    )
    
    :(
        <StyledH1>
            Chat<span>Tariro</span>
        </StyledH1>
    )
}

const StyledH1 = styled.h1`
    font-weight: 600;
    user-select:none;
    span{
        color: var(--primary);
    }
`
const Link = styled(Anchor)`
    text-decoration:none;
    color:inherit;
`