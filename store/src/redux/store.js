// Redux
import { configureStore } from "@reduxjs/toolkit";
// Slices
import merchantSlice from "./slices/merchantSlice";
import logInSlice from "./slices/logInSlice";
import changePasswordSlice from "./slices/changePasswordSlice";
import resetPasswordSlice from "./slices/resetPasswordSlice";
import createCouponSlice from "./slices/createCouponSlice";


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const store = configureStore({
    reducer: {
        merchant: merchantSlice,
        logIn: logInSlice,
        changePassword: changePasswordSlice,
        resetPassword: resetPasswordSlice,
        createCoupon: createCouponSlice,
    }
})