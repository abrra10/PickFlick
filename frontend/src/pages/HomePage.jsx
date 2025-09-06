import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { validateSessionCode, validateUsername } from "../utils/helpers";
import { ERROR_MESSAGES } from "../utils/constants";
import ErrorMessage from "../components/common/ErrorMessage";
import Loading from "../components/common/Loading";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    createSession,
    joinSession,
    isLoading,
    error,
    clearError,
    setUsername,
    username,
  } = useSession();
  const [sessionCode, setSessionCode] = useState("");
  const [localUsername, setLocalUsername] = useState(username);
  const [validationError, setValidationError] = useState("");

  const handleCreateSession = async () => {
    if (!validateUsername(localUsername)) {
      setValidationError(ERROR_MESSAGES.USERNAME_REQUIRED);
      return;
    }

    try {
      setValidationError("");
      clearError();
      setUsername(localUsername);
      const sessionCode = await createSession();
      // Navigate to the session page
      navigate(`/session/${sessionCode}`);
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  const handleJoinSession = async () => {
    if (!validateUsername(localUsername)) {
      setValidationError(ERROR_MESSAGES.USERNAME_REQUIRED);
      return;
    }

    if (!validateSessionCode(sessionCode)) {
      setValidationError(ERROR_MESSAGES.INVALID_SESSION_CODE);
      return;
    }

    try {
      setValidationError("");
      clearError();
      setUsername(localUsername);
      await joinSession(sessionCode);
      // Navigate to the session page
      navigate(`/session/${sessionCode}`);
    } catch (error) {
      console.error("Failed to join session:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title, Description & How it Works */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-5xl font-knewave text-white mb-6">
                PickFlick
              </h1>
              <p className="text-white/80 text-xl leading-relaxed">
                Collaborative movie selection for roommates. No more endless
                debates about what to watch!
              </p>
            </div>

            {/* How it works */}
            <div className="card">
              <h3 className="text-2xl font-semibold text-white mb-6">
                How it works
              </h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      Create or Join Session
                    </h4>
                    <p className="text-white/70 text-sm">
                      Start a new session or join an existing one with a unique
                      6-character code
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <div>
                    <h4 className="text-white font-medium mb-1">Add Movies</h4>
                    <p className="text-white/70 text-sm">
                      Search and add movies to your shared list. Everyone can
                      contribute!
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Pick & Watch
                    </h4>
                    <p className="text-white/70 text-sm">
                      When ready, randomly select a movie and enjoy your movie
                      night!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="card">
            <div className="space-y-6">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Your Name
                </label>
                <input
                  id="username"
                  type="text"
                  value={localUsername}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field"
                  maxLength={50}
                />
              </div>

              {/* Create Session */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Create New Session
                  </h2>
                  <p className="text-white/70 text-sm">
                    Start a new movie selection session
                  </p>
                </div>

                <button
                  onClick={handleCreateSession}
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? (
                    <Loading size="small" text="" />
                  ) : (
                    "Create Session"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">or</span>
                </div>
              </div>

              {/* Join Session */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Join Existing Session
                  </h2>
                  <p className="text-white/70 text-sm">
                    Enter a 6-character session code
                  </p>
                </div>

                <input
                  type="text"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                  placeholder="Enter session code"
                  className="input-field text-center font-mono text-lg tracking-wider"
                  maxLength={6}
                />

                <button
                  onClick={handleJoinSession}
                  disabled={isLoading}
                  className="btn-secondary w-full"
                >
                  {isLoading ? (
                    <Loading size="small" text="" />
                  ) : (
                    "Join Session"
                  )}
                </button>
              </div>

              {/* Error Messages */}
              {(error || validationError) && (
                <ErrorMessage
                  message={error || validationError}
                  onDismiss={() => {
                    clearError();
                    setValidationError("");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
