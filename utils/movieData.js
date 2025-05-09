import data from '../data/movies.json';

export const getMovies = () => {
  return data.movies;
};

export const getMovie = (id) => {
  return data.movies.find(movie => movie.id === id);
};

export const getGenres = () => {
  return data.genres;
};

export const getGenre = (id) => {
  return data.genres.find(genre => genre.id === id);
};

export const getDirectors = () => {
  return data.directors;
};

export const getDirector = (id) => {
  return data.directors.find(director => director.id === id);
};

export const getMoviesByGenre = (genreId) => {
  return data.movies.filter(movie => movie.genreId === genreId);
};

export const getMoviesByDirector = (directorId) => {
  return data.movies.filter(movie => movie.directorId === directorId);
};

export const getTrendingMovies = () => {
  return data.movies.filter(movie => movie.rating >= 8.5);
}; 