// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const changePasswordSlice = createSlice({

    name: 'changePassword',
    
    initialState: {
        showInput: false,
        notMatchError: false,
        passwordLengthError: false,
        changePasswordSuccessAlert: false,
    },

    // ---- start - Reducers Section
    reducers: {

        // Set ID
        setShowInput: (state, action) => {
            state.showInput = action.payload
        },

        setNotMatchError: (state, action) => {
            state.notMatchError = action.payload
        },

        setPasswordLengthError: (state, action) => {
            state.passwordLengthError = action.payload
        },

        setHideChangePasswordSuccessAlert: (state) => {
            state.changePasswordSuccessAlert = false
        },
        setShowChangePasswordSuccessAlert: (state) => {
            state.changePasswordSuccessAlert = true
        }

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setShowInput,
    setNotMatchError,
    setPasswordLengthError,

    setShowChangePasswordSuccessAlert,
    setHideChangePasswordSuccessAlert,

} = changePasswordSlice.actions;
 
export default changePasswordSlice.reducer;
