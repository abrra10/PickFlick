const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const selectRandomMovie = (movies) => {
  if (!movies || movies.length === 0) {
    throw new Error("No movies available for selection");
  }

  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

module.exports = {
  shuffleArray,
  selectRandomMovie,
};
