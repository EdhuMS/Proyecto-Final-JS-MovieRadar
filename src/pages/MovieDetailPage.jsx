import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { Spinner } from "../components/Spinner";
import { ReviewCard } from "../components/ReviewCard";
import { MovieCard } from "../components/MovieCard";

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const MovieDetailPage = ({ type = "movie" }) => {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetail({ id, type });
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-2xl h-[60vh]">
        <p>{error}</p>
        <Link to="/" className="text-yellow-400 text-lg mt-4 block">
          Volver al inicio
        </Link>
      </div>
    );
  if (!movie) return null;

  const placeholderImage =
    "https://via.placeholder.com/400x600.png?text=No+Poster";
  const imageUrl = movie.poster === "N/A" ? placeholderImage : movie.poster;

  const renderCast = () => {
    if (!movie.actors || movie.actors.length === 0) return null;
    if (typeof movie.actors === "string")
      return <p className="text-gray-300">{movie.actors}</p>;

    return (
      <div className="flex gap-4 overflow-x-auto py-4 custom-scrollbar">
        {movie.actors.map((actor, index) => (
          <div key={index} className="flex flex-col items-center min-w-[100px]">
            <img
              src={actor.photo || "https://placehold.co/100x100?text=?"}
              alt={actor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-600 mb-2"
            />
            <p className="text-xs text-center text-white font-bold leading-tight">
              {actor.name}
            </p>
            <p className="text-xs text-center text-gray-400 leading-tight">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in pb-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 font-semibold mb-6 transition-colors"
      >
        <BackArrowIcon /> Volver
      </button>

      {/* INFO PRINCIPAL */}
      <article className="bg-gray-800 shadow-2xl rounded-xl overflow-hidden mb-12">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <img
              src={imageUrl}
              alt={`Poster de ${movie.title}`}
              className="w-full h-full object-cover"
              style={{ minHeight: "450px" }}
            />
          </div>
          <div className="md:w-2/3 p-6 md:p-10 bg-gray-800">
            <div className="flex flex-wrap items-baseline gap-4 mb-2">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {movie.title}
              </h1>
              <span className="text-2xl text-yellow-400 font-light">
                ({movie.year})
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              <span className="px-3 py-1 bg-gray-700 rounded text-gray-200 border border-gray-600">
                {movie.runtime}
              </span>
              {movie.genres?.split(", ").map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded border border-blue-800/50"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">
                Sinopsis
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed opacity-90">
                {movie.plot || "No hay descripción disponible."}
              </p>
            </div>
            <div className="border-t border-gray-700 pt-6 mb-6">
              <p className="text-gray-300 mb-4">
                <strong className="text-white uppercase text-sm tracking-wide mr-2">
                  Director:
                </strong>{" "}
                {movie.director}
              </p>
              <div className="mb-2">
                <strong className="text-white uppercase text-sm tracking-wide block mb-3">
                  Elenco Principal:
                </strong>
                {renderCast()}
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4">
              {movie.rating && movie.rating !== "N/A" && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-4xl">★</span>
                  <div>
                    <span className="text-2xl font-bold text-white">
                      {movie.rating}
                    </span>
                    <span className="text-xs text-gray-400 block">
                      TMDb Rating
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* SECCIÓN 2: TRAILER Y RESEÑAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {movie.trailer ? (
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-yellow-400 pl-3">
              Trailer Oficial
            </h3>
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={movie.trailer}
                title="Trailer"
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        ) : null}

        <div className={movie.trailer ? "lg:col-span-1" : "lg:col-span-3"}>
          <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-3">
            Reseñas de Fans ({movie.reviews.length})
          </h3>

          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {movie.reviews && movie.reviews.length > 0 ? (
              movie.reviews.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))
            ) : (
              <div className="bg-gray-800/50 border border-dashed border-gray-600 rounded-xl p-8 text-center">
                <p className="text-gray-400 italic">
                  No hay reseñas escritas para este título todavía.
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  ¡Sé el primero en escribir una en TMDb!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: RECOMENDACIONES */}
      {movie.recommendations && movie.recommendations.length > 0 && (
        <div className="w-full mt-6 border-t border-gray-800 pt-4">
          <h3 className="text-3xl font-semibold text-white mb-6">
            Si te gustó esto, te recomendamos...
          </h3>
          <div className="flex overflow-x-auto space-x-6 py-4 pb-8 custom-scrollbar">
            {movie.recommendations.map((rec, index) => (
              <div
                key={`${rec.id}-${index}`}
                className="shrink-0 w-48 md:w-56 transition-transform hover:-translate-y-2 duration-300"
              >
                <MovieCard {...rec} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
