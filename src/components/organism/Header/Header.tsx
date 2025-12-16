import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getGenresThunk } from "../../../store/slices/genresSlice";
import { searchMoviesThunk } from "../../../store/slices/searchSlice";
import { useNavigate } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function SearchAppBar() {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(state => state.genresData);
  const { results } = useAppSelector(state => state.searchData);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getGenresThunk());
  }, [dispatch]);

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (query.length > 2) {
      dispatch(searchMoviesThunk(query));
      setOpenDropdown(true);
    } else {
      setOpenDropdown(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {genres?.map((genre) => (
              <MenuItem key={genre.id} onClick={handleCloseMenu}>
                {genre.name}
              </MenuItem>
            ))}
          </Menu>

          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            CINEMAXIA
          </Typography>

          <Search ref={searchRef}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={value}
              onChange={handleSearch}
              placeholder="Search movies…"
            />

            {openDropdown && results.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                
                  zIndex: 10,
                  maxHeight: 300,
                  overflowY: 'auto',
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: 1,
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: '4px',
                  },
                }}
              >
           {results.map((movie: any) => (
  <MenuItem
    key={movie.id}
    onClick={() => {
     navigate(`/movie/${movie.id}`);
      setOpenDropdown(false);
      setValue('');
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
