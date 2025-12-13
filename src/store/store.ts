import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "./slices/genresSlice";
import filmsSlice from './slices/filmSlice'


const store = configureStore({
  reducer: {
    genresData: genresSlice,
    filmsData: filmsSlice
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
