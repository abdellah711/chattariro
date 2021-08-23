import styled,{keyframes} from 'styled-components'

const animation = keyframes`
    from{ transform: rotate(0)}
    to{ transform: rotate(360deg)}
`

export default styled.div`
    border: 2px solid var(--primary);
    width: 30px;
    height: 30px;
    border-left-color: #00000000;
    border-radius: 50%;
    animation: ${animation} 1s linear infinite;
`