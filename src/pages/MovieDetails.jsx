
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCast,
  IMAGE_BASE,
} from "../api/tmdb";
import Loader from "../components/Loader";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const movieData = await getMovieDetails(id);
      const castData = await getMovieCast(id);

      setMovie(movieData);
      setCast(castData.slice(0, 12)); // 🔥 top 12 actors
      setLoading(false);
    }
    fetchAll();
  }, [id]);

  if (loading) return <Loader />;
  if (!movie) return null;

  const rating = movie.vote_average?.toFixed(1);
  const ratingClass =
    rating >= 7.5 ? "high" : rating >= 6 ? "mid" : "low";

  return (
    <>
      {/* 🎬 HERO SECTION */}
      <div
        className="movie-hero"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${IMAGE_BASE}${movie.backdrop_path})`
            : "none",
        }}
      >
        <div className="movie-hero-overlay">
          <div className="movie-hero-content">
            <img
              className="movie-hero-poster"
              src={IMAGE_BASE + movie.poster_path}
              alt={movie.title}
            />

            <div className="movie-hero-info">
              <h1>{movie.title}</h1>

              <div className="movie-meta">
                <span className={`rating-badge ${ratingClass}`}>
                  ⭐ {rating}
                </span>
                {movie.release_date && (
                  <span>📅 {movie.release_date.slice(0, 4)}</span>
                )}
                {movie.runtime && (
                  <span>⏱ {movie.runtime} min</span>
                )}
              </div>

              <div className="genre-list">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="genre-chip">
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="movie-overview">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🎭 CAST SECTION */}
      <div className="cast-section">
        <h2>Top Cast</h2>

        <div className="cast-grid">
          {cast.map((actor) => (
            <div className="cast-card" key={actor.cast_id}>
              {actor.profile_path ? (
                <img
                  src={IMAGE_BASE + actor.profile_path}
                  alt={actor.name}
                />
              ) : (
                <div className="cast-placeholder">
                  No Image
                </div>
              )}

              <h4>{actor.name}</h4>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

