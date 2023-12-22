const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');

const auth = require('../middlewares/auth');

const { NOT_FOUND_PAGE } = require('../utils/constants');

const loginRouter = require('./login');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('', loginRouter);

// авторизация
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE));
});

module.exports = router;
