const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ValidatationError = require('../errors/validation-error');
const PermittionError = require('../errors/permittion-error');

const {
  NOT_CORRECT_DATA,
  NOT_FOUND_FILM_WITH_ID,
  NO_PERMISSION_FOR_DELETE,
} = require('../utils/constants');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

const createMovie = (req, res, next) => Movie.create({
  ...{
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  },
})
  .then((movie) => res.status(201).send(movie))
  .catch((error) => {
    if (error.name === 'ValidationError') {
      return next(new ValidatationError(NOT_CORRECT_DATA));
    } return next(error);
  });

const deleteMovieByID = (req, res, next) => Movie.findById(req.params.movieId)
  .orFail(new NotFoundError(`${NOT_FOUND_FILM_WITH_ID} ${req.params.movieId}`))
  .then((user) => {
    const ownerID = JSON.stringify(req.user._id);
    const userID = JSON.stringify(user.owner);
    if (ownerID !== userID) {
      return next(new PermittionError(NO_PERMISSION_FOR_DELETE));
    } return Movie.findByIdAndRemove(req.params.movieId)
      .orFail(new NotFoundError(`${NOT_FOUND_FILM_WITH_ID} ${req.params.movieId}`))
      .then((movie) => res.send(movie))
      .catch((error) => {
        if (error.name === 'CastError') {
          return next(new ValidatationError(NOT_CORRECT_DATA));
        } return next(error);
      });
  })
  .catch(next);

module.exports = {
  getMovies,
  createMovie,
  deleteMovieByID,
};
