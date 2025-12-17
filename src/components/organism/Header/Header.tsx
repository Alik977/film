import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getGenresThunk } from "../../../store/slices/genresSlice";
import { searchMoviesThunk } from "../../../store/slices/searchSlice";
import { getFilmsByGenreThunk } from "../../../store/slices/filmSlice";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

export type SelectType = "en-US" | "ru-RU";

export default function SearchAppBar() {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector((state) => state.genresData);
  const { results } = useAppSelector((state) => state.searchData);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState("");
  const [selectLeng, SetSelectLeng] = useState<SelectType>("en-US");
  const searchRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(getGenresThunk(selectLeng));
  }, [selectLeng]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // սեղմելով ժանր → fetch է այդ ժանրի ֆիլմերը
  const handleGenreClick = (genreId: number) => {
    handleCloseMenu();
    dispatch(getFilmsByGenreThunk(genreId));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      if (query.length > 2) {
        dispatch(searchMoviesThunk(query));
      }
    }, 400);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            {genres?.map((genre) => (
              <MenuItem key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                {genre.name}
              </MenuItem>
            ))}
          </Menu>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            CINEMAXIA
          </Typography>

          <select value={selectLeng} onChange={(e) => SetSelectLeng(e.target.value as SelectType)}>
            <option value="en-US">EN</option>
            <option value="ru-RU">RU</option>
          </select>

          <Search ref={searchRef}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase value={value} onChange={handleSearch} placeholder="Search movies…" />

            {value.length > 2 && results.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  maxHeight: 300,
                  overflowY: "auto",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: 1,
               
                }}
              >
                {results.map((movie: any) => (
                  <MenuItem
                    key={movie.id}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                      setValue("");
                    }}
                  >
                    {movie.title}
                  </MenuItem>
                ))}
              </Box>
            )}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
