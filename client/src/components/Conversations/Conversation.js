import styled from 'styled-components'
import Avatar from '../Avatar'
import {Link} from 'react-router-dom'


const Conversation = ({selected,item,onClick,uId}) =>{

    const style = selected?{'--conv_bg':'var(--primary20)'}:{}
    const sender = item.last_msg.sender === uId? 'you':item.users.find(u=>u._id===uId).name
    const name = item.is_grp?
                    item.grp_name?item.grp_name:item.users.map(u=>u.name).join(' ')
                    :item.users.find(u=>u._id!==uId).name
    const readStyle =  {'--weight':item.last_msg.read[uId]?'lighter':'bold'}
    const img = item.is_grp?item.img:item.users.find(u=>u._id).img

    
    return (
        <StyledConversation style={style} onClick={onClick} to={`/c/${item.conv_id}`}>
            <Avatar name={name} src={img} style={{'--size':'3.5rem'}}/>
            <div className="conv_data">
                <StyledName>{name}</StyledName>
                <StyledMsg style={readStyle}><span>{sender}: </span>{item.last_msg.msg} </StyledMsg>
            </div>
            <StyledTime>{item.last_msg.time}</StyledTime>
        </StyledConversation>
    )
}

const StyledConversation = styled(Link)`
    display:flex;
    background-color: var(--conv_bg,var(--bg-card));
    padding: .7em .9em;
    border-radius: 1em;
    gap: .7em;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: background-color .3s;

    & > .conv_data{
        flex:1;
        display:flex;
        flex-direction: column;
        gap: .35em;
    }
`

const StyledName = styled.p`
    text-transform: capitalize;
    font-size: 1.1rem;
    font-weight:bold;
    `
const StyledMsg = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
   letter-spacing: .5px;
   font-weight: var(--weight,lighter);
    span{
        text-transform: capitalize;
    }
`
const StyledTime = styled.p`
    color: var(--text-second);
`


export default Conversation