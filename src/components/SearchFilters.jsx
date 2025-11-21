import React from 'react';
import { GENRE_MAP } from '../services/tmdb';

export const SearchFilters = ({ filters, onChange, onClear }) => {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-8 border border-gray-700 shadow-lg animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        
        {/* Filtro: TIPO */}
        <div className="w-full md:w-1/4">
          <label className="block text-xs text-gray-400 mb-1 uppercase font-bold">Categoría</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
          >
            <option value="">Todo</option>
            <option value="movie">Películas</option>
            <option value="series">Series TV</option>
          </select>
        </div>

        {/* Filtro: GÉNERO */}
        <div className="w-full md:w-1/4">
          <label className="block text-xs text-gray-400 mb-1 uppercase font-bold">Género</label>
          <select
            name="genre"
            value={filters.genre}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
          >
            <option value="">Todos los géneros</option>
            {Object.entries(GENRE_MAP).map(([key, id]) => (
              <option key={id} value={id}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' & ')}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro: AÑO */}
        <div className="w-full md:w-1/4">
          <label className="block text-xs text-gray-400 mb-1 uppercase font-bold">Año</label>
          <input
            type="number"
            name="year"
            placeholder="Ej: 2023"
            value={filters.year}
            onChange={handleInputChange}
            min="1900"
            max="2030"
            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        {/* Botón: LIMPIAR */}
        <div className="w-full md:w-auto">
          <button
            onClick={onClear}
            className="w-full md:w-auto px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded font-semibold transition-colors h-[42px]"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};