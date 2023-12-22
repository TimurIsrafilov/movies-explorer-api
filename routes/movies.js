// GET /movies - # возвращает все сохранённые текущим  пользователем фильмы
// POST /movies - # создаёт фильм с переданными в теле data:
// # country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
// DELETE /movies/_id - # удаляет сохранённый фильм по id

const { errors } = require('celebrate');
const moviesRouter = require('express').Router();

const { createMovieValidation, deleteMovieByIDValidation } = require('../utils/validation');

const {
  getMovies,
  createMovie,
  deleteMovieByID,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:movieId', deleteMovieByIDValidation, deleteMovieByID);

moviesRouter.use(errors());

module.exports = moviesRouter;
