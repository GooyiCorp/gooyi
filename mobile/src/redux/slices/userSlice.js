import { createSlice } from "@reduxjs/toolkit"
import { Get } from "../../helper/store"

export const userSlice = createSlice({

    name: 'user',
    
    initialState: {
        isLoggedIn: false,
        accessToken: '',
        refreshToken: '',
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- logIn / LogOut
        setLoggedIn: (state, action) => {
            state.isLoggedIn = true
        },

        setLoggedOut: (state, action) => {
            state.isLoggedIn = false
        },

        // ------------------------------------------- AccessToken
        setToken: (state, action) => {
            state.accessToken = action.payload
        },

        deleteToken: (state, action) => {
            state.accessToken = ''
        },

        // ------------------------------------------- RefreshToken
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },

        deleteRefreshToken: (state, action) => {
            state.refreshToken = ''
        },

    }
})

export const {

    setLoggedIn,
    setLoggedOut,
    setToken,
    deleteToken,
    setRefreshToken,
    deleteRefreshToken,

 } = userSlice.actions;
 
 export default userSlice.reducer;
