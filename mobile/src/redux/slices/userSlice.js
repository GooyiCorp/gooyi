import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({

    name: 'user',
    
    initialState: {
        isLoggedIn: false
    },

    reducers: {

        setLoggedIn: (state, action) => {
            state.isLoggedIn = true
        },

        setLoggedOut: (state, action) => {
            state.isLoggedIn = false
        }

    }
})

export const {
    setLoggedIn,
    setLoggedOut,
 } = userSlice.actions;
 
 export default userSlice.reducer;
