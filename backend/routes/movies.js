const express = require("express");
const router = express.Router();
const {
  searchMoviesController,
  getMovieDetailsController,
  getPopularMoviesController,
} = require("../controllers/movieController");
const { validateSearchQuery } = require("../middleware/validation");

// Search movies
router.post("/search", validateSearchQuery, searchMoviesController);

// Get movie details by ID
router.get("/:movieId", getMovieDetailsController);

// Get popular movies
router.get("/popular", getPopularMoviesController);

module.exports = router;
