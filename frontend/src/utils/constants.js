// App constants
export const APP_CONFIG = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  SESSION_CODE_LENGTH: 6,
  MAX_MOVIES_PER_SESSION: 20, // Reasonable limit
  POLLING_INTERVAL: 3000, // 3 seconds for real-time updates
  DEBOUNCE_DELAY: 500, // 500ms for search debouncing
};

export const ROUTES = {
  HOME: "/",
  SESSION: "/session/:sessionCode",
  RESULTS: "/results/:sessionCode",
  NOT_FOUND: "/404",
};

export const TMDB_CONFIG = {
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/",
  POSTER_SIZES: {
    SMALL: "w185",
    MEDIUM: "w342",
    LARGE: "w500",
    XLARGE: "w780",
  },
  BACKDROP_SIZES: {
    SMALL: "w300",
    MEDIUM: "w780",
    LARGE: "w1280",
    XLARGE: "original",
  },
};

export const VALIDATION_RULES = {
  SESSION_CODE: /^[A-Z0-9]{6}$/,
  USERNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  },
  SEARCH_QUERY: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
  },
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SESSION_NOT_FOUND: "Session not found. Please check the session code.",
  SESSION_INACTIVE: "This session is no longer active.",
  MOVIE_ALREADY_EXISTS: "This movie is already in the session.",
  NO_MOVIES_AVAILABLE: "No movies available for selection.",
  INVALID_SESSION_CODE:
    "Session code must be 6 characters (letters and numbers only).",
  SEARCH_QUERY_REQUIRED: "Please enter a search term.",
  USERNAME_REQUIRED: "Please enter your name.",
};
