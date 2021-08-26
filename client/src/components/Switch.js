import {useState} from 'react'
import styled from 'styled-components'


const Switch = () => {
    return (
        <StyledCheckbox
            type="checkbox"
            name="switch"/>
    )
}

const StyledCheckbox = styled.input`
    appearance: none;
    border-radius: 50px;
    height: var(--size,25px);
    width: calc(var(--size,25px) * 2);
    background-color: #afafaf;
    display:flex;
    cursor:pointer;
    transition: .3s;
    &::before{
        content:"";
        width: calc(var(--size,25px) - 5px);
        margin: 2.5px;
        background-color: #505050;
        border-radius:50%;
        transition: .3s;
    }
    &:checked::before{
        transform: translateX(var(--size,25px));
        background-color: var(--onPrimary);
    }
    &:checked{
        background-color: var(--primary);
    }
`
export default Switch
