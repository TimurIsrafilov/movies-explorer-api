// GET /movies - # возвращает все сохранённые текущим  пользователем фильмы
// POST /movies - # создаёт фильм с переданными в теле data:
// # country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
// DELETE /movies/_id - # удаляет сохранённый фильм по id

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const moviesRouter = require('express').Router();

const { linkPattern } = require('../utils/utils');

const {
  getMovies,
  createMovie,
  deleteMovieByID,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkPattern),
    trailerLink: Joi.string().required().regex(linkPattern),
    thumbnail: Joi.string().required().regex(linkPattern),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
}), deleteMovieByID);

moviesRouter.use(errors());

module.exports = moviesRouter;
