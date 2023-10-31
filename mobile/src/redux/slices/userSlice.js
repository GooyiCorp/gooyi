import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({

    name: 'user',
    
    initialState: {
        isLoggedIn: false
    },

    reducers: {

        setLogedIn: (state, action) => {
            state.isLoggedIn = true
        },

        setLoggedOut: (state, action) => {
            state.isLoggedIn = false
        }

    }
})

export const {
    setLogedIn,
    setLoggedOut,
 } = userSlice.actions;
 
 export default userSlice.reducer;
