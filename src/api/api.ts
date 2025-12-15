import axios from "axios";
import type { IGetFilmsList, IGetGenresResponseType } from "./api.types";
import type { IFilm } from "../shared/types";

class FilmsAPI {
  #apiKey: string = "f36f23edf6e10fd2ddcf939916b1f67a";
  private axiosConfig() {
    return axios.create({
      baseURL: "https://api.themoviedb.org/3",
    });
  }

  getGenres() {
    return this.axiosConfig().get<IGetGenresResponseType>(
      `/genre/movie/list?api_key=${this.#apiKey}&language=en-US`
    );
  }
  getFilmsList(pageCount =1) {
    return this.axiosConfig().get<IGetFilmsList>(`discover/movie?api_key=${this.#apiKey}&language=en-US&page=${pageCount}`)
  }

  getOneMovie(id:number) {
    return this.axiosConfig().get<IFilm>(`/movie/${id}?api_key=${this.#apiKey}&language=en-US`)
  }

  getSearchFilmList(text: "") {
    return this.axiosConfig().get<IGetFilmsList>(
      `search/movie?api_key=${this.#apiKey}&query=${text}`
    );
  }
}

export const filmsAPI = new FilmsAPI();
