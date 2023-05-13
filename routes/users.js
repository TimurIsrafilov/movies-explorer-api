// GET /users/me - # возвращает информацию о пользователе (email и имя)
// PATCH /users/me - # обновляет информацию о пользователе (email и имя)

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const usersRouter = require('express').Router();

const {
  getUser,
  updateUserProfile,
} = require('../controllers/users');

usersRouter.get('/me', getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

usersRouter.use(errors());

module.exports = usersRouter;
