import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { filmsAPI } from "../../api/api";
import type { IGenre } from "../../shared/types";

export const getGenresThunk = createAsyncThunk<Array<IGenre>>(
  "getGenresThunk",
  async () => {
    let response = await filmsAPI.getGenres();
    return response.data.genres;
  }
);

interface IGenresStateType {
  genres: Array<IGenre>;
  isPending: boolean;
}

const initialState: IGenresStateType = {
  genres: [],
  isPending: false,
};

const genresSlice = createSlice({
  name: "genresSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenresThunk.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getGenresThunk.fulfilled, (state, action: PayloadAction<Array<IGenre>>) => {
        state.isPending = false;
        state.genres = action.payload;
      }
    );
  },
});

export default genresSlice.reducer;
