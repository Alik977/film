import { createBrowserRouter } from "react-router-dom";

import Home from "../../components/Home/Home";
import { Layout } from "../../components/templates/Layout/Layout";
import MoviePage from '../../components/organism/Pagesfilm/MoviePage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "movie/:id",
        element: <MoviePage />
      }
    ],
  },
]);
