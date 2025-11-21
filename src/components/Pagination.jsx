import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  // Sincronizar input si cambia la página externamente
  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleGoToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      onPageChange(pageNumber);
    } else {
      // Si el número no es válido, reseteamos al actual
      setInputPage(currentPage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12 mb-8 animate-fade-in text-sm md:text-base">
      
      {/* Controles Básicos */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`
            px-4 py-2 rounded-lg font-bold transition-all duration-200
            ${currentPage === 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 shadow-lg hover:-translate-y-1'}
          `}
        >
          ← Anterior
        </button>

        <span className="text-gray-300 font-medium">
          Página <span className="text-yellow-400 font-bold">{currentPage}</span> de {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`
            px-4 py-2 rounded-lg font-bold transition-all duration-200
            ${currentPage === totalPages 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 shadow-lg hover:-translate-y-1'}
          `}
        >
          Siguiente →
        </button>
      </div>

      {/* Input de Salto Rápido */}
      <form onSubmit={handleGoToPage} className="flex items-center gap-2 ml-0 md:ml-4">
        <span className="text-gray-400 hidden md:inline">Ir a:</span>
        <input 
          type="number" 
          min="1" 
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="w-16 px-2 py-2 bg-gray-800 border border-gray-600 rounded text-center text-white focus:border-yellow-400 focus:outline-none appearance-none"
        />
        <button 
          type="submit"
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded border border-gray-600 transition-colors"
        >
          Ir
        </button>
      </form>

    </div>
  );
};

export default Pagination;