import React, { useState } from 'react';
import { translateText } from '../services/gemini';

const TranslateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  </svg>
);

const SpinnerSmall = () => (
  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
);

export const ReviewCard = ({ review }) => {
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  const handleTranslate = async () => {
    // Si ya lo tradujimos antes, solo alternamos la vista
    if (translatedContent) {
      setShowOriginal(!showOriginal);
      return;
    }

    // Si es la primera vez, llamamos a Gemini
    setIsTranslating(true);
    const translation = await translateText(review.content);
    setIsTranslating(false);

    if (translation) {
      setTranslatedContent(translation);
      setShowOriginal(false);
    }
  };

  // Contenido a mostrar (Original o Traducido)
  const displayContent = showOriginal ? review.content : translatedContent;

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:bg-gray-750 transition-colors group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-gray-900 font-bold text-xs">
             {review.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-gray-200 text-sm block leading-none">{review.author}</span>
            {review.rating && (
               <span className="text-[10px] text-yellow-500">★ {review.rating}/10</span>
            )}
          </div>
        </div>

        {/* Botón de Traducir */}
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/20 px-2 py-1 rounded border border-blue-900/50"
          title="Traducir reseña con IA"
        >
          {isTranslating ? <SpinnerSmall /> : <TranslateIcon />}
          {isTranslating ? "Traduciendo..." : (showOriginal ? (translatedContent ? "Ver Traducción" : "Traducir") : "Ver Original")}
        </button>
      </div>

      <p className="text-gray-300 text-xs leading-relaxed italic whitespace-pre-line animate-fade-in">
        "{displayContent}"
      </p>
      
      {!showOriginal && (
        <p className="text-[10px] text-gray-500 mt-2 text-right flex items-center justify-end gap-1">
           Traducido por <strong>Gemini AI</strong>
        </p>
      )}
    </div>
  );
};