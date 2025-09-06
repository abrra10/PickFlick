import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const ManualMovieEntry = ({ onClose, onSuccess }) => {
  const { addMovieToSession, isLoading, error, clearError } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    description: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationError) setValidationError("");
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setValidationError("Movie title is required");
      return false;
    }
    if (
      formData.year &&
      (isNaN(formData.year) ||
        formData.year < 1888 ||
        formData.year > new Date().getFullYear() + 2)
    ) {
      setValidationError("Please enter a valid year");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Create a manual movie object
      const manualMovie = {
        tmdbId: `manual_${Date.now()}`, // Unique ID for manual entries
        title: formData.title.trim(),
        overview: formData.description.trim() || "No description available",
        posterPath: null, // No poster for manual entries
        releaseDate: formData.year ? `${formData.year}-01-01` : null,
        voteAverage: 0, // Default rating
        addedBy: "manual", // Indicate this was manually added
        isManual: true, // Flag to identify manual entries
      };

      await addMovieToSession(manualMovie);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Failed to add manual movie:", err);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Add Movie Manually</h3>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
          title="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Movie Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white mb-2"
          >
            Movie Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter movie title"
            className="input-field"
            maxLength={100}
            required
          />
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-white mb-2"
          >
            Year (Optional)
          </label>
          <input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="e.g., 2023"
            className="input-field"
            min="1888"
            max={new Date().getFullYear() + 2}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white mb-2"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief description of the movie..."
            className="input-field resize-none"
            rows={3}
            maxLength={500}
          />
        </div>

        {/* Error Messages */}
        {(error || validationError) && (
          <ErrorMessage
            message={error || validationError}
            onDismiss={() => {
              clearError();
              setValidationError("");
            }}
          />
        )}

        {/* Submit Button */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={isLoading}
          >
            {isLoading ? <Loading size="small" text="" /> : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualMovieEntry;
