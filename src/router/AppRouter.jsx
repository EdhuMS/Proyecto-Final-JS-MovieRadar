import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import SeriesPage from '../pages/SeriesPage';
import PeliculasPage from '../pages/PeliculasPage';
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage type="movie" />,
      },
      {
        path: "tv/:id",
        element: <MovieDetailPage type="tv" />, 
      },
      { 
        path: 'peliculas', 
        element: <PeliculasPage /> 
      },
      { 
        path: "*",
        element: <NotFoundPage />
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
