import styled from 'styled-components'
import { ReactComponent as PlusIcon } from '../../imgs/plus.svg'
import { useDispatch } from 'react-redux'
import { showDialog } from '../../features/appSlice'
import dialogContent from '../../Constants/dialog';

export default function FAB(props) {
    const dispatch = useDispatch()

    const handleClick = () => {
        
        dispatch(showDialog({show:true,content:dialogContent.NEW_CONVERSATION}))
    }

    return (
        <StyledFab onClick={handleClick} {...props}>
            <PlusIcon />
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
    margin:1.2rem 20px;
    transition: transform .4s;
`