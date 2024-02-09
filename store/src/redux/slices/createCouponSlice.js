// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const createCouponSlice = createSlice({

    name: 'createCoupon',
    
    initialState: {
        validityTimePicker: false,
        validityTime: '1 Monat',
    },

    // ---- start - Reducers Section
    reducers: {

        setShowValidityTimePicker: (state) => {
            state.validityTimePicker = true
        },

        setHideValidityTimePicker: (state) => {
            state.validityTimePicker = false
        },

        setValidityTime: (state, action) => {
            state.validityTime = action.payload
        }

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setShowValidityTimePicker,
    setHideValidityTimePicker,
    setValidityTime,

} = createCouponSlice.actions;
 
export default createCouponSlice.reducer;
