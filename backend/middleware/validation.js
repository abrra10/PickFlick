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
    .notEmpty()
    .withMessage("Movie ID is required")
    .custom((value) => {
      // Allow both numeric TMDB IDs and manual IDs (strings starting with "manual_")
      if (typeof value === "number" && value > 0) return true;
      if (typeof value === "string" && value.startsWith("manual_")) return true;
      throw new Error("Movie ID must be a positive integer or a manual ID");
    }),
  body("title")
    .notEmpty()
    .withMessage("Movie title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("overview").notEmpty().withMessage("Movie overview is required"),
  body("posterPath")
    .optional()
    .custom((value) => {
      // Allow null, undefined, or valid string
      if (value === null || value === undefined || value === "") return true;
      if (typeof value === "string") return true;
      throw new Error("Poster path must be a string or null");
    }),
  body("releaseDate")
    .optional()
    .custom((value) => {
      // Allow null, undefined, or valid date string
      if (value === null || value === undefined || value === "") return true;
      if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}$/))
        return true;
      throw new Error("Release date must be in YYYY-MM-DD format or null");
    }),
  body("voteAverage")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Vote average must be between 0 and 10"),
  body("addedBy")
    .notEmpty()
    .withMessage("Added by field is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Added by must be between 1 and 50 characters"),
  body("isManual")
    .optional()
    .isBoolean()
    .withMessage("isManual must be a boolean"),
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
