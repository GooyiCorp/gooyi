// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const merchantSlice = createSlice({

    name: 'merchant',
    
    initialState: {
        merchant_id: 0,
        logIn_state: false,
    },

    // ---- start - Reducers Section
    reducers: {

        // Set ID
        setMerchantId: (state, action) => {
            state.merchant_id = action.payload
        },

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setMerchantId,

} = merchantSlice.actions;
 
export default merchantSlice.reducer;
