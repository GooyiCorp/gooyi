import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({

    name: 'search',
    
    initialState: {
        filterModalIndex: 5,
        onSearchScreen: false,
        selectedCategory: 1,
        category: 'Geschäfte',
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
            state.filter = state.filter.filter(item => item.id !== action.payload.id)
        },

        setResetFilter: (state) => {
            state.filter = []
        },

        setOnSearchScreen: (state) => {
            state.onSearchScreen = true
            console.log(state.onSearchScreen)
        },

        setLeaveSearchScreen: (state) => {
            state.onSearchScreen = false
            console.log(state.onSearchScreen)
        },

        setFilterModalIndex: (state, action) => {
            state.filterModalIndex = action.payload
        }

    }
})

export const {

    setSelectedCategory,
    setCategory,
    setFilter,
    setRemoveFilter,
    setResetFilter,
    setOnSearchScreen,
    setLeaveSearchScreen,
    setFilterModalIndex

 } = searchSlice.actions;
 
 export default searchSlice.reducer;