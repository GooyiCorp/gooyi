import { createSlice } from "@reduxjs/toolkit"

export const pointSlice = createSlice({

    name: 'point',
    
    initialState: {
        point: 0,
        payload: 0
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Set Point
        setPoint: (state, action) => {
            state.point = action.payload,
            state.payload = action.payload
        },

        decreasePoint: (state, action) => {
            state.point - action.payload < 0? (state.point = state.point, alert('error')) : state.point = state.point - action.payload,
            state.payload = action.payload
        },

        increasePoint: (state, action) => {
            state.point = state.point + action.payload,
            state.payload = action.payload
        },

    }
})

export const {

    setPoint,
    decreasePoint,
    increasePoint,

 } = pointSlice.actions;
 
 export default pointSlice.reducer;