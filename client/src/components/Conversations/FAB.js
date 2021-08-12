import styled from 'styled-components'
import {useCreateConversationMutation} from '../../features/conversationApi'
import {ReactComponent as PlusIcon } from '../../imgs/plus.svg'

export default function FAB() {
    const [create,{data,isLoading,error}] = useCreateConversationMutation()

    const handleClick = ()=>{
        create()
    }

    return (
        <StyledFab onClick={handleClick}>
            <PlusIcon/>
        </StyledFab>
    )
}

const StyledFab = styled.div`

    height:var(--size,60px);
    width:var(--size,60px);
    position: absolute;
    bottom: 0;
    right:0;
    background-color: var(--primary);
    border-radius: 50%;
    cursor:pointer;
    display:flex;
    align-items: center;
    justify-content: center;
    padding:.83rem;
    box-shadow: 4px 4px 12px rgba(0,0,0,.4);
    margin:12px;
`