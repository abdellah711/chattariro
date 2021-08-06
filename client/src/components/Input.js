import styled from 'styled-components'


export default function Input({type,name,placeholder,error,value,onChange}) {
    return (
        <StyledLabel>
            {placeholder}:
            <input className={error&&"error"} name={name} onChange={onChange} value={value} type={type} placeholder={"Enter your "+placeholder.toLowerCase()} required/>
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
        padding: .6em .5em;
        font-size: 1.1em;
        border: 1px solid rgba(100,100,100,.5);
        border-radius: var(--border-radius);
        background-color: transparent;
        font-family:inherit;
    }
    
    span{
        color: red;
    }

    input:focus {
        box-shadow: 0 0 5px 2px var(--primary50);
        outline:none;
        border-color: var(--primary);
    }

    input.error{
        box-shadow:0 0 3pt 2pt rgba(200,0,0,.2);
        border-color: red;

    }
`
