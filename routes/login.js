// POST /signup - # создаёт пользователя с переданными в теле email, password и name
// POST /signin - # проверяет переданные в теле почту и пароль и возвращает JWT

const { errors } = require('celebrate');
const loginRouter = require('express').Router();

const { createUserValidation, loginValidation } = require('../utils/validation');

const {
  createUser,
  login,
} = require('../controllers/users');

loginRouter.post('/signup', createUserValidation, createUser);
loginRouter.post('/signin', loginValidation, login);

loginRouter.use(errors());

module.exports = loginRouter;
