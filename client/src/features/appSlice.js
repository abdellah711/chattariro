import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dialogOpen:false,
    login:true
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showDialog: (state,action) => ({...state,dialogOpen:true,login:action.payload}),
        dismissDialog: state => ({...state,dialogOpen:false}),
        switchLogin: state=>({...state,login:!state.login}),
    }
});

export const { showDialog, dismissDialog, switchLogin } = appSlice.actions
export default appSlice.reducer