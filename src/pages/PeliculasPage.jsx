import React from 'react';
import { MovieCarousel } from '../components/MovieCarousel';

const PeliculasPage = () => {
  return (
    <section className="w-full animate-fade-in">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
        Explora Películas
      </h2>
      
      <div className="w-full mt-4 space-y-10">
        <MovieCarousel 
          title="Lo Más Popular Hoy" 
          category="popular" 
          type="movie"
        />
        <MovieCarousel 
          title="Aclamadas por la Crítica" 
          category="top_rated" 
          type="movie" 
        />
        <MovieCarousel 
          title="Acción" 
          category="action" 
          type="movie" 
        />
        <MovieCarousel 
          title="Animación para todos" 
          category="animation" 
          type="movie" 
        />
        <MovieCarousel 
          title="Terror y Suspenso" 
          category="horror" 
          type="movie" 
        />
      </div>
    </section>
  );
};

export default PeliculasPage;