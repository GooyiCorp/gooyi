// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const resetPasswordSlice = createSlice({

    name: 'resetPassword',
    
    initialState: {
        emailError_ResetPassword: false,
        sendResetPasswordMailSuccessAlert: false,
    },

    // ---- start - Reducers Section
    reducers: {

        // Set ID
        setEmailError_ResetPassword: (state, action) => {
            state.emailError_ResetPassword = action.payload
        },

        setHideSendResetPasswordMailSuccessAlert: (state) => {
            state.sendResetPasswordMailSuccessAlert = false
        },
        setShowSendResetPasswordMailSuccessAlert: (state) => {
            state.sendResetPasswordMailSuccessAlert = true
        }

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setEmailError_ResetPassword,
    setHideSendResetPasswordMailSuccessAlert,
    setShowSendResetPasswordMailSuccessAlert,

} = resetPasswordSlice.actions;
 
export default resetPasswordSlice.reducer;
