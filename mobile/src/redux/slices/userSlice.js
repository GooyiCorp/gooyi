import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({

    name: 'user',
    
    initialState: {
        isLoggedIn: true,
        accessToken: ''
    },

    reducers: {

        setLoggedIn: (state, action) => {
            state.isLoggedIn = true
        },

        setLoggedOut: (state, action) => {
            state.isLoggedIn = false
        },

        setToken: (state, action) => {
            state.accessToken = action.payload
        },

        deleteToken: (state, action) => {
            state.accessToken = ''
        }

    }
})

export const {
    setLoggedIn,
    setLoggedOut,
    setToken,
    deleteToken,
 } = userSlice.actions;
 
 export default userSlice.reducer;
