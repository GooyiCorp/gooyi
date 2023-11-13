import { createSlice } from "@reduxjs/toolkit"

export const subNavSlice = createSlice({

    name: 'subNav',
    
    initialState: {
        storeNavPage: 'allStores',
        couponNavPage: 'marks'
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Set Store Nav Page
        setStoreNavPage: (state, action) => {
            state.storeNavPage = action.payload
        },

        setCouponNavPage: (state, action) => {
            state.couponNavPage = action.payload
        },


    }
})

export const {

    setStoreNavPage,
    setCouponNavPage,

 } = subNavSlice.actions;
 
 export default subNavSlice.reducer;