
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  searchMovies,
  IMAGE_BASE,
  getAIRecommendations,
} from "../api/tmdb";
import useDebounce from "../hooks/useDebounce";
import Loader from "../components/Loader";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  const [aiMovies, setAiMovies] = useState([]);

  useEffect(() => {
    async function run() {
      if (debouncedQuery.length < 2) {
        setMovies([]);
        setAiMovies([]);
        return;
      }

      setLoading(true);
      const results = await searchMovies(debouncedQuery);
      setMovies(results.slice(0, 12));
      setLoading(false);

      // save recent search
      if (!recent.includes(debouncedQuery)) {
        const updated = [debouncedQuery, ...recent].slice(0, 6);
        setRecent(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }

      // AI recommendations
      if (results[0]?.genre_ids?.length) {
        const ai = await getAIRecommendations(results[0].genre_ids);
        setAiMovies(ai.slice(0, 6));
      }
    }

    run();
    // eslint-disable-next-line
  }, [debouncedQuery]);

  return (
    <div className="page">
      <h1>Search Movies</h1>

      <input
        className="search-input"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* RECENT SEARCHES */}
      {recent.length > 0 && (
        <div className="recent-box">
          <div className="recent-header">
            <span>Recent Searches</span>
            <button
              onClick={() => {
                setRecent([]);
                localStorage.removeItem("recentSearches");
              }}
            >
              Clear
            </button>
          </div>

          <div className="recent-list">
            {recent.map((item) => (
              <button
                key={item}
                className="recent-chip"
                onClick={() => setQuery(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loader />}

      {/* SEARCH RESULTS */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
          >
            <div className="movie-card">
              <div className="poster-wrapper">
                {movie.poster_path && (
                  <img
                    src={IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                  />
                )}
                <div className="movie-title">{movie.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* AI RECOMMENDATIONS */}
      {aiMovies.length > 0 && (
        <>
          <h2 style={{ marginTop: "60px" }}>
            AI Recommended For You 🤖
          </h2>

          <div className="movie-grid">
            {aiMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
              >
                <div className="movie-card">
                  <div className="poster-wrapper">
                    {movie.poster_path && (
                      <img
                        src={IMAGE_BASE + movie.poster_path}
                        alt={movie.title}
                      />
                    )}
                    <div className="movie-title">
                      {movie.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}