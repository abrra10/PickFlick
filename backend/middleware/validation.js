const { body, param, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

const validateSessionCode = [
  param("sessionCode")
    .isLength({ min: 6, max: 6 })
    .withMessage("Session code must be exactly 6 characters")
    .isAlphanumeric()
    .withMessage("Session code must contain only letters and numbers"),
  handleValidationErrors,
];

const validateMovieData = [
  body("tmdbId")
    .isInt({ min: 1 })
    .withMessage("TMDB ID must be a positive integer"),
  body("title")
    .notEmpty()
    .withMessage("Movie title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("overview").notEmpty().withMessage("Movie overview is required"),
  body("posterPath").notEmpty().withMessage("Poster path is required"),
  body("releaseDate").notEmpty().withMessage("Release date is required"),
  body("voteAverage")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Vote average must be between 0 and 10"),
  body("addedBy")
    .notEmpty()
    .withMessage("Added by field is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Added by must be between 1 and 50 characters"),
  handleValidationErrors,
];

const validateSearchQuery = [
  body("query")
    .notEmpty()
    .withMessage("Search query is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSessionCode,
  validateMovieData,
  validateSearchQuery,
};
