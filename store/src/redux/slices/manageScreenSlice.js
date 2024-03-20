// Redux
import { createSlice } from "@reduxjs/toolkit"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const manageScreenSlice = createSlice({

    name: 'ManageScreen',
    
    initialState: {
        selectedScreen: 'Geschäft'
    },

    // ---- start - Reducers Section
    reducers: {

        setSelectedScreen: (state, action) => {
            state.selectedScreen = action.payload
        },

    }
    // ---- end - Reducers Section

})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const {

    setSelectedScreen

} = manageScreenSlice.actions;
 
export default manageScreenSlice.reducer;
