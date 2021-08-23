import styled from 'styled-components'
import Progress from './Progress'


const PrimaryButton = ({children,loading,...props}) =>{
    return (
    <StyledButton {...props} opacity={loading?0:1}>
        <span>{children}</span>
        {loading && 
            <ProgressWrapper>
                <Progress/>
            </ProgressWrapper>
            }
    </StyledButton>
    )
}

const StyledButton = styled.button`
    background-color: var(--primary);
    color: var(--onPrimary);
    border-radius: var(--border-radius);
    border: 0;
    padding-block: var(--btn-p-block,.5em);
    padding-inline: var(--btn-p-inline,1em);
    font-size: var(--btn-f-size,1.2rem);
    cursor: pointer;
    transition: .3s;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family:inherit;
    font-weight: 600;
    position: relative;
    padding-top: calc(var(--btn-p-block,.5em) + 3px);
    &:hover{
        background-color: var(--primaryHover);
    }
    &:disabled{
        background-color: rgba(100,100,100,.5);
    }

    &>span{
        opacity: ${p=>p.opacity};
    }

`
const ProgressWrapper = styled.div`
    --primary:#fff;
    display:flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    padding-top: 1px;
`
export default PrimaryButton;