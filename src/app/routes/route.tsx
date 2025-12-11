import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <>Layout</>,
        children : [
            {
                index : true,
                element : <>Home</>,
            },
            {
                path : '/film/:id',
                element : <>FilmBy ID</>,
            },
        ]
    }
])