import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import {
  getPosterUrl,
  formatReleaseDate,
  formatVoteAverage,
} from "../../utils/helpers";
import Loading from "../common/Loading";

const MovieList = ({ movies = [] }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No movies added yet
        </h3>
        <p className="text-white/70 text-sm">
          Search for movies and add them to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Movies in Session</h3>
        <span className="text-white/70 text-sm">
          {movies.length} movie{movies.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {movies.map((movie, index) => (
          <MovieListItem key={movie.tmdbId} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
};

const MovieListItem = ({ movie, index }) => {
  const { removeMovieFromSession, session, isLoading } = useSession();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveMovie = async () => {
    if (!session?.isActive) return;

    try {
      setIsRemoving(true);
      await removeMovieFromSession(movie.tmdbId);
    } catch (error) {
      console.error("Failed to remove movie:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
      {/* Movie Number */}
      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {index + 1}
      </div>

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
        <div className="flex items-center space-x-3 mt-1">
          {movie.isManual ? (
            <span className="text-blue-400 text-xs">📝 Manual Entry</span>
          ) : (
            <span className="text-yellow-400 text-xs">
              ⭐ {formatVoteAverage(movie.voteAverage)}
            </span>
          )}
          <span className="text-white/50 text-xs">
            Added by {movie.addedBy}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      {session?.isActive && (
        <div className="flex-shrink-0">
          <button
            onClick={handleRemoveMovie}
            disabled={isRemoving || isLoading}
            className="text-red-400 hover:text-red-300 transition-colors p-1 rounded hover:bg-red-400/10"
            title="Remove movie from session"
          >
            {isRemoving ? (
              <Loading size="small" text="" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Status Indicator */}
      <div className="flex-shrink-0">
        <div
          className="w-3 h-3 bg-green-400 rounded-full"
          title="Added to session"
        />
      </div>
    </div>
  );
};

export default MovieList;
