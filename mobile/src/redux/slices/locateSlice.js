import { createSlice } from "@reduxjs/toolkit"

export const locateSlice = createSlice({

    name: 'locate',
    
    initialState: {
        currentPosition: 'none',
        selected: undefined,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload
        },

        // ------------------------------------------- Set Locate Category Selected
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