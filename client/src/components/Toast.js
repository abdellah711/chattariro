import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { hideToast } from '../features/appSlice'


const Toast = ({toast,}) => {
    
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)
    useEffect(()=>{
        setShow(true)
        setTimeout(() => {
            setShow(false)
            setTimeout(() => {
                dispatch(hideToast())
            }, 700);
        }, 3000);
    },[toast])
    return (
        <StyledToast show={show}>
            {toast.message}
        </StyledToast>
    )
}

const showAnim = keyframes`
    from{transform: translateY(200%)}
    to{transform: translateX(0)}
`
const hideAnim = keyframes`
    from{transform: translateX(0)}
    to{transform: translateY(200%)}
`

const StyledToast = styled.div`
    position: fixed;
    bottom:0;
    left:0;
    border-radius:5px;
    background-color: rgb(40,40,40);
    margin: 22px;
    padding: .7rem 1rem;
    min-width: min(25rem,80vw);
    z-index:101;
    color:#fafafa;
    animation: ${p => p.show?showAnim:hideAnim} .7s linear forwards;
    transform: translateX(-200%);
`
export default Toast
