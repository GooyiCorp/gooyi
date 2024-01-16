// Redux
import { configureStore } from "@reduxjs/toolkit";
// Slices
import merchantSlice from "./slices/merchantSlice";
import logInSlice from "./slices/logInSlice";

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const store = configureStore({
    reducer: {
        merchant: merchantSlice,
        logIn: logInSlice,
    }
})