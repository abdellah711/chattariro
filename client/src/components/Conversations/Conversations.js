import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Conversation from './Conversation'
import Progress from '../Progress'
import FAB from './FAB'
import {useSocketContext} from '../../context/socket-context'
import { useDispatch, useSelector } from 'react-redux'
import { setConversations } from '../../features/appSlice'
import { useLocation } from 'react-router-dom'
import moment from 'moment'


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
        moment.locale('en', {
            relativeTime : {
                future: "in %s",
                past:   "%s",
                s:  "%ds",
                m:  "1min",
                mm: "%dmin",
                h:  "1h",
                hh: "%dh",
                d:  "1d",
                dd: "%dd",
                M:  "1mth",
                MM: "%dmth",
                y:  "1y",
                yy: "%dy"
            }
        });
    },[])
    const conversations = data?.map(item=><Conversation key={item._id} uId={userId} item={item} selected={item._id==selected} onClick={()=>setSelected(item._id)}/>)
    return (
        <Wrapper>
            <StyledContainer>
                {!data?
                <ProgressContainer><Progress/></ProgressContainer>
                :data.length?
                conversations
                :<StyledEmpty>No Conversation</StyledEmpty> //todo design empty view
            }
            </StyledContainer>
            <FAB/>
        </Wrapper>
    )
}

const StyledContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding: .5em;
    gap: .5em;
    height:100%;
    overflow-y:auto;
    `
const Wrapper = styled.div`
    box-shadow: var(--shadow);
    position:relative;
    flex:1;
    height:100%;
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