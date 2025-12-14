import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "./slices/genresSlice";
import filmsSlice from "./slices/filmSlice.ts";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    genresData: genresSlice,
    filmsData: filmsSlice,
    searchData: searchReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
