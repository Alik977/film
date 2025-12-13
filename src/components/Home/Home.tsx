import { useEffect } from "react";
import { getFilmsListThunk } from "../../store/slices/filmSlice.ts";
import { useAppDispatch,useAppSelector } from "../../store/hooks";
import { Box, Typography } from "@mui/material";
import './Home.css'

const imgUrl = "https://image.tmdb.org/t/p/w500/";
const Home = () => {
  const { films } = useAppSelector((state) => state.filmsData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFilmsListThunk());
  }, [dispatch]);

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      
        gap: "15px",
        flexWrap: "wrap",
        mt: "20px",
      }}
    >
      {films.map((film) => {
        return (
          <Box 
            sx={{
             
              padding: "10px 20px",
              textAlign: "center",
              borderRadius: "30px",
              maxWidth: "400px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              transition: "all 0.5s",

              "&:hover": {
                transform: "translateY(-10px)" ,

                "& img": {
                  transform: "scale(1.5)",
                  
                },
              },
            }}
          >
            <Typography variant="h4"  className="head">{film.title}</Typography>
            <img
              src={imgUrl + film.poster_path}
              style={{ borderRadius: "30px", transition: "all 0.5s" }}
              className="textarea"
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default Home;
