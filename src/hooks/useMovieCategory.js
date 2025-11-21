import { useState, useEffect } from 'react';
import { getMoviesByCategory } from '../services/tmdb';

export const useMovieCategory = ({ category, type = 'movie' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const newMovies = await getMoviesByCategory({ category, type });
        
        if (isMounted) {
          setMovies(newMovies ? newMovies.slice(0, 10) : []);
        }
        
      } catch (e) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [category, type]);

  return { movies, loading, error };
};