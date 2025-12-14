import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"; 
import { Box, Typography } from "@mui/material";
import { getFilmByIdThunk } from "../../../store/slices/filmSlice";

const imgUrl = "https://image.tmdb.org/t/p/w500/";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedFilm } = useAppSelector((state) => state.filmsData);

  useEffect(() => {
    if (id) {
      dispatch(getFilmByIdThunk(id));
    }
  }, [id, dispatch]);

  if (!selectedFilm) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4">{selectedFilm.title}</Typography>
      <img src={`${imgUrl}${selectedFilm.poster_path}`} alt={selectedFilm.title} />
      <Typography variant="body1">{selectedFilm.overview}</Typography>

      <Box>
        <Typography variant="h6">Genres:</Typography>
        {Array.isArray(selectedFilm.genres) && selectedFilm.genres.length > 0
          ? selectedFilm.genres.map((genre) => <span key={genre.id}>{genre.name} </span>)
          : <span>No genres available</span>
        }
      </Box>
    </Box>
  );
};

export default MoviePage;
