import { createSlice } from "@reduxjs/toolkit"

export const storeFeedbackSlice = createSlice({

    name: 'storeFeedback',
    
    initialState: {
        leaveScreenAlert: false,
        messageSendAlert: false,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        setShowLeaveScreenAlert: (state) => {
            state.leaveScreenAlert = true
        },

        setHideLeaveScreenAlert: (state) => {
            state.leaveScreenAlert = false
        },

        setShowMessageSendAlert: (state) => {
            state.messageSendAlert = true
        },

        setHideMessageSendAlert: (state) => {
            state.messageSendAlert = false
        },

    }
})

export const {

    setShowLeaveScreenAlert,
    setHideLeaveScreenAlert,
    setShowMessageSendAlert,
    setHideMessageSendAlert,

 } = storeFeedbackSlice.actions;
 
 export default storeFeedbackSlice.reducer;