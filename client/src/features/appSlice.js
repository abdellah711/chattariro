import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('state'))??{
    id: null,
    user: null,
    token: null
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state,action) =>{
            const newState = {...state, ...action.payload}
            localStorage.setItem('state',JSON.stringify(newState))
            return newState
        }
    }
});

export const { setUser } = appSlice.actions
export default appSlice.reducer