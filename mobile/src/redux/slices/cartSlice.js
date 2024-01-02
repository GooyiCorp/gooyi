import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({

    name: 'cart',
    
    initialState: {
        unit: 1,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        setDecreaseUnit: (state) => {
            state.unit - 1 < 1? (state.unit = state.unit, alert('error')) : state.unit = state.unit - 1
        },

        setIncreaseUnit: (state) => {
            state.unit = state.unit + 1
        },

    }
})

export const {

    setDecreaseUnit,
    setIncreaseUnit

 } = cartSlice.actions;
 
 export default cartSlice.reducer;