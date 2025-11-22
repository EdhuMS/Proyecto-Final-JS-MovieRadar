import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/tmdb";

const SearchIcon = () => (
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
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

export const HeaderSearchBar = ({ onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true);
      searchMovies({ search: debouncedQuery })
        .then((response) => {
          const moviesArray = response?.results || [];
          setResults(moviesArray);
          setTotalResults(response?.totalResults || 0);
          setIsLoading(false);
          setIsDropdownOpen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
          setResults([]);
          setTotalResults(0);
        });
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
  }, [debouncedQuery]);

  const clearAndClose = () => {
    setQuery("");
    setResults([]);
    setIsDropdownOpen(false);
    if (onSearchComplete) onSearchComplete();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      navigate(`/search?q=${query}`);
      clearAndClose();
    }
  };

  const handleResultClick = () => {
    clearAndClose();
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full lg:w-64 animate-fade-in"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsDropdownOpen(true);
          }}
          onBlur={handleBlur}
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </div>
      </div>

      {isDropdownOpen && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto custom-scrollbar">
          {isLoading && (
            <p className="p-4 text-gray-300 text-center animate-pulse">
              Buscando...
            </p>
          )}

          {!isLoading && results.length > 0 && (
            <ul>
              {results.slice(0, 5).map((movie) => {
                const path =
                  movie.mediaType === "tv"
                    ? `/tv/${movie.id}`
                    : `/movie/${movie.id}`;
                return (
                  <li
                    key={movie.id}
                    className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700 transition-colors"
                  >
                    <Link
                      to={path}
                      onClick={handleResultClick}
                      className="flex items-center p-3"
                    >
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded shadow-sm mr-3"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/50x75?text=No+Img";
                        }}
                      />
                      <div className="overflow-hidden">
                        <p className="text-white font-semibold text-sm truncate">
                          {movie.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{movie.year}</span>
                          <span className="px-1.5 py-0.5 bg-gray-600 rounded uppercase text-[10px]">
                            {movie.mediaType === "tv" ? "TV" : "Cine"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {!isLoading && totalResults > 5 && (
            <Link
              to={`/search?q=${query}`}
              onClick={handleResultClick}
              className="block p-3 text-center text-sm font-bold text-yellow-400 hover:bg-gray-700 hover:text-yellow-300 transition-colors rounded-b-lg border-t border-gray-700"
            >
              Ver los {totalResults.toLocaleString()} resultados
            </Link>
          )}

          {!isLoading && results.length === 0 && (
            <p className="p-4 text-gray-400 text-center text-sm">
              Sin resultados para "{query}"
            </p>
          )}
        </div>
      )}
    </form>
  );
};
