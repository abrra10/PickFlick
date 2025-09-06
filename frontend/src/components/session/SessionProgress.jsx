import React from "react";

const SessionProgress = ({ session }) => {
  if (!session) return null;

  const movieCount = session.movies?.length || 0;
  const isActive = session.isActive;
  const hasSelectedMovie = !!session.selectedMovie;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Status Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              hasSelectedMovie
                ? "bg-green-500/20 text-green-400"
                : isActive
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {hasSelectedMovie ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : isActive ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          {/* Status Text */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              {hasSelectedMovie
                ? "Movie Selected!"
                : isActive
                ? "Session Active"
                : "Session Ended"}
            </h2>
            <p className="text-white/70 text-sm">
              {hasSelectedMovie
                ? "A movie has been randomly selected"
                : isActive
                ? `${movieCount} movie${
                    movieCount !== 1 ? "s" : ""
                  } added so far`
                : "This session is no longer active"}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{movieCount}</div>
          <div className="text-white/70 text-sm">movies</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-white/70 mb-2">
          <span>Progress</span>
          <span>{movieCount} movies added</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              hasSelectedMovie
                ? "bg-green-500"
                : movieCount > 0
                ? "bg-primary-500"
                : "bg-white/20"
            }`}
            style={{
              width: hasSelectedMovie
                ? "100%"
                : `${Math.min((movieCount / 10) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionProgress;
