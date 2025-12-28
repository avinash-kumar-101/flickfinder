export function buildUserProfile(recentSearches, movies) {
  const genreScore = {};

  movies.forEach((movie) => {
    if (!movie.genre_ids) return;

    movie.genre_ids.forEach((id) => {
      genreScore[id] = (genreScore[id] || 0) + movie.vote_average;
    });
  });

  // top genres
  return Object.entries(genreScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
}