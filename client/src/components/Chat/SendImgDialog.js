import styled from 'styled-components'
import SecondButton from '../SecondButton'
import PrimaryButton from '../PrimaryButton'
import authFetch from '../../utils/authFetch'
import { SERVER_URL } from '../../Constants/api'
import { useDispatch } from 'react-redux'
import { receiveMessage } from '../../features/appSlice'
import { useSocketContext } from '../../context/socket-context'

const SendImgDialog = ({images,setImages,conv_id,token}) => {

    const dispatch = useDispatch()
    const socket = useSocketContext()

    const handleSubmit = async e =>{
        e.preventDefault()

        images.forEach(async image => {
            const formData = new FormData()
            formData.set('img',image)
            const resp = await authFetch(SERVER_URL+'upload/message/'+conv_id,token,'POST',formData,false).catch(err => console.error(err))
            if(resp.success){
                const msg = {
                    content: resp.data,
                    type: 'image',
                    conv_id
                }
                socket.emit('messages:create',msg,res=>{
                    if(res.success){
                        dispatch(receiveMessage(res.data))
                        setImages(null)
                    }
                })
            }
        });
    }

    return (
        <StyledOverlay>
            <StyledDialog onSubmit={handleSubmit}>
                <ImagesContainer>
                    {images.map(img=> <ImageItem img={img}/>)}
                </ImagesContainer>
                <ButtonsWrapper>
                        <SecondButton type="button" onClick={()=>setImages(null)}>Cancel</SecondButton>
                        <PrimaryButton style={{ fontSize: '.95rem' }}>send</PrimaryButton>
                </ButtonsWrapper>
            </StyledDialog>
        </StyledOverlay>
    )
}

const ImageItem = ({img}) =>{
    return (
        <StyledImage>
            <img src={URL.createObjectURL(img)} alt="img"/>
            <p>{img.name}</p>
        </StyledImage>
    )
}

const StyledOverlay = styled.div`
    position: absolute;
    inset:0;
    background-color: rgba(22,22,22,.5);
    display:grid;
    place-items: center;

`

const StyledDialog = styled.form`
    background-color:var(--bg);
    border-radius: 12px;
    width: 50%;
    padding: 12px
`
const ImagesContainer = styled.div`
    display:flex;
    flex-direction: column;
    max-height: 50vh;
    overflow-y: auto;
`
const StyledImage = styled.div`
    display: flex;
    margin: .5rem;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--bg-card);
    gap: 1rem;
    flex-shrink: 0;
    img{
        height: 7.5rem;
        width: 7.5rem;
        object-fit: cover;
    }
`

const ButtonsWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    margin-top: 12px;
`

export default SendImgDialog
