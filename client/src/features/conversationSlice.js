import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading:false,
    error:null,
    data:[]
}

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        getConversations : (state,action) =>{
            action.payload.socket.emit('conversation:list',(res)=>{
                if(res.success){
                    state = {isLoading:false, error:null,data:res.data}
                }
            })
        }
    }
});

export const {
    getConversations
} = conversationSlice.actions
export default conversationSlice.reducer