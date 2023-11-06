import { createSlice } from "@reduxjs/toolkit"
import { Get } from "../../helper/store"

export const showModalSlice = createSlice({

    name: 'showModal',
    
    initialState: {
        activityHistoryModal: false,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        // ------------------------------------------- Activity History Modal
        setShowActivityHistoryModal: (state) => {
            state.activityHistoryModal = true
        },

        setHideActivityHistoryModal: (state) => {
            state.activityHistoryModal = false
        },

    }
})

export const {

    setShowActivityHistoryModal,
    setHideActivityHistoryModal,

 } = showModalSlice.actions;
 
 export default showModalSlice.reducer;