import styled from 'styled-components'
import { ReactComponent as PhotoIcon } from '../../imgs/photo.svg'

const DropImgDialog = (props) => {
    return (
        <StyledDrop {...props}>
            <div>
                <div>
                    <PhotoIcon />
                    <p>Drop your images here to send them</p>
                </div>
            </div>
        </StyledDrop>
    )
}

const StyledDrop = styled.div`
    inset: 0;
    position: absolute;
    background-color: rgba(22,22,22,.5);
    display:grid;
    
    &>div{
        margin: 12vmin;
        background-color: var(--bg-card);
        display:grid;
        border-radius: 12px;
        
        div{
            /* height:100%; */
            border-radius: 12px;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap:1rem;
            margin: 1rem;
            border: 4px dashed var(--primary);

            svg{
                max-height:50%;    
            }

            p{
                font-size:1.1rem;
            }
        }
    }
`

export default DropImgDialog
