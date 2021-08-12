import styled from 'styled-components'
import { useState } from 'react'
import Conversation from './Conversation'
import { useGetConversationsQuery } from '../../features/conversationApi'
import Progress from '../Progress'
import FAB from './FAB'

export default function Conversations() {
    
    const {data,isLoading,error} = useGetConversationsQuery()
    console.log(error)
    const [selected, setSelected] = useState(-1)
    console.log(data)
    const conversations = data?.data?.map((item,i)=><Conversation key={item._id} uId="j9r0ejf09j3" item={item} selected={item._id==selected} onClick={()=>setSelected(item._id)}/>)
    return (
        <StyledContainer>
            {isLoading?<ProgressContainer><Progress/></ProgressContainer>:conversations}
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