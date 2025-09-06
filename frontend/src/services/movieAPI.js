import api from "./api";

// Movie API endpoints
export const movieAPI = {
  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.post("/movies/search", { query, page });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get(`/movies/popular?page=${page}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
