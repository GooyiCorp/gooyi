import { createSlice } from "@reduxjs/toolkit"

const unlock = () => {
    setTimeout
}

export const mainNavSlice = createSlice({

    name: 'page',
    
    initialState: {
        page: 'discover',
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Activity History Modal
        setPage: (state, action) => {
            state.page = action.payload
        },
    }
})

export const {

    setPage,


 } = mainNavSlice.actions;
 
 export default mainNavSlice.reducer;