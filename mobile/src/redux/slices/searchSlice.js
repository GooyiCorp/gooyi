import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({

    name: 'search',
    
    initialState: {
        // Selected
        category: 'Angebote',
        sortCategory: [],
        filter: [],
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // Catergory Reducers
        setCategory: (state, action) => {
            state.category = action.payload
        },

        // Sort Catergory Reducers
        setSortCategory: (state, action) => {
            state.sortCategory = action.payload
        },
        setResetSortCategory: (state) => {
            state.sortCategory = []
        },

        // Filter Reducers
        setFilter: (state, action) => {
            state.filter.push(action.payload)
        },
        setRemoveFilter: (state, action) => {
            state.filter = state.filter.filter(item => item.id !== action.payload.id)
        },
        setResetFilter: (state) => {
            state.filter = []
        },

    }
})

export const {
    
    // ---- Category
    setCategory,
    // ---- Filter
    setFilter,
    setRemoveFilter,
    setResetFilter,
    // ---- SortCategory
    setSortCategory,
    setResetSortCategory,

 } = searchSlice.actions;
 
 export default searchSlice.reducer;