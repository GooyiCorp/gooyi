import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import showModalReducer from "./slices/showModalSlice";
import mainNavReducer from "./slices/mainNavSlice";
import subNavReducer from "./slices/subNavSlice";
import locateReducer from "./slices/locateSlice";
import searchReducer from "./slices/searchSlice";



export const store = configureStore({
    reducer: {
        user: userReducer,
        showModal: showModalReducer,
        page: mainNavReducer,
        subNav: subNavReducer,
        locate: locateReducer, 
        search: searchReducer,
    }
})