import { useEffect, useState,useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import Avatar from '../Avatar'
import PrimaryButton from '../PrimaryButton'
import ContactsList from './ContactsList'
import Search from './Search'
import {ReactComponent as Icon} from '../../imgs/plus.svg'
import { useSelector,useDispatch } from 'react-redux'
import { showDialog,createConversation } from '../../features/appSlice'
import { useSocketContext } from '../../context/socket-context'
import {SERVER_URL} from '../../Constants/api'
import authFetch from '../../utils/authFetch'
import { useHistory } from 'react-router-dom'

const NewConversationDialog = () => {

    const [isDialogShown,token] = useSelector(state=>[state.app.isDialogShown,state.app.user.token])
    const dispatch = useDispatch()
    const history = useHistory()

    const socket = useSocketContext()

    const [selected, setSelected] = useState([])
    const [query, setQuery] = useState('')
    const [timeoutId, setTimeoutId] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState(null)
    const [initialData, setInitialData] = useState(null)

    useEffect(async ()=>{
        const data = await authFetch(`${SERVER_URL}user`,token)
        setUsers(data.data)
        setInitialData(data.data)
    },[])

    const handleSelect = (contact)=>{
        setSelected(prev=>{
            const index = prev.findIndex(c => c._id === contact._id)
            if(index===-1){
                return [...prev,contact]
            }
            return prev.filter(c => c._id!==contact._id)
        })
    }

    const handleDeselect = (id) =>{
        setSelected(prev => prev.filter(s => s._id!==id))
    }

    const handleConversationCreating = () =>{
        setIsLoading(true)
        const newConv = {
            users: selected.map(u => u._id)
        }
        socket.emit('conversation:create', newConv, res => {
            
            setIsLoading(false)
            console.log(res)
            if (res.success) {
                dispatch(createConversation(res))
                setQuery('')
                setSelected([])
                history.push('/c/'+res.data._id)
            }else{
                console.error('failed to create conversation')
            }
        })
    }

    const handleType = e =>{
        setQuery(e.target.value)
    }

    useEffect(()=>{
        timeoutId!==-1 && clearTimeout(timeoutId)
        if(query === '') return setUsers(initialData)
        setTimeoutId(
            setTimeout(async () => {
                const data = await authFetch(`${SERVER_URL}user/search?q=${encodeURI(query)}`,token)
                setUsers(data.data)
                }, 900)
        )
    },[query])


    return (
        <StyledModal style={{display:isDialogShown?'grid':'none'}}>
            <StyledDialog>
                <StyledTitle>Create New Conversation</StyledTitle>
                <Search value={query} onType={handleType}/>

                <ContactsContainer>
                    <ContactsList contacts={users} onSelect={handleSelect} selected={selected}/>
                </ContactsContainer>
                
                <SelectedContainer>
                    {selected.map(s => <SelectedItem key={s._id} contact={s} onDeselect={handleDeselect}/>)}
                </SelectedContainer>

                <ButtonsWrapper>
                    <CancelButton onClick={()=>dispatch(showDialog(false))}>Cancel</CancelButton>
                    <PrimaryButton style={{ fontSize: '.95rem' }} onClick={handleConversationCreating} disabled={selected.length===0} loading={isLoading}>start</PrimaryButton>
                </ButtonsWrapper>
            </StyledDialog>
        </StyledModal>
    )
}

const SelectedItem = ({contact,onDeselect}) =>{
    return (
        <StyledSelectedItem onClick={()=>onDeselect(contact._id)}>
            <Avatar name={contact.name} src={contact.img}/>
            <Icon/>
        </StyledSelectedItem>
    )
}

const StyledSelectedItem = styled.div`
    position: relative;

    &>svg{
        position: absolute;
        height: 15px;
        width: 15px;
        transform: rotate(45deg);
        top:0;
        right:-3px;
        background-color: var(--text-second);
        cursor:pointer;
        border-radius: 50%;
        padding: 2px;
    }
`
const modalAnimation = keyframes`
    from{
        opacity:.1;
    }
    to{
        opacity: 1;
    }
`

const StyledModal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(80,80,80,.7);
    place-items: center;
    animation: ${modalAnimation} .3s;
`
const showAnimation = keyframes`
        from{
            opacity:.1;
            transform: scale(.1);
        }
        to{
            opacity: 1;
            transform: scale(1);
        }
`
const StyledDialog = styled.div`
    height: 75vh;
    width: min(600px,80vw);
    background-color:var(--bg);
    border-radius: 12px;
    display:flex;
    flex-direction:column;
    padding: .83rem 1rem;
    gap: .5rem;
    /* transform: scale(0); */
    animation: ${showAnimation} .4s;
`

const StyledTitle = styled.h2`

`
const ButtonsWrapper = styled.div`
    display:flex;
    justify-content: space-between;
`
const CancelButton = styled.button`
    border:0;
    border-radius:var(--border-radius);
    color: var(--text-second);
    cursor:pointer;
    height:100%;
    font-size:.95rem;
    padding-inline:1em;
    background-color: transparent;
    &:hover{
        background-color: rgba(0,0,0,.1);
    }
`

const ContactsContainer = styled.div`
    flex:1;
    background-color: var(--bg-card);
    border-radius:12px;
    overflow-y: auto;

    ::-webkit-scrollbar-thumb{
        width: 20px;
        border-radius:50px;
    }
`
const SelectedContainer = styled.div`
    display:flex;
    gap: 12px;
    overflow-x: auto;
`

export default NewConversationDialog
