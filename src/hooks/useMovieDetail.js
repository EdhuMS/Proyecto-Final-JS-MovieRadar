import { useState, useEffect } from 'react';
import { getMovieById } from '../services/tmdb';

export const useMovieDetail = ({ id, type }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await getMovieById({ id, type });
        setMovie(movieData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, type]);

  return { movie, loading, error };
};