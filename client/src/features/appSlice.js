import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    conversations:null,
    messages:{},
    isLoadingConversation:true
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state,action) =>{
            const newState = {...state, ...action.payload}
            localStorage.setItem('user',JSON.stringify(newState.user))
            return newState
        },
        setConversations: (state, action) =>{
            return {...state,conversations:action.payload,isLoadingConversation:false}
            
        },
        createConversation: (state, action) =>{
            return {...state,conversations:[...state.conversations,action.payload]}
        },
        receiveMessage: (state, action)=>{
            const message = action.payload
            const messages = [
                ...state.messages[message.conv_id],
                message
            ]
            return {
                ...state,
                messages:{
                    ...state.messages,
                    [message.conv_id]: messages
                }
            }
        },
        receiveMessages: (state, action)=>{
            const conv_id = action.payload.conv_id
            const messages = action.payload.messages
            return {
                ...state,
                messages:{
                    ...state.messages,
                    [conv_id]: messages
                }
            }
        },
    }
});

export const { setUser,createConversation,setConversations,receiveMessage,receiveMessages } = appSlice.actions
export default appSlice.reducer