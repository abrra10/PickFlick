import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

const Header = () => {
  const { sessionCode, resetSession, username } = useSession();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopySessionCode = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy session code:", err);
    }
  };

  const handleLeaveSession = () => {
    resetSession();
    navigate("/");
  };

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎬</div>
            <h1 className="text-xl font-knewave font-bold text-white">
              PickFlick
            </h1>
          </div>

          {/* Session Info */}
          {sessionCode && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white/80">
                <span className="font-medium">Session:</span>
                <div className="ml-2 inline-flex items-center space-x-2">
                  <span className="font-mono bg-white/10 px-2 py-1 rounded text-primary-300">
                    {sessionCode}
                  </span>
                  <button
                    onClick={handleCopySessionCode}
                    className="text-white/60 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title={copied ? "Copied!" : "Copy session code"}
                  >
                    {copied ? (
                      <svg
                        className="w-4 h-4 text-green-400"
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
                        className="w-4 h-4"
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
              </div>

              {username && (
                <div className="text-sm text-white/80">
                  <span className="font-medium">User:</span>
                  <span className="ml-2">{username}</span>
                </div>
              )}

              <button
                onClick={handleLeaveSession}
                className="text-white/60 hover:text-white transition-colors text-sm"
                title="Leave session"
              >
                Leave
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
