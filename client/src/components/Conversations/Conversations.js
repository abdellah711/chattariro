import styled from 'styled-components'
import { useEffect, useState, useMemo } from 'react'
import Conversation from './Conversation'
import Progress from '../Progress'
import FAB from './FAB'
import {useSocketContext} from '../../context/socket-context'
import { useDispatch, useSelector } from 'react-redux'
import { setConversations } from '../../features/appSlice'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import Search from './Search'
import {ReactComponent as BackIcon} from '../../imgs/back-arrow.svg'

export default function Conversations() {
    
    const location = useLocation()
    const conv_id = useMemo(()=>location.pathname.split('/')[2]??-1,[location.pathname])
    const socket = useSocketContext()
    const dispatch = useDispatch()
    const [data,userId] = useSelector(state => [state.app.conversations,state.app.user._id])
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState(data)


    useEffect(()=>{
        setFiltered(f=>{
            if(search.trim()==='') return data
            return data.filter(d =>{
            for(let i=0;i<d.users.length;++i){
                if(d.users[i]._id!==userId && d.users[i].name.includes(search.trim())){
                    return true
                }
            }
        }
    )
    })},[data,search])


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
                past: "%s",
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
    },[socket])
    const conversations = filtered?.map(item=><Conversation key={item._id} uId={userId} item={item} selected={item._id==conv_id}/>)
    return (
        <Wrapper>
            <SearchWrappper>
                {search.length>0 && <BackIcon onClick={()=>setSearch('')}/>}
                <Search value={search} onType={e=>setSearch(e.target.value)} />
            </SearchWrappper>
            <StyledContainer>
                {!filtered?
                <ProgressContainer><Progress/></ProgressContainer>
                :filtered.length?
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
    padding-block: .5em;
    gap: .5em;
    overflow-y:auto;
    flex:1;
    padding-inline: .8em;
    `
const Wrapper = styled.div`
    box-shadow: var(--shadow);
    position:relative;
    flex:1;
    height:100%;
    display:flex;
    flex-direction: column;
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

const SearchWrappper = styled.div`
    display:flex;
    padding: .33em .83em;
    align-items: center;
    gap:5px;
    &>input{
        flex:1;
    }

    &>svg{
        height:35px;
        width:35px;
        padding: 5px;
        border-radius: 50%;
        cursor:pointer;
        transition: .3s;
        &:hover{
            background-color:rgba(100,100,100,.2);
        }
    }

`