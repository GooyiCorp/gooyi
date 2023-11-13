import { createSlice } from "@reduxjs/toolkit"

export const subNavSlice = createSlice({

    name: 'subNav',
    
    initialState: {
        storeNavPage: 'allStores',
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Set Store Nav Page
        setStoreNavPage: (state, action) => {
            state.storeNavPage = action.payload
        },


    }
})

export const {

    setStoreNavPage,

 } = subNavSlice.actions;
 
 export default subNavSlice.reducer;