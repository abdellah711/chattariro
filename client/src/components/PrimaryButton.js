import styled from 'styled-components'

const PrimaryButton = styled.button`
    background-color: var(--primary);
    color: var(--onPrimary);
    border-radius: var(--border-radius);
    border: 0;
    padding-block: var(--btn-p-block,.5em);
    padding-inline: var(--btn-p-inline,1em);
    font-size: var(--btn-f-size,1.2rem);
    cursor: pointer;
    transition: background-color .3s;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family:inherit;
    font-weight: 600;
    padding-top: calc(var(--btn-p-block,.5em) + 3px);
    :hover{
        background-color: var(--primaryHover);
    }
`

export default PrimaryButton;