import { createSlice } from "@reduxjs/toolkit"

export const locateSlice = createSlice({

    name: 'locate',
    
    initialState: {
        selected: undefined
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Set Store Nav Page
        setSelected: (state, action) => {
            state.selected = action.payload
        },

        setUnselected: (state) => {
            state.selected = undefined
        },


    }
})

export const {

    setSelected,
    setUnselected

 } = locateSlice.actions;
 
 export default locateSlice.reducer;