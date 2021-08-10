import styled from 'styled-components'
import { useState } from 'react'
import Conversation from './Conversation'

export default function Conversations() {
    const conv = [
        {   
            is_grp:false,
            img: "",
            conv_id:"21jds903jdj9",
            users:[
                {
                    _id:"j9r0ejf09j3",
                    name:"alaoui",
                    img:""
                },
                {
                    _id:"j9rfdfjf09j3",
                    name:"abdellah",
                    img:""
                },
            ],
            last_msg:{
                sender:"j9r0ejf09j3",
                msg:"Hey",
                read:{"j9r0ejf09j3":false},
                time: "3min"
            }
        },
        {   
            is_grp:false,
            img: "",
            conv_id:"9jefm93jf",
            users:[
                {
                    _id:"j9r0ejf09j3",
                    name:"alaoui",
                    img:""
                },
                {
                    _id:"j9rfdfjf09j3",
                    name:"abdellah",
                    img:""
                },
            ],
            last_msg:{
                sender:"j9r0ejf09j3",
                msg:"Hey",
                read:{"j9r0ejf09j3":false},
                time: "3min"
            }
        },
        {   
            is_grp:false,
            img: "",
            conv_id:"21j3dseofj9",
            users:[
                {
                    _id:"j9r0ejf09j3",
                    name:"alaoui",
                    img:""
                },
                {
                    _id:"j9rfdfjf09j3",
                    name:"abdellah",
                    img:""
                },
            ],
            last_msg:{
                sender:"j9r0ejf09j3",
                msg:"Hey",
                read:{"j9r0ejf09j3":false},
                time: "3min"
            }
        },
        {   
            is_grp:true,
            img: "",
            grp_name:"fun",
            conv_id:"21jdseeofj9",
            users:[
                {
                    _id:"j9r0ejf09j3",
                    name:"alaoui",
                    img:""
                },
                {
                    _id:"j9rfdfffdjf09j3",
                    name:"abdellah",
                    img:""
                },
            ],
            last_msg:{
                sender:"j9r0ejf09j3",
                msg:"Hey",
                read:{"j9r0ejf09j3":true},
                time: "3min"
            }
        },
        
    ]
    const [selected, setSelected] = useState(-1)
    return (
        <StyledContainer>
            {conv.map((item,i)=><Conversation key={item.conv_id} uId="j9r0ejf09j3" item={item} selected={item.conv_id==selected} onClick={()=>setSelected(item.conv_id)}/>)}
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
`

