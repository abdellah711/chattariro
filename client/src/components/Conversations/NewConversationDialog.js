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
import SecondButton from '../SecondButton'

const NewConversationDialog = () => {

    const user = useSelector(state=>state.app.user)
    const token = user?.token
    const dispatch = useDispatch()
    const history = useHistory()

    const socket = useSocketContext()

    const [selected, setSelected] = useState([])
    const [query, setQuery] = useState('')
    const [timeoutId, setTimeoutId] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState(null)
    const [initialData, setInitialData] = useState(null)
    const [groupName, setGroupName] = useState('')
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
            users: selected.map(u => u._id),
        }
        if(selected.length>1){
            if(groupName!== '') newConv.name = groupName
            newConv.creator = user._id
        }
        console.log(newConv)
        socket.emit('conversation:create', newConv, res => {
            
            setIsLoading(false)
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
            <StyledContainer>
                <h2>Create New Conversation</h2>
                <Search value={query} onType={handleType}/>

                <ContactsContainer>
                    <ContactsList contacts={users} onSelect={handleSelect} selected={selected}/>
                </ContactsContainer>
                
                <SelectedContainer>
                    {selected.map(s => <SelectedItem key={s._id} contact={s} onDeselect={handleDeselect}/>)}
                </SelectedContainer>
                {selected.length>1 && <Search value={groupName} onType={e=>setGroupName(e.target.value)} placeholder="Groupe name" type="text"/>}
                <ButtonsWrapper>
                    <SecondButton onClick={()=>dispatch(showDialog({show:false}))}>Cancel</SecondButton>
                    <PrimaryButton style={{ fontSize: '.95rem' }} onClick={handleConversationCreating} disabled={selected.length===0} loading={isLoading}>start</PrimaryButton>
                </ButtonsWrapper>
            </StyledContainer>
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

const StyledContainer = styled.div`
    height: 80vh;
    display:flex;
    flex-direction:column;
    padding: .83rem 1rem;
    gap: .5rem;
`

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

const ButtonsWrapper = styled.div`
    display:flex;
    justify-content: space-between;
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
