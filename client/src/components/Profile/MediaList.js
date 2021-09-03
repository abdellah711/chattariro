import styled from 'styled-components'
import { SERVER_URL } from '../../Constants/api'

const MediaList = ({items}) => {
    return (
        <StyledGrid>
            {items
                ?.map(item =><img 
                            src={item.content.startsWith('http')?item.content: SERVER_URL+item.content}/>)}
        </StyledGrid>
    )
}

const StyledGrid = styled.div`
    display:grid;
    grid-template-columns: repeat(3,1fr);
    align-self: stretch;
    overflow: hidden;
    gap: 1em;
    padding: 1em;
    img{
        width:100%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: var(--border-radius);
    }

`

export default MediaList
