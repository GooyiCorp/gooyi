import { createSlice } from "@reduxjs/toolkit"
import { Get } from "../../helper/store"

export const userSlice = createSlice({

    name: 'user',
    
    initialState: {
        isLoggedIn: false,
        accessToken: '',
        refreshToken: '',
        user_id: 0,
        user_name: '',
        entryDate: '',
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

        setUserId: (state, action) => {
            state.user_id = action.payload
        },
        setUserName: (state, action) => {
            state.user_name = action.payload
        },
        setEntryDate: (state, action) => {
            state.entryDate = action.payload
        }
    }
})

export const {

    setLoggedIn,
    setLoggedOut,
    setToken,
    deleteToken,
    setRefreshToken,
    deleteRefreshToken,
    setUserId,
    setUserName,
    setEntryDate

 } = userSlice.actions;
 
 export default userSlice.reducer;
