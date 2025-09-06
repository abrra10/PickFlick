import React from "react";

const Loading = ({ size = "medium", text = "Loading...", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-white/20 border-t-primary-500`}
      ></div>
      {text && (
        <p className="text-white/80 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
