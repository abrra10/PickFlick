import React, { useState, useEffect } from "react";
import { movieAPI } from "../../services/movieAPI";
import { useSession } from "../../context/SessionContext";
import {
  debounce,
  getPosterUrl,
  formatReleaseDate,
  formatVoteAverage,
} from "../../utils/helpers";
import { APP_CONFIG } from "../../utils/constants";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import ManualMovieEntry from "./ManualMovieEntry";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await movieAPI.searchMovies(searchQuery, pageNum);
      const newResults = response.data.movies;

      if (pageNum === 1) {
        setResults(newResults);
      } else {
        setResults((prev) => [...prev, ...newResults]);
      }

      setHasMore(response.data.currentPage < response.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      setError(error.message || "Failed to search movies");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, APP_CONFIG.DEBOUNCE_DELAY);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    debouncedSearch(value, 1);
  };

  // Load more results
  const loadMore = () => {
    if (!isLoading && hasMore && query.trim()) {
      debouncedSearch(query, page + 1);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
    setPage(1);
    setHasMore(false);
    setShowManualEntry(false);
  };

  // Handle manual entry success
  const handleManualEntrySuccess = () => {
    setShowManualEntry(false);
    setQuery(""); // Clear search to show the added movie in the list
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          className="input-field pr-10"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Loading State */}
      {isLoading && results.length === 0 && (
        <div className="flex justify-center py-8">
          <Loading size="medium" text="Searching movies..." />
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Search Results</h3>
            <span className="text-white/70 text-sm">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((movie) => (
              <MovieSearchResult key={movie.tmdbId} movie={movie} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="btn-secondary w-full"
            >
              {isLoading ? (
                <Loading size="small" text="Loading more..." />
              ) : (
                "Load More"
              )}
            </button>
          )}
        </div>
      )}

      {/* No Results */}
      {query && !isLoading && results.length === 0 && !error && (
        <div className="text-center py-8 space-y-4">
          <div>
            <p className="text-white/70 mb-2">No movies found for "{query}"</p>
            <p className="text-white/50 text-sm">
              Try different keywords or check the spelling
            </p>
          </div>

          <button
            onClick={() => setShowManualEntry(true)}
            className="btn-secondary"
          >
            Can't find your movie? Add it manually
          </button>
        </div>
      )}

      {/* Manual Entry Form */}
      {showManualEntry && (
        <ManualMovieEntry
          onClose={() => setShowManualEntry(false)}
          onSuccess={handleManualEntrySuccess}
        />
      )}
    </div>
  );
};

// Movie Search Result Component
const MovieSearchResult = ({ movie }) => {
  const { addMovieToSession, session } = useSession();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Check if movie is already in session
  useEffect(() => {
    const exists = session?.movies?.some((m) => m.tmdbId === movie.tmdbId);
    setIsAdded(exists);
  }, [session?.movies, movie.tmdbId]);

  const handleAddMovie = async () => {
    try {
      setIsAdding(true);
      await addMovieToSession(movie);
      setIsAdded(true);
    } catch (error) {
      console.error("Failed to add movie:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
      {/* Movie Poster */}
      <div className="flex-shrink-0">
        {movie.isManual ? (
          <div className="w-12 h-18 bg-white/10 rounded flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 110 2h-1v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6H4a1 1 0 110-2h3zM9 6v10h6V6H9z"
              />
            </svg>
          </div>
        ) : (
          <img
            src={getPosterUrl(movie.posterPath, "SMALL")}
            alt={movie.title}
            className="w-12 h-18 object-cover rounded"
            onError={(e) => {
              e.target.src = "/placeholder-poster.jpg";
            }}
          />
        )}
      </div>

      {/* Movie Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate">{movie.title}</h4>
        <p className="text-white/70 text-sm">
          {formatReleaseDate(movie.releaseDate)}
        </p>
        <p className="text-white/60 text-xs truncate">{movie.overview}</p>
        <div className="flex items-center space-x-2 mt-1">
          {movie.isManual ? (
            <span className="text-blue-400 text-xs">📝 Manual Entry</span>
          ) : (
            <span className="text-yellow-400 text-xs">
              ⭐ {formatVoteAverage(movie.voteAverage)}
            </span>
          )}
        </div>
      </div>

      {/* Add Button */}
      <div className="flex-shrink-0">
        {isAdded ? (
          <span className="text-green-400 text-sm font-medium">Added ✓</span>
        ) : (
          <button
            onClick={handleAddMovie}
            disabled={isAdding || !session?.isActive}
            className="btn-primary text-sm px-3 py-1"
          >
            {isAdding ? <Loading size="small" text="" /> : "Add"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
