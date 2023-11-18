import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({

    name: 'search',
    
    initialState: {
        selectedCategory: 1,
        category: 'Geschäfte',
        selectedFilter: [],
        filter: [],
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Activity History Modal
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },

        setCategory: (state, action) => {
            state.category = action.payload
        },

        setFilter: (state, action) => {
            state.filter.push(action.payload)
        },

        setRemoveFilter: (state, action) => {
            state.filter = state.filter.filter(item => item !== action.payload)
        },

        setResetFilter: (state) => {
            state.filter = []
        }

    }
})

export const {

    setSelectedCategory,
    setCategory,
    setFilter,
    setRemoveFilter,
    setResetFilter,

 } = searchSlice.actions;
 
 export default searchSlice.reducer;