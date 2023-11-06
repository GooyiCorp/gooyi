import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import showModalReducer from "./slices/showModalSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        showModal: showModalReducer,
    }
})