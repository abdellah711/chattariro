import styled,{keyframes} from 'styled-components'
import {useRef} from 'react'
import { useDispatch } from 'react-redux'
import { showDialog } from '../features/appSlice'

const Dialog = ({children,...rest}) => {
    const modalRef = useRef(null)
    const dispatch = useDispatch()

    const handleModalClick = e =>{
        if(e.target === modalRef.current){
            dispatch(showDialog({show:false}))
        }
    }

    return (
        <StyledModal ref={modalRef} onClick={handleModalClick}>
            <StyledDialog>
                {children}
            </StyledDialog>
        </StyledModal>
    )
}

const modalAnimation = keyframes`
    from{
        opacity:.1;
    }
    to{
        opacity: 1;
    }
`

const StyledModal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(80,80,80,.7);
    display:grid;
    place-items: center;
    animation: ${modalAnimation} .3s;
    z-index: 99;
`
const showAnimation = keyframes`
        from{
            opacity:.1;
            transform: scale(.1);
        }
        to{
            opacity: 1;
            transform: scale(1);
        }
`
const StyledDialog = styled.div`
    /* height: var(--h,80vh); */
    width: var(--w,min(600px,80vw));
    background-color:var(--bg);
    border-radius: 12px;
    animation: ${showAnimation} .4s;
`


export default Dialog
