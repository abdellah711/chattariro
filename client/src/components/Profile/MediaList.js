import styled from 'styled-components'
import { SERVER_URL } from '../../Constants/api'
import {ReactComponent as EmptyIcon} from '../../imgs/empty.svg'

const MediaList = ({items}) => {
    return items?.length>0 ?(
        <StyledGrid>
            {items
                ?.map(item =><img 
                            src={item.content.startsWith('http')?item.content: SERVER_URL+item.content}/>)}
        </StyledGrid>
    )
    : (<StyledEmpty>
        <EmptyIcon/>
        <p>No Media</p>
    </StyledEmpty>)
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
const StyledEmpty = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    flex-grow:1;
    svg{
        fill: var(--text-color);
    }
`
export default MediaList
