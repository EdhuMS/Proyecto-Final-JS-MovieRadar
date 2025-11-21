import { useState, useCallback, useRef } from 'react';
import { searchMovies } from '../services/tmdb';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const previousSearch = useRef({});

  const getMovies = useCallback(async ({ search, type, year, genre, page = 1 }) => {
    
    const currentParams = JSON.stringify({ search, type, year, genre, page });
    if (currentParams === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = currentParams;
      
      const { results, totalPages: total } = await searchMovies({ search, type, year, genre, page });
      
      setMovies(results);
      setTotalPages(total);
      
    } catch (e) {
      setError(e.message);
      setMovies([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, totalPages, loading, error, getMovies };
};