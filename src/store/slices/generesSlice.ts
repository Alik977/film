import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: []
};

const genresSlice = createSlice({
  name: 'genresSlice',
  initialState,
  reducers: {
    getGenres(state, action) {
      state.genres = action.payload;
    }
  }
});

export const { getGenres } = genresSlice.actions;
export default genresSlice.reducer;
