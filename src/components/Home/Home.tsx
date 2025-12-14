import { useEffect, useState } from "react";
import { getFilmsListThunk } from "../../store/slices/filmSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Box, Typography, Button } from "@mui/material";
import './Home.css';

const imgUrl = "https://image.tmdb.org/t/p/w500/";

const Home = () => {
  const { films } = useAppSelector((state) => state.filmsData);
  const dispatch = useAppDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Նույն էջում ցուցադրվող ֆիլմերի քանակ
  const totalPages = Math.ceil(films.length / itemsPerPage);

  useEffect(() => {
    dispatch(getFilmsListThunk());
  }, [dispatch]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFilms = films.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "20px", gap: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {currentFilms.map((film) => (
          <Box
            key={film.id}
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
                transform: "translateY(-10px)",
                "& img": { transform: "scale(1.2)" },
              },
            }}
          >
            <Typography variant="h4" className="head">{film.title}</Typography>
            <img
              src={imgUrl + film.poster_path}
              style={{ borderRadius: "30px", transition: "all 0.5s" }}
              className="textarea"
            />
          </Box>
        ))}
      </Box>

      {/* Pagination buttons */}
      <Box sx={{ display: "flex", gap: "10px", mt: "20px" }}>
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
