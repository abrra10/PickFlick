const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: String, // Changed to String to support manual entries like "manual_1234567890"
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: false, // Made optional for manual entries
    default: null,
  },
  releaseDate: {
    type: String,
    required: false, // Made optional for manual entries
    default: null,
  },
  voteAverage: {
    type: Number,
    required: false, // Made optional for manual entries
    default: 0,
  },
  addedBy: {
    type: String,
    required: true,
  },
  isManual: {
    type: Boolean,
    default: false,
  },
});

const sessionSchema = new mongoose.Schema({
  sessionCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  movies: [movieSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
  selectedMovie: {
    type: movieSchema,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
sessionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
