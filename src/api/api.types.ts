import type { IGenre, IFilm } from "../shared/types";

interface IGetGenresResponseType {
    genres: Array<IGenre>
}

interface IGetFilmsList {
    page:number
    results:Array<IFilm>
    total_pages:number
    total_results:number 
}

export type {IGetGenresResponseType, IGetFilmsList}