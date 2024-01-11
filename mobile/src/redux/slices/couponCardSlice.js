import { createSlice } from "@reduxjs/toolkit"

export const couponCardSlice = createSlice({

    name: 'couponCard',
    
    initialState: {
        userAction: 'GoBack',
        activateCouponAlert: false,
        timeEndAlert: false,
        leaveCouponScreenAlert: false,
    },

    // ----------------------------------------------------------------------------------- Reducers
    reducers: {

        setShowActivateCouponAlert: (state) => {
            state.activateCouponAlert = true
        },

        setHideActivateCouponAlert: (state) => {
            state.activateCouponAlert = false
        },

        setShowTimeEndAlert: (state) => {
            state.timeEndAlert = true
        },

        setHideTimeEndAlert: (state) => {
            state.timeEndAlert = false
        },

        setShowLeaveCouponScreenAlert: (state) => {
            state.leaveCouponScreenAlert = true
        },

        setHideLeaveCouponScreenAlert: (state) => {
            state.leaveCouponScreenAlert = false
        },

        setUserAction: (state, action) => {
            state.userAction = action.payload
        },

    }
})

export const {

    setShowActivateCouponAlert,
    setHideActivateCouponAlert,

    setShowTimeEndAlert,
    setHideTimeEndAlert,

    setShowLeaveCouponScreenAlert,
    setHideLeaveCouponScreenAlert,

    setUserAction,

 } = couponCardSlice.actions;
 
 export default couponCardSlice.reducer;