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

  getGenres(selectLng: any) {
    return this.axiosConfig().get<IGetGenresResponseType>(
      `/genre/movie/list?api_key=${this.#apiKey}&language=${selectLng}`
    );
  }

  getFilmsList(pageCount = 1) {
    return this.axiosConfig().get<IGetFilmsList>(
      `/discover/movie?api_key=${this.#apiKey}&language=en-US&page=${pageCount}`
    );
  }

  getOneMovie(id: number) {
    return this.axiosConfig().get<IFilm>(
      `/movie/${id}?api_key=${this.#apiKey}&language=en-US`
    );
  }

  getSearchFilmList(text: string) {
    return this.axiosConfig().get<IGetFilmsList>(
      `/search/movie?api_key=${this.#apiKey}&query=${text}`
    );
  }


  getFilmsByGenre(genreId: number, pageCount = 1) {
    return this.axiosConfig().get<IGetFilmsList>(
      `/discover/movie?api_key=${this.#apiKey}&with_genres=${genreId}&page=${pageCount}`
    );
  }
}

export const filmsAPI = new FilmsAPI();
