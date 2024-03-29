import { createSlice } from "@reduxjs/toolkit"

export const queueSlice = createSlice({

    name: 'queue',
    
    initialState: {
        joinedQueue: false,
        showAlert: false,
        showQueueSmall: false,

        queuePosition: undefined,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        setShowQueueAlert: (state) => {
            state.showAlert = true
        },

        setHideQueueAlert: (state) => {
            state.showAlert = false
        },

        setJoinedQueue: (state) => {
            state.joinedQueue = true
        },

        setLeaveQueue: (state) => {
            state.joinedQueue = false
        },

        setShowQueueSmall: (state) => {
            state.showQueueSmall = true
        },

        setHideQueueSmall: (state) => {
            state.showQueueSmall = false
        },

    }
})

export const {

    setShowQueueAlert,
    setHideQueueAlert,
    setJoinedQueue,
    setLeaveQueue,
    setShowQueueSmall,
    setHideQueueSmall,

 } = queueSlice.actions;
 
 export default queueSlice.reducer;