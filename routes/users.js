// GET /users/me - # возвращает информацию о пользователе (email и имя)
// PATCH /users/me - # обновляет информацию о пользователе (email и имя)

const { errors } = require('celebrate');
const usersRouter = require('express').Router();

const { updateUserProfileValidation } = require('../utils/validation');

const {
  getUser,
  updateUserProfile,
} = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUserProfileValidation, updateUserProfile);

usersRouter.use(errors());

module.exports = usersRouter;
