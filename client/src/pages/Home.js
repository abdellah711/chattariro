import styled from 'styled-components'
import { ReactComponent as Image } from '../imgs/main_image.svg'
import { ReactComponent as HeartIcon } from '../imgs/heart.svg'
import Logo from '../components/Logo'
import PrimaryButton from '../components/PrimaryButton'
import { useHistory } from 'react-router-dom'

export default function Home() {
    
    const history = useHistory()

    return (
        <StyledSection>
            <StyledContainer>
                <StyledMainContainer>
                    <DescriptionContainer>
                        <Logo/>
                        <p>Stay connected with people you love.</p>
                    </DescriptionContainer>
                    <PrimaryButton onClick={()=>history.push({pathname:'/signup',state:{openModal:true}})}>
                        Let's Go
                    </PrimaryButton>
                </StyledMainContainer>
                <StyledImage/>
            </StyledContainer>
            <Signature>
                Made with <HeartIcon/> by Alaoui
            </Signature>
        </StyledSection>
    )
}

const StyledSection = styled.div`
    display:flex;
    flex-direction: column;

`

const StyledContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    min-height:80vh;
    padding-inline: 5%;
`


const DescriptionContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 1em;
    position: relative;
    h1{
        font-size:2.5rem;
    }
    p{
        font-size: 1.5rem;
        color: var(--text-second);
    }

    ::before{
        position:absolute;
        content: "";
        height: 95%;
        width: 4px;
        top: 3%;
        background-color: var(--primary);
        margin-left: -1.1rem;
        margin-block: 4px;
        border-radius: 9px;
    }
`
const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3.5em;
    padding-inline: 1em;
    user-select:none;
`

const StyledImage = styled(Image)`
    height:min(400px,80vh);
    @media screen and (max-width:768px){
        display:none;
    }
`

const Signature = styled.p`
    text-align: center;
    color:var(--text-second)
`