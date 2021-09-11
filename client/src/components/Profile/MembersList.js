import styled from 'styled-components'
import Avatar from '../Avatar'

const MembersList = ({members}) => {
    return (
        <StyledList>
            {members?.map(member=> <Member member={member}/>)}
        </StyledList>
    )
}

const Member = ({member}) => (
    <Container>
        <Avatar name={member.name} src={member.img}/>
        <StyledName>
            {member.name}
        </StyledName>
    </Container>
)

const StyledList = styled.div`
    align-self: stretch;
`
const Container = styled.div`
    display:flex;
    align-items:center;
    gap:.6rem;
    padding: .3em .6em;
    margin: .5em;
    cursor: pointer;
    border-radius: 1em;
    background-color: var(--bg-card);
    &:hover{
        background-color: var(--primary20);
    }
`

const StyledName = styled.p`
    text-transform: capitalize;
    font-size: 1.1rem;
    letter-spacing: .5px;
`
export default MembersList
