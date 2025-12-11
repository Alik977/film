import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "./slices/generesSlice"

const store=configureStore({
    reducer:{
genresData:genresSlice


    }
})
export default store