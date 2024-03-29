import styled from 'styled-components'


export default function Input({type,name,placeholder,forcedPlaceholder,error,...rest}) {
    return (
        <StyledLabel>
            {placeholder}:
            <input className={error&&"error"} name={name} {...rest} type={type} placeholder={forcedPlaceholder?forcedPlaceholder:"Enter your "+placeholder.toLowerCase()} required/>
            {error&& <span>{error}</span>}
        </StyledLabel>
    )
}

const StyledLabel = styled.label`
    display:flex;
    flex-direction: column;
    gap: 7px;
    font-size: 1.05rem;
    input{
        padding: .5em .6em;
        font-size: 1.1em;
        border: 1px solid rgba(100,100,100,.5);
        border-radius: var(--border-radius);
        background-color: transparent;
        font-family:inherit;
        color: inherit;
    }
    
    span{
        color: red;
        font-size: .9em;
    }

    input:focus {
        box-shadow: 0 0 5px 2px var(--primary50);
        outline:none;
        border-color: var(--primary);
    }

    input.error{
        box-shadow:0 0 3pt 2pt var(--error-color20);
        border-color: var(--error-color);

    }
`
