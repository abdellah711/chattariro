import styled from 'styled-components'
import {ReactComponent as SendIcon} from '../../imgs/send.svg'
import { useSocketContext } from '../../context/socket-context'
import { useDispatch } from 'react-redux'
import {useState} from 'react';
import { receiveMessage } from '../../features/appSlice';


export default function ChatForm({conv_id}) {

    const socket = useSocketContext()
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleSend = e=>{
        e.preventDefault()
        const msg = {
            content:value,
            conv_id
        }
        console.log('sending message:',msg)
        socket.emit('messages:create',msg,res=>{
            dispatch(receiveMessage(res.data))
        })
        setValue('')
    }

    return (
        <StyledForm onSubmit={handleSend}>
            <StyledInput placeholder="Enter your message ..." value={value} onChange={e=>setValue(e.target.value)}/>
            <StyledButton><SendIcon/></StyledButton>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    width:100%;
    display:flex;
    padding: .2em .7em .7em;
    gap: .6em;
`

const StyledInput = styled.input`
    flex:1;
    font-family: inherit;
    border-radius: 12px;
    border: 1px solid var(--input-ph);
    padding: .5em .7em;
    font-size:1.1rem;
    outline:none;
    background-color: var(--input-bg);
    color:inherit;
    :focus{
        transition: border-color .3s;
        border-color:var(--primary);
        border-width: 2px;
    }
`

const StyledButton = styled.button`
    cursor:pointer;
    background-color: var(--primary);
    border: 0;
    border-radius: 50%;
    color:var(--onPrimary);
    aspect-ratio: 1;
    display:flex;
    align-items: center;
    justify-content: center;
    height:100%;
    svg{
        height: 60%;
        margin-left: 5px;
    }
`