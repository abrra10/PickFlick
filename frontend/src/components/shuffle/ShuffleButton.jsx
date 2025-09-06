import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const ShuffleButton = () => {
  const { selectMovie, session, sessionCode, isLoading, error, clearError } =
    useSession();
  const navigate = useNavigate();
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectMovie = async () => {
    if (!session?.movies?.length) {
      return;
    }

    try {
      setIsSelecting(true);
      clearError();

      await selectMovie();

      // Navigate to results page
      navigate(`/results/${sessionCode}`);
    } catch (error) {
      console.error("Failed to select movie:", error);
    } finally {
      setIsSelecting(false);
    }
  };

  const canSelect =
    session?.movies?.length > 0 &&
    session?.isActive &&
    !isLoading &&
    !isSelecting;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Ready to Pick a Movie?
        </h3>
        <p className="text-white/70 text-sm">
          Randomly select a movie from the {session?.movies?.length || 0} added
          to this session
        </p>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      {/* Shuffle Button */}
      <button
        onClick={handleSelectMovie}
        disabled={!canSelect}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
          canSelect
            ? "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            : "bg-white/10 text-white/50 cursor-not-allowed"
        }`}
      >
        {isSelecting ? (
          <div className="flex items-center justify-center space-x-3">
            <Loading size="small" text="" />
            <span>Selecting Movie...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl">🎲</span>
            <span>Pick a Movie!</span>
          </div>
        )}
      </button>

      {/* Warning Message */}
      {session?.movies?.length === 0 && (
        <div className="text-center">
          <p className="text-yellow-400 text-sm">
            ⚠️ Add at least one movie before selecting
          </p>
        </div>
      )}

      {!session?.isActive && (
        <div className="text-center">
          <p className="text-red-400 text-sm">
            ⚠️ This session is no longer active
          </p>
        </div>
      )}
    </div>
  );
};

export default ShuffleButton;
