import{ useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getOneFilmThunk } from "../../../store/slices/filmSlice";
import { Box, Typography } from "@mui/material";

const imgUrl = "https://image.tmdb.org/t/p/w300/";
const FilmPage = () => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();

  const oneFilm = useAppSelector((state) => state.filmsData.selectedFilm);

  useEffect(() => {
    dispatch(getOneFilmThunk(Number(id)));
  }, [id, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: "400px",
        width: "100%",
        margin: "auto",
        padding: "20px",
        border: "2px solid black",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(150, 84, 84, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent:'space-between',
        alignItems: "center",
    
      }}
    >
      <Typography
        variant="h5"> {oneFilm?.title}  </Typography>
      <img src={imgUrl + oneFilm?.backdrop_path} />
      <Typography  sx={{ textAlign:"justify", color: "white", }}>{oneFilm?.overview}</Typography>
      <Typography> <span style={{ fontWeight: 700, color: "#1976d2" }}>Popularity</span>  {oneFilm?.popularity}</Typography>
      <Typography><span style={{ fontWeight: 700, color: "#1976d2" }}>Release Date</span> {oneFilm?.release_date}</Typography>
    </Box>
  );
};

export default FilmPage;
