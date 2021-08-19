import styled from 'styled-components'
import { ReactComponent as PlusIcon } from '../../imgs/plus.svg'
import { createConversation } from '../../features/appSlice'
import { useDispatch } from 'react-redux'
import { useSocketContext } from '../../context/socket-context'


export default function FAB() {
    const dispatch = useDispatch()
    const socket = useSocketContext()

    const handleClick = () => {
        const newConv = {
            last_msg: {
                content: 'alaoui'
            },
            users: ['611bd22377d63b0eb861685e']
        }
        socket.emit('conversation:create', newConv, res => {
            if (res.success) {
                console.log('conversation created successfully')
                dispatch(createConversation(res.data))
            }
        })

    }

    return (
        <StyledFab onClick={handleClick}>
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
    margin:20px;
`