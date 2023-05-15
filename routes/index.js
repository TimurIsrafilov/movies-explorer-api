const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрошенная страница не найдена'));
});

module.exports = router;
