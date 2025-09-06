import api from "./api";

// Session API endpoints
export const sessionAPI = {
  // Create a new session
  createSession: async () => {
    try {
      const response = await api.post("/sessions");
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get session by code
  getSession: async (sessionCode) => {
    try {
      const response = await api.get(`/sessions/${sessionCode.toUpperCase()}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Add movie to session
  addMovieToSession: async (sessionCode, movieData) => {
    try {
      const response = await api.post(
        `/sessions/${sessionCode.toUpperCase()}/movies`,
        movieData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Remove movie from session
  removeMovieFromSession: async (sessionCode, movieId) => {
    try {
      const response = await api.delete(
        `/sessions/${sessionCode.toUpperCase()}/movies/${movieId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Select random movie from session
  selectMovie: async (sessionCode) => {
    try {
      const response = await api.post(
        `/sessions/${sessionCode.toUpperCase()}/select`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete session
  deleteSession: async (sessionCode) => {
    try {
      const response = await api.delete(
        `/sessions/${sessionCode.toUpperCase()}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get("/health");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
