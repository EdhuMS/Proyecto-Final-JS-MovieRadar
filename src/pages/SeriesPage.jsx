import React from 'react';
import { MovieCarousel } from '../components/MovieCarousel';

const SeriesPage = () => {
  return (
    <section className="w-full animate-fade-in">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
        Explora Series de TV
      </h2>

      <div className="w-full mt-4 space-y-10">
        <MovieCarousel 
          title="Series en Emisión" 
          category="on_the_air" 
          type="series" 
        />
        <MovieCarousel 
          title="Top Rated TV" 
          category="top_rated" 
          type="series" 
        />
        <MovieCarousel 
          title="Crimen y Misterio" 
          category="crime" 
          type="series" 
        />
        <MovieCarousel 
          title="Comedias Sitcom" 
          category="comedy" 
          type="series" 
        />
        <MovieCarousel 
          title="Acción y Aventura" 
          category="action_adventure" 
          type="series" 
        />
      </div>
    </section>
  );
};

export default SeriesPage;