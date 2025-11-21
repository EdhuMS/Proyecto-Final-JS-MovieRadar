import React from "react";
import { useMovieCategory } from "../hooks/useMovieCategory";
import { MovieCard } from "./MovieCard";
import { Spinner } from "./Spinner";
import "../styles/scrollbar.css";

export const MovieCarousel = ({ title, category, type = 'movie' }) => {
  const { movies, loading, error } = useMovieCategory({ category, type });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      );
    }

    if (error || !movies || movies.length === 0) return null;

    return (
      <div className="flex overflow-x-auto space-x-4 py-4 pb-6 custom-scrollbar">
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0 w-48 md:w-56 transition-transform hover:-translate-y-2 duration-300">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mb-8 animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-2 border-l-4 border-yellow-400 pl-3">
        {title}
      </h3>
      {renderContent()}
    </div>
  );
};