import styled from 'styled-components'
import { ReactComponent as BackIcon } from '../imgs/back-arrow.svg'
import { useHistory, useLocation } from 'react-router-dom'

export default function Modal({children}) {

    const history = useHistory()
    const location = useLocation()
    const open = location.state?.openModal || ['/login','/signup'].includes(location.pathname)

    const dialogStyle = {transform:`translateX(${open?'0':'100%'})`}
    const overlayStyle = open?{}:{opacity:'0',pointerEvents:'none'}

    const onClose = ()=>{
        history.goBack()
    }
    return (
        <Container style={overlayStyle} >
            <StyledOverlay onClick={onClose}/>
            <StyledDialog style={dialogStyle}>
                    <StyledBar>
                        <BackIcon onClick={onClose}/>
                    </StyledBar>
                    {children}
            </StyledDialog>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    transition: opacity .3s;
`

const StyledOverlay = styled.div`
    height:100%;
    width:100%;
    background-color: rgba(80,80,80,.7);
`

const StyledDialog = styled.div`
    position:fixed;
    top:0;
    right:0;
    height: 100%;
    background-color: var(--bg);
    width: min(500px,100vw);
    transition: transform .4s;
    overflow-y:auto;
`

const StyledBar = styled.div`
    /* border-bottom: 1px solid gray; */
    padding: .3rem .5rem;
    display:flex;
    svg{
        fill: black;
        height: 40px;
        padding:.4rem;
        cursor:pointer;
    }
    svg:hover{
        background: rgba(99,99,99,.25);
        border-radius: 50%;
    }
`