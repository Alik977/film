import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filmsAPI } from "../../api/api";
import type { IFilm } from "../../shared/types";

export const getFilmsListThunk = createAsyncThunk<IGetFilmsListReturnType,number>("getFilmsListThunk", 
  async (page) => {
  const response = await filmsAPI.getFilmsList(page);

  return response.data;
});


export const getOneFilmThunk = createAsyncThunk<IFilm, number> (
  'getOneFilmThunk',
  async (id) => {
   const response =  await filmsAPI.getOneMovie(id)
   return response.data
  }
)

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
  searchText:string,
  selectedFilm?: IFilm
}

const initialState: IFilmsStateType = {
  films: [],
  page: 1,
  totalPages: 1,
  searchText:'',
  selectedFilm: undefined,
};

const filmsSlice = createSlice({
  name: "filmsSlice",
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },

    changeText(state, action) {
state.searchText = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getFilmsListThunk.fulfilled, (state, action) => {
      state.films = action.payload.results;
      state.totalPages = Math.min(action.payload.total_pages, 500)

    })
    .addCase(getOneFilmThunk.fulfilled, (state, action) => {
      state.selectedFilm = action.payload
    })
  },
});

export const { changePage, changeText } = filmsSlice.actions;
export default filmsSlice.reducer;
