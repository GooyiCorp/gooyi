import { createSlice } from "@reduxjs/toolkit"

export const locateSlice = createSlice({

    name: 'locate',
    
    initialState: {
        currentPosition: '',
        supplement: '',

        selected: undefined,
        long: 0,
        lat: 0,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload
        },

        setSupplement: (state, action) => {
            state.supplement = action.payload
        },

        setResetPosition: (state) => {
            state.currentPosition = ''
            state.supplement = ''
            state.selected = undefined
        },

        // ------------------------------------------- Set Locate Category Selected
        setSelected: (state, action) => {
            state.selected = action.payload
        },

        setUnselected: (state) => {
            state.selected = undefined
        },
        // ------------------------------------------- Location
        setLocation: (state, action) => {
            state.lat = action.payload.lat
            state.long = action.payload.long
        },
    }
})

export const {

    setSelected,
    setUnselected,
    setLocation,
    setCurrentPosition,
    setResetPosition,
    setSupplement,

 } = locateSlice.actions;
 
 export default locateSlice.reducer;