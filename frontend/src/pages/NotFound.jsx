import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-6">🎬</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-white/70 text-lg mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate("/")} className="btn-primary">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
