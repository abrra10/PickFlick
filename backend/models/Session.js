const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
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
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  voteAverage: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
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
