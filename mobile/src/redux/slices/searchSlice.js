import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({

    name: 'search',
    
    initialState: {
        // Selected
        category: 'Angebote',
        sortCategory: [],
        filter: [],

        onSearchScreen: false,
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

        // Search Screen OnScreen Reducers
        setOnSearchScreen: (state) => {
            state.onSearchScreen = true
            console.log(state.onSearchScreen)
        },
        setLeaveSearchScreen: (state) => {
            state.onSearchScreen = false
            console.log(state.onSearchScreen)
        },


    }
})

export const {

    setCategory,
    setFilter,
    setRemoveFilter,
    setResetFilter,
    setOnSearchScreen,
    setLeaveSearchScreen,
    setSortCategory,
    setResetSortCategory,

 } = searchSlice.actions;
 
 export default searchSlice.reducer;