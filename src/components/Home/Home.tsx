import { useEffect } from "react";
import { getFilmsListThunk, changePage } from "../../store/slices/filmSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Box, Typography, Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Home.css";

const imgUrl = "https://image.tmdb.org/t/p/w200/";

const Home = () => {
  const { films, page, totalPages } = useAppSelector(
    (state) => state.filmsData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFilmsListThunk(page));
  }, [page, dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
     
      <Pagination
        sx={{ mt: 2 }}
        count={totalPages}
        page={page}
        onChange={(_, value) => dispatch(changePage(value))}
        showFirstButton
        showLastButton
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          mt: "20px",
        }}
      >
        {films.map((film) => (
          <Box
            key={film.id}
            sx={{
              padding: "10px 20px",
              textAlign: "center",
              borderRadius: "30px",
              maxWidth: "300px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              transition: "0.5s",
              "&:hover": { transform: "translateY(-10px)" },
            }}
          >
           <NavLink
  to={`/film/${film.id}`}
  style={{
    textDecoration: "none",
    color: "white",
    display: "flex",
    justifyContent:"space-around",
    flexDirection: "column",
    alignItems:"center",
    gap: "2px",
    fontFamily:"-apple-system",
   
  }}
>
 <Typography variant="h6" sx={{ mb: 1.5 }}>
  {film.title}
</Typography>
  <img
    src={imgUrl + film.poster_path}
    style={{ borderRadius: "20px", width: "100%" }}
    className="textarea"
  />
</NavLink>
          </Box>
        ))}
      </Box>

      
      <Pagination
        sx={{ mt: 2 }}
        count={totalPages}
        page={page}
        onChange={(_, value) => dispatch(changePage(value))}
        showFirstButton
        showLastButton
        color="primary"
      />
    </Box>
  );
};

export default Home;
