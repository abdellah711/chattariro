import styled from 'styled-components'
import { useEffect, useState, useMemo } from 'react'
import Conversation from './Conversation'
import Progress from '../Progress'
import FAB from './FAB'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import Search from './Search'
import {ReactComponent as BackIcon} from '../../imgs/back-arrow.svg'
import {ReactComponent as EmptyIcon} from '../../imgs/empty.svg'

export default function Conversations() {
    
    const location = useLocation()
    const conv_id = useMemo(()=>location.pathname.split('/')[2]??-1,[location.pathname])
    const [data,userId,toast] = useSelector(state => [state.app.conversations,state.app.user._id,state.app.toasts.length>0])
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState(data)


    useEffect(()=>{
        setFiltered(f=>{
            if(search.trim()==='') return data
            return data?.filter(d =>{
            for(let i=0;i<d.users.length;++i){
                if(d.users[i]._id!==userId && d.users[i].name.includes(search.trim().toLowerCase())){
                    return true
                }
            }
        }
    )
    })},[data,search])


    useEffect(()=>{
        
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
    },[])

    const conversations = filtered?.map(item=>(<Conversation key={item._id} uId={userId} item={item} selected={item._id===conv_id}/>))
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
                :<StyledEmpty>
                    <EmptyIcon/>
                    <p>No Conversation</p>
                </StyledEmpty>
            }
            </StyledContainer>
            <FAB style={{transform:toast?'translateY(-3.5rem)':''}}/>
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
    user-select:none;
    flex-direction: column;
    gap: 1rem;
    p{
        font-size:1.1rem;
        font-weight: bold;
    }
    svg{
        fill:var(--text-color);
        width: 40%;
    }
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