import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Conversation from './Conversation'
import Progress from '../Progress'
import FAB from './FAB'
import {useSocketContext} from '../../context/socket-context'
import { useDispatch, useSelector } from 'react-redux'
import { setConversations } from '../../features/appSlice'
import { useLocation } from 'react-router-dom'

export default function Conversations() {
    
    const location = useLocation()
    const conv_id = location.pathname.split('/')[2]
    const [selected, setSelected] = useState(conv_id??-1)
    const socket = useSocketContext()
    const dispatch = useDispatch()
    const [data,userId] = useSelector(state => [state.app.conversations,state.app.user.id])
    useEffect(()=>{
        socket.emit('conversation:list',res=>{
            if(res.success){
                dispatch(setConversations(res.data))
            }else{
                
            }
        })
    },[])
    const conversations = data?.map(item=><Conversation key={item._id} uId={userId} item={item} selected={item._id==selected} onClick={()=>setSelected(item._id)}/>)
    return (
        <StyledContainer>
            {!data?
            <ProgressContainer><Progress/></ProgressContainer>
            :data.length?
            conversations
            :<StyledEmpty>No Conversation</StyledEmpty> //todo design empty view
        }
            <FAB/>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding: .5em;
    gap: .5em;
    flex:1;
    height:100%;
    position: relative;
    overflow-y:auto;
    box-shadow: var(--shadow);
`

const ProgressContainer = styled.div`
    height:100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
`
const StyledEmpty = styled.div`
    justify-content: center;
    height:100%;
    display:flex;
    align-items: center;
    font-size:1.1rem;
    user-select:none;
`