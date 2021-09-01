import { createSlice } from '@reduxjs/toolkit'
import { SERVER_URL } from '../Constants/api';
import dialogContent from '../Constants/dialog';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    conversations: null,
    messages: {},
    isLoadingConversation: true,
    dialog: {
        show:false,
        content: dialogContent.NEW_CONVERSATION
    },
    toasts:[]
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action) => {
            let user = action.payload
            const newState = { ...state, user }
            localStorage.setItem('user', JSON.stringify(user))
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
        seenMessage: (state, action) => {
            const {conv_id,msg_id,uId} = action.payload
            const conversations = state.conversations
            const conv = {...conversations.find(c => c._id === conv_id)}
            const read = [...conv.read.filter(r=>r.user!==uId),{user:uId,msg:msg_id}]
            conv.read = read
            return {
                ...state,
                conversations:[
                    ...conversations.filter(c => c._id!== conv_id),
                    conv
                ]
            }
        },
        showDialog: (state, action) => {
            return { ...state, dialog: {...state.dialog, ...action.payload} }
        },
        updateProfileImg: (state,action)=>{
            let img = action.payload
            img = img.startsWith('http')?img:SERVER_URL+img
            let user = {...state.user,img}
            localStorage.setItem('user',JSON.stringify(user))
            return {...state,user}
        },
        logout: (state,action) =>{
            localStorage.removeItem('user')
            return {...initialState,user:null}
        },
        showToast: (state,action) =>{
            return {...state,toasts: [...state.toasts,action.payload]}
        },
        hideToast: (state,action)=>{
            const toasts = [...state.toasts]
            toasts.shift()
            return {...state,toasts}
        },
        updateProfile: (state,action)=>{
            const user = {...state.user,...action.payload}
            localStorage.setItem('user',JSON.stringify(user))
            return {...state,user}
        },
    }
});

export const { setUser,
    createConversation,
    setConversations,
    receiveMessage,
    receiveMessages,
    showDialog,
    updateProfileImg,
    logout,
    showToast,
    hideToast,
    updateProfile,
    seenMessage,

} = appSlice.actions
export default appSlice.reducer