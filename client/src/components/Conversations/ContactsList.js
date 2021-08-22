import Avatar from "../Avatar"
import styled from 'styled-components'
import Progress from "../Progress"


const ContactsList = ({contacts,onSelect,selected}) => {
    return (
        <StyledContainer>
            {contacts?contacts.map(contact=> 
                <ContactItem 
                        key={contact._id}
                        contact={contact} 
                        onClick={()=>onSelect(contact)}
                        selected={selected.findIndex(c=>c._id===contact._id)!==-1}
                    />)
                :
                <Progress/>
            }
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    max-height:100%;
    width:100%;
`

const ContactItem = ({contact,onClick,selected}) =>{
    return (
        <StyledItem onClick={onClick}>
            <Avatar name={selected?String.fromCharCode(10004):contact.name} src={contact.img} showChar={selected}/>
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
export default ContactsList
