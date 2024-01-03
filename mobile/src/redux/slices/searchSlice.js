import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({

    name: 'search',
    
    initialState: {
        // Selected
        category: 'Angebote',
        searchString: '',
        sortCategory: [],
        filter: [],
        feedList: [],
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
        setSearchString: (state, action) => {
            state.searchString = action.payload
        },
        setFeedList: (state, action) => {
            state.feedList = action.payload
        }

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
    setSearchString,
    setFeedList

 } = searchSlice.actions;
 
 export default searchSlice.reducer;