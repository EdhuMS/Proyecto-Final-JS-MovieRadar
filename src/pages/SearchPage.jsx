import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { MovieList } from '../components/MovieList';
import { Spinner } from '../components/Spinner';
import { SearchBar } from '../components/SearchBar';
import { SearchFilters } from '../components/SearchFilters';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; 
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [filters, setFilters] = useState({
    type: '',
    genre: '',
    year: ''
  });

  const { movies, totalPages, loading, error, getMovies } = useMovies();

  const isSearchMode = query.length > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getMovies({ 
      search: query, 
      type: filters.type, 
      year: filters.year,
      genre: isSearchMode ? '' : filters.genre, 
      page: pageParam
    });
  }, [query, filters.type, filters.year, filters.genre, pageParam, getMovies, isSearchMode]);


  // FILTRADO EN CLIENTE
  const filteredMovies = useMemo(() => {
    // Si no hay texto, confiamos en lo que trajo la API
    if (!isSearchMode) return movies;

    // Si hay texto y filtro de género, filtramos manualmente
    if (filters.genre) {
      const genreId = parseInt(filters.genre);
      return movies.filter(movie => movie.genreIds && movie.genreIds.includes(genreId));
    }
    
    return movies;
  }, [movies, filters.genre, isSearchMode]);

  // HANDLERS
  const handleSearch = ({ search }) => {
    setSearchParams({ q: search, page: 1 });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page', 1);
        return newParams;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', newPage);
      return newParams;
    });
  };

  const handleClearAll = () => {
    setFilters({ type: '', genre: '', year: '' });
    setSearchParams({});
  };

  // RENDER
  const renderContent = () => {
    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
    
    if (movies.length === 0 && !loading) {
        return <p className="text-center text-gray-400 text-lg mt-8">No se encontraron resultados.</p>;
    }

    if (isSearchMode && filteredMovies.length === 0 && movies.length > 0) {
      return (
        <p className="text-center text-gray-400 text-lg mt-8">
          Hay resultados para "{query}", pero ninguno coincide con el género seleccionado.
        </p>
      );
    }

    const showPagination = !isSearchMode || (isSearchMode && !filters.genre);

    return (
      <>
        <MovieList movies={filteredMovies} />
        
        {showPagination && (
          <Pagination 
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        
        {isSearchMode && filters.genre && (
            <p className="text-center text-xs text-gray-500 mt-8 bg-gray-800 p-2 rounded inline-block mx-auto">
                Nota: La paginación está desactivada al combinar "Texto + Género" debido a limitaciones de la API.
            </p>
        )}
      </>
    );
  };

  return (
    <section className="w-full animate-fade-in">
      <SearchBar onSearch={handleSearch} initialValue={query} />
      
      <SearchFilters 
        filters={filters} 
        onChange={handleFilterChange} 
        onClear={handleClearAll} 
      />

      <div className="mb-8">
        {query ? (
            <h2 className="text-3xl font-semibold text-white">
            Resultados para: <span className="text-yellow-400">"{query}"</span>
            </h2>
        ) : (
            <h2 className="text-3xl font-semibold text-white">
            Explorar <span className="text-yellow-400">Categorías</span>
            </h2>
        )}
      </div>
      
      {renderContent()}
    </section>
  );
};

export default SearchPage;