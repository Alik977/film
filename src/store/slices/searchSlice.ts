import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'f36f23edf6e10fd2ddcf939916b1f67a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMoviesThunk = createAsyncThunk(
  'search/movies',
  async (query: string) => {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return res.data.results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
  },
  reducers: {
    clearResults(state) {
      state.results = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchMoviesThunk.pending, state => {
        state.loading = true;
      })
      .addCase(searchMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
