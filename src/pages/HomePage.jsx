import React from "react";
import { MovieCarousel } from "../components/MovieCarousel";

const HomePage = () => {
  return (
    <section className="flex flex-col w-full animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
          Bienvenido a <span className="text-yellow-400">MovieRadar</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Descubre tendencias, explora géneros y encuentra tu próxima obsesión.
        </p>
      </div>

      <div className="w-full space-y-8">

        <MovieCarousel
          title="Películas en Tendencia"
          category="popular"
          type="movie"
        />

        <MovieCarousel
          title="Series Mejor Valoradas"
          category="top_rated"
          type="series"
        />

        <MovieCarousel
          title="Próximos Estrenos"
          category="upcoming"
          type="movie"
        />

        <MovieCarousel
          title="Acción y Adrenalina"
          category="action"
          type="movie"
        />

        <MovieCarousel
          title="Ciencia Ficción TV"
          category="scifi_fantasy"
          type="series"
        />
      </div>
    </section>
  );
};

export default HomePage;
