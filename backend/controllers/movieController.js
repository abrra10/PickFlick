const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
} = require("../utils/movieAPI");

const searchMoviesController = async (req, res) => {
  try {
    const { query, page = 1 } = req.body;

    const results = await searchMovies(query, page);

    // Transform the results to match our movie schema
    const transformedResults = results.results.map((movie) => ({
      tmdbId: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    }));

    res.json({
      success: true,
      data: {
        movies: transformedResults,
        totalPages: results.total_pages,
        totalResults: results.total_results,
        currentPage: results.page,
      },
    });
  } catch (error) {
    console.error("Search movies error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search movies",
      error: error.message,
    });
  }
};

const getMovieDetailsController = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movieDetails = await getMovieDetails(movieId);

    // Transform the result to match our movie schema
    const transformedMovie = {
      tmdbId: movieDetails.id,
      title: movieDetails.title,
      overview: movieDetails.overview,
      posterPath: movieDetails.poster_path,
      releaseDate: movieDetails.release_date,
      voteAverage: movieDetails.vote_average,
      runtime: movieDetails.runtime,
      genres: movieDetails.genres,
      originalLanguage: movieDetails.original_language,
      popularity: movieDetails.popularity,
    };

    res.json({
      success: true,
      data: transformedMovie,
    });
  } catch (error) {
    console.error("Get movie details error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get movie details",
      error: error.message,
    });
  }
};

const getPopularMoviesController = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const results = await getPopularMovies(page);

    // Transform the results to match our movie schema
    const transformedResults = results.results.map((movie) => ({
      tmdbId: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    }));

    res.json({
      success: true,
      data: {
        movies: transformedResults,
        totalPages: results.total_pages,
        totalResults: results.total_results,
        currentPage: results.page,
      },
    });
  } catch (error) {
    console.error("Get popular movies error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get popular movies",
      error: error.message,
    });
  }
};

module.exports = {
  searchMoviesController,
  getMovieDetailsController,
  getPopularMoviesController,
};
