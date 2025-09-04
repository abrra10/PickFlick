const express = require("express");
const router = express.Router();
const {
  createSession,
  getSession,
  addMovieToSession,
  selectMovie,
  deleteSession,
} = require("../controllers/sessionController");
const {
  validateSessionCode,
  validateMovieData,
} = require("../middleware/validation");

// Create a new session
router.post("/", createSession);

// Get session by code
router.get("/:sessionCode", validateSessionCode, getSession);

// Add movie to session
router.post(
  "/:sessionCode/movies",
  validateSessionCode,
  validateMovieData,
  addMovieToSession
);

// Select random movie from session
router.post("/:sessionCode/select", validateSessionCode, selectMovie);

// Delete session
router.delete("/:sessionCode", validateSessionCode, deleteSession);

module.exports = router;
