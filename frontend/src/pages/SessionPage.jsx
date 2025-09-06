import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import {
  getPosterUrl,
  formatReleaseDate,
  formatVoteAverage,
} from "../utils/helpers";
import Header from "../components/common/Header";
import MovieSearch from "../components/movies/MovieSearch";
import MovieList from "../components/movies/MovieList";
import SessionProgress from "../components/session/SessionProgress";
import ShuffleButton from "../components/shuffle/ShuffleButton";
import ErrorMessage from "../components/common/ErrorMessage";
import Loading from "../components/common/Loading";

const SessionPage = () => {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const { session, isLoading, error, joinSession, refreshSession, clearError } =
    useSession();
  const [copied, setCopied] = useState(false);

  const handleCopySessionCode = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy session code:", err);
    }
  };

  // Join session on mount if not already joined
  useEffect(() => {
    if (sessionCode && !session) {
      joinSession(sessionCode).catch((error) => {
        console.error("Failed to join session:", error);
      });
    }
  }, [sessionCode, session, joinSession]);

  // Note: We don't redirect to results automatically anymore
  // Users can view the session even after a movie is selected

  // Set up polling for real-time updates
  useEffect(() => {
    if (!sessionCode || !session) return;

    const interval = setInterval(() => {
      refreshSession();
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [sessionCode, session, refreshSession]);

  if (isLoading && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="large" text="Joining session..." />
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

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="large" text="Loading session..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-movie-900 via-movie-800 to-movie-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Session Progress */}
          <SessionProgress session={session} />

          {/* Error Message */}
          {error && <ErrorMessage message={error} onDismiss={clearError} />}

          {/* Main Content */}
          {session?.selectedMovie ? (
            /* Session Completed - Show Results */
            <div className="text-center space-y-8">
              <div className="card max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Session Completed!
                  </h2>
                  <p className="text-white/70 text-lg">
                    A movie has been selected for your session
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Selected Movie */}
                  <div className="md:col-span-1">
                    {session.selectedMovie?.isManual ? (
                      <div className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 text-white/60 mx-auto mb-2"
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
                        src={getPosterUrl(
                          session.selectedMovie?.posterPath,
                          "LARGE"
                        )}
                        alt={session.selectedMovie?.title}
                        className="w-full rounded-lg shadow-2xl"
                        onError={(e) => {
                          e.target.src = "/placeholder-poster.jpg";
                        }}
                      />
                    )}
                  </div>

                  <div className="md:col-span-2 text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {session.selectedMovie?.title}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {formatReleaseDate(session.selectedMovie?.releaseDate)}
                    </p>
                    <p className="text-white/60 text-sm mb-4">
                      {session.selectedMovie?.overview}
                    </p>
                    <div className="flex items-center space-x-4">
                      {session.selectedMovie?.isManual ? (
                        <span className="text-blue-400 text-sm">
                          📝 Manual Entry
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-sm">
                          ⭐{" "}
                          {formatVoteAverage(
                            session.selectedMovie?.voteAverage
                          )}
                          /10
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate(`/results/${sessionCode}`)}
                    className="btn-primary"
                  >
                    View Full Results
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="btn-secondary"
                  >
                    Start New Session
                  </button>
                </div>
              </div>

              {/* All Movies List */}
              <div className="card max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">
                  All Movies in Session ({session.movies?.length || 0})
                </h3>
                <MovieList movies={session.movies || []} />
              </div>
            </div>
          ) : (
            /* Active Session - Show Search and Management */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Movie Search */}
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Search Movies
                  </h2>
                  <MovieSearch />
                </div>
              </div>

              {/* Right Column - Movie List & Actions */}
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Session Movies
                  </h2>
                  <MovieList movies={session.movies || []} />
                </div>

                {/* Shuffle Button */}
                {(session.movies?.length || 0) > 0 && session?.isActive && (
                  <div className="card">
                    <ShuffleButton />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Session Info */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Session Code: {sessionCode}
                  </h3>
                  <button
                    onClick={handleCopySessionCode}
                    className="text-white/60 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title={copied ? "Copied!" : "Copy session code"}
                  >
                    {copied ? (
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-white/70 text-sm">
                  Share this code with your roommates to join the session
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm">
                  {session.movies?.length || 0} movie
                  {(session.movies?.length || 0) !== 1 ? "s" : ""} added
                </p>
                <p className="text-white/70 text-sm">
                  Status: {session?.isActive ? "Active" : "Completed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionPage;
