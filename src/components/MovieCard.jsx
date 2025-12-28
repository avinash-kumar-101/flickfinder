
import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : null;

  const fav = isFavorite(movie.id);

  function handleFavorite(e) {
    e.preventDefault(); // 🔥 Link click block
    e.stopPropagation();

    fav ? removeFavorite(movie.id) : addFavorite(movie);
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="movie-card">
        <div className="poster-wrapper">

          {/* ❤️ FAVORITE BUTTON */}
          <button
            className="fav-btn"
            onClick={handleFavorite}
            title={fav ? "Remove from favorites" : "Add to favorites"}
          >
            {fav ? "❤️" : "🤍"}
          </button>

          {movie.poster_path ? (
            <img
              src={IMAGE_BASE + movie.poster_path}
              alt={movie.title}
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#020617",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              No Image
            </div>
          )}

          {/* ⭐ Rating */}
          {rating && (
            <div
              className={`rating-badge ${
                rating >= 7
                  ? "high"
                  : rating >= 5
                  ? "mid"
                  : "low"
              }`}
            >
              ⭐ {rating}
            </div>
          )}

          {/* 🎬 Title */}
          <div className="movie-title">
            {movie.title}
          </div>
        </div>
      </div>
    </Link>
  );
}