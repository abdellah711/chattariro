import styled from 'styled-components'


const SecondButton = styled.button`
    border:0;
    border-radius:var(--border-radius);
    color: var(--text-second);
    cursor:pointer;
    font-size:.95rem;
    padding-inline:1em;
    background-color: transparent;
    &:hover{
        background-color: rgba(0,0,0,.1);
    }
`
export default SecondButton
