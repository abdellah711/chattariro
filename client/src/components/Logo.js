import styled from 'styled-components'


export default function Logo() {
    return (
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