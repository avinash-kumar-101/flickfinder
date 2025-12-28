
// ================= TMDB CONFIG =================
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// ================= SEARCH MOVIES =================
export async function searchMovies(query) {
  if (!query) return [];

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );

  const data = await res.json();
  return data.results || [];
}

// // ================= MOVIE DETAILS =================
// export async function getMovieDetails(id) {
//   if (!id) return null;

//   const res = await fetch(
//     `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
//   );

//   return res.json();
// }

// ================= TRENDING MOVIES =================
export async function getTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await res.json();
  return data.results || [];
}

// ================= MOVIE TRAILER (SAFE, SINGLE) =================
// NOTE: returns FULL trailer object or null
export async function getMovieTrailer(movieId) {
  if (!movieId) return null;

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const data = await res.json();

  return (
    data.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) || null
  );
}

// ================= AI RECOMMENDATIONS =================
// Genre-based smart recommendations
export async function getAIRecommendations(genreIds) {
  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    return [];
  }

  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds.join(
    ","
  )}&sort_by=vote_average.desc&vote_count.gte=200`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results || [];
}





/* ================= 🎭 MOVIE CAST ================= */
export async function getMovieCast(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.cast || [];
}




import { getCache, setCache } from "../utils/cache";

export async function getMovieDetails(id) {
  const cached = getCache(`movie-${id}`);
  if (cached) return cached;

  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  const data = await res.json();

  setCache(`movie-${id}`, data);
  return data;
}