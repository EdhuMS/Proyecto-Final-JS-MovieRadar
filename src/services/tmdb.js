const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = import.meta.env.VITE_TMDB_BS_IMG || 'https://image.tmdb.org/t/p/w500';
const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

export const GENRE_MAP = {
  'action': 28, 'adventure': 12, 'animation': 16, 'comedy': 35,
  'crime': 80, 'documentary': 99, 'drama': 18, 'family': 10751,
  'fantasy': 14, 'horror': 27, 'mystery': 9648, 'romance': 10749,
  'scifi': 878,
  'action_adventure': 10759, 'scifi_fantasy': 10765,
};

// --- HELPERS ---
const fetchFromApi = async (endpoint, params = '', lang = 'es-ES') => {
  try {
    const langParam = lang ? `&language=${lang}` : '';
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${langParam}${params}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

const transformMedia = (item) => {
  if (!item) return null;
  const isMovie = item.media_type === 'movie' || item.title;

  return {
    id: item.id,
    title: item.title || item.name,
    year: (item.release_date || item.first_air_date || '').split('-')[0],
    poster: item.poster_path ? `${IMG_BASE}${item.poster_path}` : 'N/A',
    backdrop: item.backdrop_path ? `${IMG_ORIGINAL}${item.backdrop_path}` : null,
    plot: item.overview,
    rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
    mediaType: item.media_type || (isMovie ? 'movie' : 'tv'),
    genreIds: item.genre_ids || [],
  };
};

// --- MÉTODOS PÚBLICOS ---

export const searchMovies = async ({ search, type, year, genre, page = 1 }) => {
  let endpoint;
  let params = `&page=${page}&include_adult=false`;
  const apiType = type === 'series' ? 'tv' : (type || 'multi');

  if (search) {
    endpoint = `/search/${apiType === 'multi' ? 'multi' : apiType}`;
    params += `&query=${encodeURIComponent(search)}`;
    if (year) {
      const yearParam = apiType === 'tv' ? '&first_air_date_year=' : '&primary_release_year=';
      if (apiType !== 'multi') params += `${yearParam}${year}`;
    }
  } else {
    const targetType = apiType === 'multi' ? 'movie' : apiType;
    endpoint = `/discover/${targetType}`;
    params += '&sort_by=popularity.desc';
    if (year) {
      const yearParam = targetType === 'tv' ? '&first_air_date_year=' : '&primary_release_year=';
      params += `${yearParam}${year}`;
    }
    if (genre) params += `&with_genres=${genre}`;
  }

  const data = await fetchFromApi(endpoint, params);

  if (!data || !data.results) return { results: [], totalPages: 0, totalResults: 0 };

  return {
    results: data.results.filter(item => item.poster_path).map(transformMedia),
    totalPages: Math.min(data.total_pages || 0, 500),
    totalResults: data.total_results || 0
  };
};

export const getMoviesByCategory = async ({ category, type = 'movie' }) => {
  const apiType = type === 'series' ? 'tv' : type;
  let endpoint;
  let params = '';

  if (GENRE_MAP[category.toLowerCase()]) {
    endpoint = `/discover/${apiType}`;
    params = `&sort_by=popularity.desc&with_genres=${GENRE_MAP[category.toLowerCase()]}`;
  } else {
    const safeCat = (apiType === 'tv' && category === 'upcoming') ? 'on_the_air' : category;
    endpoint = `/${apiType}/${safeCat}`;
  }

  const data = await fetchFromApi(endpoint, params);
  return data && data.results ? data.results.map(transformMedia) : [];
};

export const getMovieById = async ({ id, type = 'movie' }) => { 
  const apiType = type === 'series' ? 'tv' : type; 
  
  const append = '&append_to_response=credits,videos,recommendations';
  
  const data = await fetchFromApi(`/${apiType}/${id}`, append);
  
  const reviewsData = await fetchFromApi(`/${apiType}/${id}/reviews`, '', null);

  if (!data) throw new Error('Contenido no encontrado');

  const isTv = apiType === 'tv';
  const baseData = transformMedia({ ...data, media_type: isTv ? 'tv' : 'movie' });

  const trailer = data.videos?.results?.find(
    v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  const reviews = reviewsData?.results?.filter(r => r.content).slice(0, 10).map(r => ({
      author: r.author,
      content: r.content,
      rating: r.author_details?.rating
  })) || [];

  let recommendations = data.recommendations?.results?.slice(0, 5).map(transformMedia) || [];

  if (recommendations.length === 0 && data.genres && data.genres.length > 0) {
    try {
      const mainGenreId = data.genres[0].id;
      
      const fallbackData = await fetchFromApi(
        `/discover/${apiType}`, 
        `&with_genres=${mainGenreId}&sort_by=popularity.desc`
      );

      if (fallbackData?.results) {
        recommendations = fallbackData.results
          .filter(item => item.id !== parseInt(id))
          .slice(0, 5)
          .map(transformMedia);
      }
    } catch (e) {
      console.warn("Error fetching fallback recommendations", e);
    }
  }

  return {
    ...baseData,
    director: data.credits?.crew?.find(p => p.job === 'Director')?.name || 'Desconocido',
    actors: data.credits?.cast?.slice(0, 6).map(a => ({
      name: a.name,
      character: a.character,
      photo: a.profile_path ? `${IMG_BASE}${a.profile_path}` : null
    })) || [],
    runtime: data.runtime ? `${data.runtime} min` : (data.episode_run_time?.[0] ? `${data.episode_run_time[0]} min` : 'N/A'),
    genres: data.genres?.map(g => g.name).join(', '),
    trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
    reviews,
    recommendations,
    isTv
  };
};