import Avatar from "../Avatar"
import styled from 'styled-components'
import Progress from "../Progress"
import { SERVER_URL } from "../../Constants/api"

const ContactsList = ({contacts,onSelect,selected}) => {
    return (
        <StyledContainer>
            {contacts?
            contacts.map(contact=> 
                <ContactItem 
                        key={contact._id}
                        contact={contact} 
                        onClick={()=>onSelect(contact)}
                        selected={selected.findIndex(c=>c._id===contact._id)!==-1}
                    />)
                :
                <ProgressWrapper>
                    <Progress/>
                </ProgressWrapper>
            }
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    height:100%;
    width:100%;
`

const ContactItem = ({contact,onClick,selected}) =>{
    let img = contact.img
    img = img?.startsWith('http:')?img:(img && SERVER_URL+img)
    return (
        <StyledItem onClick={onClick}>
            <Avatar name={contact.name} src={contact.img} selected={selected}/>
            <StyledName>
                {contact.name}
            </StyledName>
        </StyledItem>
    )
}

const StyledItem = styled.div`
    display:flex;
    align-items:center;
    gap:.6rem;
    padding: .3em .6em;
    margin: .5em;
    cursor: pointer;
    border-radius: 1em;
    &:hover{
        background-color: var(--primary20);
    }
`

const StyledName = styled.p`
    text-transform: capitalize;
    font-size: 1.1rem;
    letter-spacing: .5px;
`
const ProgressWrapper = styled.div`
    height:100%;
    display:grid;
    place-items: center;
`

export default ContactsList
