import axios from "axios";
import type { IGetFilmsList, IGetGenresResponseType } from "./api.types";

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

 
}

export const filmsAPI = new FilmsAPI();
