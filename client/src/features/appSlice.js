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
            const usersState = {}
            action.payload.forEach(conv => {
                conv.users.forEach(user=>{
                    usersState[user._id] = user.isActive ?? false
                })
            });
            return {
                ...state,
                conversations: action.payload,
                isLoadingConversation: false,
                usersState
            }

        },
        createConversation: (state, action) => {
            const conversation = action.payload.data
            if(action.payload.exists) return {...state,dialog:{show:false,content: dialogContent.NEW_CONVERSATION}}
            return { ...state, conversations: [conversation,...state.conversations ],dialog:{show:false,content: dialogContent.NEW_CONVERSATION} }
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
            const conversations = [...state.conversations]
            const convIndex = conversations.findIndex(c => c._id === conv_id)
            const conv = {...conversations[convIndex]}
            const read = [...conv.read.filter(r=>r.user!==uId),{user:uId,msg:msg_id}]
            conv.read = read
            conversations[convIndex] = conv
            return {
                ...state,
                conversations
            }
        },
        showDialog: (state, action) => {
            return { ...state, dialog: {...state.dialog, ...action.payload} }
        },
        updateProfilePhoto: (state,action)=>{
            let {img,isGrp,conv_id} = action.payload
            img = img.startsWith('http')?img:SERVER_URL+img
            if(isGrp){
                const conversations = [...state.conversations]
                const index = conversations.findIndex(conv => conv._id === conv_id)
                conversations[index] = {...conversations[index],img}
                return {...state,conversations}
            }
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
        updateUserState: (state,action) =>{
            const {uId,isActive} = action.payload
            return {
                ...state,
                usersState:{...state.usersState,[uId]:isActive}
            }
        }
    }
});

export const { setUser,
    createConversation,
    setConversations,
    receiveMessage,
    receiveMessages,
    showDialog,
    updateProfilePhoto,
    logout,
    showToast,
    hideToast,
    updateProfile,
    seenMessage,
    updateUserState,

} = appSlice.actions
export default appSlice.reducer