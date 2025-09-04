const Session = require("../models/Session");
const { generateSessionCode } = require("../utils/generateCode");
const { selectRandomMovie } = require("../utils/shuffle");

const createSession = async (req, res) => {
  try {
    let sessionCode;
    let isUnique = false;

    // Generate unique session code
    while (!isUnique) {
      sessionCode = generateSessionCode();
      const existingSession = await Session.findOne({ sessionCode });
      if (!existingSession) {
        isUnique = true;
      }
    }

    const session = new Session({
      sessionCode,
      movies: [],
    });

    await session.save();

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: {
        sessionCode: session.sessionCode,
        movies: session.movies,
        isActive: session.isActive,
      },
    });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create session",
      error: error.message,
    });
  }
};

const getSession = async (req, res) => {
  try {
    const { sessionCode } = req.params;

    const session = await Session.findOne({
      sessionCode: sessionCode.toUpperCase(),
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Get session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get session",
      error: error.message,
    });
  }
};

const addMovieToSession = async (req, res) => {
  try {
    const { sessionCode } = req.params;
    const movieData = req.body;

    const session = await Session.findOne({
      sessionCode: sessionCode.toUpperCase(),
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (!session.isActive) {
      return res.status(400).json({
        success: false,
        message: "Session is no longer active",
      });
    }

    // Check if movie already exists in session
    const existingMovie = session.movies.find(
      (movie) => movie.tmdbId === movieData.tmdbId
    );

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "Movie already exists in this session",
      });
    }

    session.movies.push(movieData);
    await session.save();

    res.json({
      success: true,
      message: "Movie added to session successfully",
      data: session,
    });
  } catch (error) {
    console.error("Add movie error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add movie to session",
      error: error.message,
    });
  }
};

const selectMovie = async (req, res) => {
  try {
    const { sessionCode } = req.params;

    const session = await Session.findOne({
      sessionCode: sessionCode.toUpperCase(),
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.movies.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No movies available for selection",
      });
    }

    const selectedMovie = selectRandomMovie(session.movies);
    session.selectedMovie = selectedMovie;
    session.isActive = false; // End the session after selection
    await session.save();

    res.json({
      success: true,
      message: "Movie selected successfully",
      data: {
        selectedMovie,
        allMovies: session.movies,
      },
    });
  } catch (error) {
    console.error("Select movie error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to select movie",
      error: error.message,
    });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { sessionCode } = req.params;

    const session = await Session.findOneAndDelete({
      sessionCode: sessionCode.toUpperCase(),
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Delete session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete session",
      error: error.message,
    });
  }
};

module.exports = {
  createSession,
  getSession,
  addMovieToSession,
  selectMovie,
  deleteSession,
};
