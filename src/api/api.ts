import axios from "axios"
import type { IGetGenresResponseType } from "./api.types"

class FilmsAPI {
    #apiKey : string = "f36f23edf6e10fd2ddcf939916b1f67a"
    private axiosConfig(){
        return axios.create({
            baseURL : 'https://api.themoviedb.org/3'
        })
    }

    getGenres(){
        return this.axiosConfig().get<IGetGenresResponseType>(`/genre/movie/list?api_key=${this.#apiKey}&language=en-US`)
    }
}



export const filmsAPI = new FilmsAPI()


