import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { filmsAPI } from "../../api/api";
import type { IFilm } from "../../shared/types";


export const getFilmsListThunk = createAsyncThunk<IGetFilmsListReturnType, number>(
  "getFilmsListThunk",
  async (page) => {
    const response = await filmsAPI.getFilmsList(page);
    return response.data;
  }
);


export const getOneFilmThunk = createAsyncThunk<IFilm, number>(
  "getOneFilmThunk",
  async (id) => {
    const response = await filmsAPI.getOneMovie(id);
    return response.data;
  }
);


export const getFilmsByGenreThunk = createAsyncThunk<IGetFilmsListReturnType, number>(
  "getFilmsByGenreThunk",
  async (genreId) => {
    const response = await filmsAPI.getFilmsByGenre(genreId);
    return response.data;
  }
);

interface IGetFilmsListReturnType {
  page: number;
  results: Array<IFilm>;
  total_pages: number;
  total_results: number;
}

interface IFilmsStateType {
  films: Array<IFilm>;
  page: number;
  totalPages: number;
  searchText: string;
  selectedFilm?: IFilm;
  selectedGenre?: number;
}

const initialState: IFilmsStateType = {
  films: [],
  page: 1,
  totalPages: 1,
  searchText: "",
  selectedFilm: undefined,
  selectedGenre: undefined,
};

const filmsSlice = createSlice({
  name: "filmsSlice",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    changeText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    changeGenre(state, action: PayloadAction<number | undefined>) {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFilmsListThunk.fulfilled, (state, action) => {
        state.films = action.payload.results;
        state.totalPages = Math.min(action.payload.total_pages, 500);
      })
      .addCase(getOneFilmThunk.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
      })
      .addCase(getFilmsByGenreThunk.fulfilled, (state, action) => {
        state.films = action.payload.results;
        state.totalPages = Math.min(action.payload.total_pages, 500);
      });
  },
});

export const { changePage, changeText, changeGenre } = filmsSlice.actions;
export default filmsSlice.reducer;
