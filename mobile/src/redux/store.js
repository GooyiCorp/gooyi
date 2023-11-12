import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import showModalReducer from "./slices/showModalSlice";
import mainNavReducer from "./slices/mainNavSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        showModal: showModalReducer,
        page: mainNavReducer,
    }
})