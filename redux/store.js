import { configureStore } from "@reduxjs/toolkit";
import ImageUriReducer from './ImageUriSlice';
import UserInformationReducer from "./UserInformationSlice";

const store = configureStore({
    reducer: {
        ImageUriReducer: ImageUriReducer,
        UserInformationReducer: UserInformationReducer,
    }
})

export default store;