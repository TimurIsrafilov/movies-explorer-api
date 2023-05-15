const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  NOT_CORRECT_DATA,
  NOT_FOUND_USER_WITH_ID,
  USER_EXISTS,
  WRONG_EMAIL_OR_PASSWORD,
} = require('../utils/constants');

const NotFoundError = require('../errors/not-found-error');
const ValidatationError = require('../errors/validation-error');
const DuplicationError = require('../errors/duplication-error');
const AuthorizationError = require('../errors/authorization-error');

const getUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => new NotFoundError(`${NOT_FOUND_USER_WITH_ID} ${req.user._id}`))
  .then((user) => res.send(user))
  .catch(next);

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...{
        email: req.body.email,
        password: hash,
        name: req.body.name,
      },
    }))
    .then(() => res.status(201).send(
      {
        email: req.body.email,
        name: req.body.name,
      },
    ))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidatationError(NOT_CORRECT_DATA));
      } if (error.code === 11000) {
        return next(new DuplicationError(USER_EXISTS));
      } return next(error);
    });
};

const updateUserProfile = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { email: req.body.email, name: req.body.name },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => res.send(user))
  .catch((error) => {
    if (error.name === 'ValidationError') {
      return next(new ValidatationError(NOT_CORRECT_DATA));
    } if (error.code === 11000) {
      return next(new DuplicationError(USER_EXISTS));
    } return next(error);
  });

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(new AuthorizationError(WRONG_EMAIL_OR_PASSWORD))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      return next(new AuthorizationError(WRONG_EMAIL_OR_PASSWORD));
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ user, token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  updateUserProfile,
  login,
};
