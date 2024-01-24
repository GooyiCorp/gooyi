// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const merchantSlice = createSlice({

    name: 'merchant',
    
    initialState: {
        merchant_id: "",
        logIn_state: false,
        accessToken: "",
        refreshToken: "",
    },

    // ---- start - Reducers Section
    reducers: {

        // Set ID
        setMerchantId: (state, action) => {
            state.merchant_id = action.payload
        },
        setLogInState: (state, action) => {
            state.logIn_state = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setMerchantId,
    setLogInState,
    setAccessToken,
    setRefreshToken,

} = merchantSlice.actions;
 
export default merchantSlice.reducer;
