
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies, IMAGE_BASE } from "../api/tmdb";
import Loader from "../components/Loader";
import { useFavorites } from "../context/FavoritesContext"; // 🔥 ADD THIS

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // 🔥 ADD THIS

  useEffect(() => {
    getTrendingMovies().then((data) => {
      setMovies(data.slice(0, 20));
      setLoading(false);
    });
  }, []);

  async function openTrailer(movieId) {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await res.json();
    const trailer = data.results.find((v) => v.type === "Trailer");
    if (trailer) setTrailerKey(trailer.key);
  }

  function handleFavorite(e, movie) {
    e.preventDefault();
    e.stopPropagation();

    isFavorite(movie.id)
      ? removeFavorite(movie.id)
      : addFavorite(movie);
  }

  return (
    <div className="page">
      <h1>Discover Movies</h1>
      <p>Trending movies this week</p>

      {loading && <Loader />}

      <div className="movie-grid">
        {movies.map((movie) => {
          const fav = isFavorite(movie.id);

          return (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrapper">

                {/* ❤️ FAVORITE BUTTON */}
                <button
                  className="fav-btn"
                  onClick={(e) => handleFavorite(e, movie)}
                  title={fav ? "Remove from favorites" : "Add to favorites"}
                >
                  {fav ? "❤️" : "🤍"}
                </button>

                {/* ▶ TRAILER BUTTON */}
                <button
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openTrailer(movie.id);
                  }}
                />

                {/* POSTER → DETAILS */}
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                  />
                </Link>

                {/* ⭐ RATING */}
                <div
                  className={`rating-badge ${
                    movie.vote_average >= 7
                      ? "high"
                      : movie.vote_average >= 5
                      ? "mid"
                      : "low"
                  }`}
                >
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>

                <div className="movie-title">{movie.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🎬 TRAILER MODAL */}
      {trailerKey && (
        <div
          className="trailer-backdrop"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="trailer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setTrailerKey(null)}
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}