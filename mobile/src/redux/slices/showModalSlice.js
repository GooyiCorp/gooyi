import { createSlice } from "@reduxjs/toolkit"
import { Get } from "../../helper/store"

export const showModalSlice = createSlice({

    name: 'showModal',
    
    initialState: {
        activityHistoryModal: false,
        locateModal: false,
        filterModal: false,
        queueModal: false,
        queueOverviewModal: false,
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

        // ------------------------------------------- Activity History Modal
        setShowLocateModal: (state) => {
            state.locateModal = true
        },

        setHideLocateModal: (state) => {
            state.locateModal = false
        },
        
        // ------------------------------------------- Activity History Modal
        setShowFilterModal: (state) => {
            state.filterModal = true
        },

        setHideFilterModal: (state) => {
            state.filterModal = false
        },

        // ------------------------------------------- Activity History Modal
        setShowQueueModal: (state) => {
            state.queueModal = true
        },

        setHideQueueModal: (state) => {
            state.queueModal = false
        },

        // ------------------------------------------- Activity History Modal
        setShowQueueOverviewModal: (state) => {
            state.queueOverviewModal = true
        },

        setHideQueueOverviewModal: (state) => {
            state.queueOverviewModal = false
        },
        

    }
})

export const {

    setShowActivityHistoryModal,
    setHideActivityHistoryModal,

    setShowLocateModal,
    setHideLocateModal,

    setShowFilterModal,
    setHideFilterModal,

    setShowQueueModal,
    setHideQueueModal,

    setShowQueueOverviewModal,
    setHideQueueOverviewModal,

 } = showModalSlice.actions;
 
 export default showModalSlice.reducer;