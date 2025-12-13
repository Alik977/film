import { createBrowserRouter } from "react-router-dom";

import Home from "../../components/Home/Home";
import { Layout } from "../../components/templates/Layout/Layout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
        {
            index:true,
            element: <Home/>
        },
        {
            path: '/film/:id',
            element: <>FilmBy ID</>
        }
    ],
  },
]);
