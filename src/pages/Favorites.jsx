import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../api/tmdb";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }
   
  if (favorites.length === 0) {
    return (
      <div className="page">
        <h1>Favorites</h1>
        <p>No favorite movies yet ⭐</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Favorites</h1>
      <p>Your saved movies</p>

      <div className="movie-grid">
        {favorites.map((movie) => (
          <div key={movie.id} className="movie-grid-item">
            <div className="movie-card">
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="poster-wrapper">
                  <img
                    src={IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                  />

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
                </div>
              </Link>

              {/* TITLE */}
              <div
                style={{
                  padding: "10px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {movie.title}
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFavorite(movie.id)}
                style={{
                  margin: "0 12px 12px",
                  padding: "8px",
                  borderRadius: "10px",
                  border: "1px solid #1e293b",
                  background: "#020617",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


