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

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setShowInput,
    setNotMatchError,

} = changePasswordSlice.actions;
 
export default changePasswordSlice.reducer;
