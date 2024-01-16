// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const logInSlice = createSlice({

    name: 'logIn',
    
    initialState: {
        emailError: false,
        passwordError: false,
    },

    // ---- start - Reducers Section
    reducers: {

        // Set ID
        setEmailError: (state, action) => {
            state.emailError = action.payload
        },
        setPasswordError: (state, action) => {
            state.passwordError = action.payload
        },

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setEmailError,
    setPasswordError,

} = logInSlice.actions;
 
export default logInSlice.reducer;
