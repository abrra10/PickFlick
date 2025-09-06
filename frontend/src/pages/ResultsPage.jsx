import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import {
  getPosterUrl,
  getBackdropUrl,
  formatReleaseDate,
  formatVoteAverage,
  formatRuntime,
} from "../utils/helpers";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

const ResultsPage = () => {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const { session, isLoading, error, joinSession, clearError } = useSession();

  // Join session on mount if not already joined
  useEffect(() => {
    if (sessionCode && !session) {
      joinSession(sessionCode).catch((error) => {
        console.error("Failed to join session:", error);
      });
    }
  }, [sessionCode, session, joinSession]);

  if (isLoading && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="large" text="Loading results..." />
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onDismiss={clearError} />
          <button
            onClick={() => navigate("/")}
            className="btn-primary w-full mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!session || !session.selectedMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-2xl font-bold text-white mb-4">
            No movie selected yet
          </h1>
          <p className="text-white/70 mb-6">
            This session hasn't selected a movie yet.
          </p>
          <button
            onClick={() => navigate(`/session/${sessionCode}`)}
            className="btn-primary"
          >
            Go to Session
          </button>
        </div>
      </div>
    );
  }

  const selectedMovie = session.selectedMovie;
  const allMovies = session.movies || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-movie-900 via-movie-800 to-movie-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Celebration Header */}
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Movie Selected!
            </h1>
            <p className="text-white/80 text-lg">
              The random selection has chosen your movie for tonight
            </p>
          </div>

          {/* Selected Movie Card */}
          <div className="card max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="md:col-span-1">
                {selectedMovie.isManual ? (
                  <div className="w-full h-96 bg-white/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-white/60 mx-auto mb-4"
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
                      <p className="text-white/60 text-sm">Manual Entry</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getPosterUrl(selectedMovie.posterPath, "LARGE")}
                    alt={selectedMovie.title}
                    className="w-full rounded-lg shadow-2xl"
                    onError={(e) => {
                      e.target.src = "/placeholder-poster.jpg";
                    }}
                  />
                )}
              </div>

              {/* Movie Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedMovie.title}
                  </h2>
                  <p className="text-white/70 text-lg">
                    {formatReleaseDate(selectedMovie.releaseDate)}
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  {selectedMovie.isManual ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 text-xl">📝</span>
                      <span className="text-white font-semibold">
                        Manual Entry
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 text-xl">⭐</span>
                      <span className="text-white font-semibold">
                        {formatVoteAverage(selectedMovie.voteAverage)}/10
                      </span>
                    </div>
                  )}
                  {selectedMovie.runtime && (
                    <div className="flex items-center space-x-2">
                      <span className="text-white/70">⏱️</span>
                      <span className="text-white">
                        {formatRuntime(selectedMovie.runtime)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Overview
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {selectedMovie.overview}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-white/70">Added by:</span>
                  <span className="text-white font-medium">
                    {selectedMovie.addedBy}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* All Movies List */}
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">
              All Movies in Session
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allMovies.map((movie, index) => (
                <div
                  key={movie.tmdbId}
                  className={`p-4 rounded-lg border transition-all ${
                    movie.tmdbId === selectedMovie.tmdbId
                      ? "bg-green-500/20 border-green-500/50 ring-2 ring-green-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={getPosterUrl(movie.posterPath, "SMALL")}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/placeholder-poster.jpg";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">
                        {movie.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {formatReleaseDate(movie.releaseDate)}
                      </p>
                      <p className="text-white/60 text-xs">
                        Added by {movie.addedBy}
                      </p>
                      {movie.tmdbId === selectedMovie.tmdbId && (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          🎉 Selected!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button onClick={() => navigate("/")} className="btn-primary">
              Start New Session
            </button>
            <button
              onClick={() => navigate(`/session/${sessionCode}`)}
              className="btn-secondary"
            >
              View Session
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
