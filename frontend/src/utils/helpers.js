import { TMDB_CONFIG, VALIDATION_RULES } from "./constants";

// Validation helpers
export const validateSessionCode = (code) => {
  return VALIDATION_RULES.SESSION_CODE.test(code);
};

export const validateUsername = (username) => {
  return (
    username &&
    username.length >= VALIDATION_RULES.USERNAME.MIN_LENGTH &&
    username.length <= VALIDATION_RULES.USERNAME.MAX_LENGTH
  );
};

export const validateSearchQuery = (query) => {
  return (
    query &&
    query.length >= VALIDATION_RULES.SEARCH_QUERY.MIN_LENGTH &&
    query.length <= VALIDATION_RULES.SEARCH_QUERY.MAX_LENGTH
  );
};

// TMDB image helpers
export const getPosterUrl = (posterPath, size = "MEDIUM") => {
  if (!posterPath)
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0xNTAgMjAwTDEyMCAyNDBIMTgwTDE1MCAyMDBaIiBmaWxsPSIjNjY2NjY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.POSTER_SIZES[size]}${posterPath}`;
};

export const getBackdropUrl = (backdropPath, size = "LARGE") => {
  if (!backdropPath)
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjgwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iNzIwIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik02NDAgMzYwTDUxMiA0MzJINzY4TDY0MCAzNjBaIiBmaWxsPSIjNjY2NjY2Ii8+Cjx0ZXh0IHg9IjY0MCIgeT0iNTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.BACKDROP_SIZES[size]}${backdropPath}`;
};

// Format helpers
export const formatReleaseDate = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatVoteAverage = (voteAverage) => {
  if (!voteAverage) return "N/A";
  return voteAverage.toFixed(1);
};

export const formatRuntime = (minutes) => {
  if (!minutes) return "Unknown";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

// Session helpers
export const generateSessionCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// URL helpers
export const createSessionUrl = (sessionCode) => {
  return `/session/${sessionCode}`;
};

export const createResultsUrl = (sessionCode) => {
  return `/results/${sessionCode}`;
};

// Local storage helpers
export const getStoredUsername = () => {
  return localStorage.getItem("pickflick_username") || "";
};

export const setStoredUsername = (username) => {
  localStorage.setItem("pickflick_username", username);
};

export const getStoredSessionCode = () => {
  return localStorage.getItem("pickflick_session_code") || "";
};

export const setStoredSessionCode = (sessionCode) => {
  localStorage.setItem("pickflick_session_code", sessionCode);
};

// Debounce helper
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Error handling helpers
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.data?.message) return error.data.message;
  return "An unexpected error occurred";
};

// Array helpers
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
