
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { IFilm } from "../../shared/types";
import { filmsAPI } from "../../api/filmsAPI";


export const getFilmsListThunk = createAsyncThunk(
  "films/getFilmsList",
  async () => {
    const response = await filmsAPI.getFilmsList();
    return response.data;
  }
);


export const getFilmByIdThunk = createAsyncThunk(
  "films/getFilmById",
  async (id: string) => {
    const response = await filmsAPI.getFilmById(id); 
    return response.data;
  }
);
interface IFilmsStateType {
  films: Array<IFilm>;
  selectedFilm: IFilm | null;
}

const initialState: IFilmsStateType = {
  films: [],
  selectedFilm: null,
};

const filmsSlice = createSlice({
  name: "filmsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
    builder.addCase(getFilmsListThunk.fulfilled, (state, action) => {
      state.films = action.payload.results;
    });


    builder.addCase(getFilmByIdThunk.fulfilled, (state, action) => {
      state.selectedFilm = action.payload;
    });
  },
});

export default filmsSlice.reducer;
