import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "./slices/generesSlice"

const store=configureStore({
    reducer:{
genresData:genresSlice


    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




export default store