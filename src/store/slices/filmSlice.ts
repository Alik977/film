import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filmsAPI } from "../../api/api";
import type { IFilm } from "../../shared/types";

export const getFilmsListThunk = createAsyncThunk(
  "getFilmsListThunk",
  async () => {
    const response = await filmsAPI.getFilmsList();

    return response.data
  }
);

interface IFilmsStateType {
  films: Array<IFilm>;
}

const initialState: IFilmsStateType = {
  films: [],
};

const filmsSlice = createSlice({
  name: "filmsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFilmsListThunk.fulfilled, (state: any, action) => {
      state.films = action.payload.results
    });
  },
});

export default filmsSlice.reducer;
