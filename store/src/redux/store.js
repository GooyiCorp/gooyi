// Redux
import { configureStore } from "@reduxjs/toolkit";
// Slices
import merchantSlice from "./slices/merchantSlice";

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const store = configureStore({
    reducer: {
        merchant: merchantSlice,
    }
})