import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    conversations: null,
    messages: {},
    isLoadingConversation: true,
    isDialogShown: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const newState = { ...state, ...action.payload }
            localStorage.setItem('user', JSON.stringify(newState.user))
            return newState
        },
        setConversations: (state, action) => {
            return {
                ...state,
                conversations: action.payload,
                isLoadingConversation: false,
            }

        },
        createConversation: (state, action) => {
            const conversation = action.payload.data
            if(action.payload.exists) return {...state,isDialogShown:false}
            return { ...state, conversations: [conversation,...state.conversations ],isDialogShown:false }
        },
        receiveMessage: (state, action) => {
            const message = action.payload
            const messages = [
                ...state.messages[message.conv_id],
                message
            ]
            const conv = {...state.conversations?.find(c => c._id === message.conv_id), last_msg:message}
            return {
                ...state,
                conversations:[
                    conv,
                    ...state.conversations.filter(c=> c._id !== message.conv_id)
                ],
                messages: {
                    ...state.messages,
                    [message.conv_id]: messages
                }
            }
        },
        receiveMessages: (state, action) => {
            const conv_id = action.payload.conv_id
            const messages = action.payload.messages
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [conv_id]: messages
                }
            }
        },
        showDialog: (state, action) => {
            return { ...state, isDialogShown: action.payload }
        }
    }
});

export const { setUser,
    createConversation,
    setConversations,
    receiveMessage,
    receiveMessages,
    showDialog
} = appSlice.actions
export default appSlice.reducer