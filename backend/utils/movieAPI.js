const axios = require("axios");

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },
});

const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbClient.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: false,
      },
    });

    return response.data;
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    throw new Error("Failed to search movies");
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    throw new Error("Failed to get movie details");
  }
};

const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get("/movie/popular", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    throw new Error("Failed to get popular movies");
  }
};

module.exports = {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
};
