import axios from "axios";

const API_KEY = "f36f23edf6e10fd2ddcf939916b1f67a";
const BASE_URL = "https://api.themoviedb.org/3";

export const filmsAPI = {
  getFilmsList: () => axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`),

  getFilmById: (id: string) =>
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
};
