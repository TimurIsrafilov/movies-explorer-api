const express = require('express');
const mongoose = require('mongoose');

// const cors = require('cors');
require('dotenv').config({ path: './.env' });

const { PORT = 3001 } = process.env;
const app = express();

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const { limiter } = require('./utils/limiter');
const { linkPattern } = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-error');

mongoose.connect('mongodb://127.0.0.1:27017/diplomadb');

// app.use(cors({ origin: ['http://mesto.itf.nomoredomains.monster', 'https://mesto.itf.nomoredomains.monster'] }));
app.use(express.json());

app.use(requestLogger);
app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
app.use('/*', (req, res, next) => {
  // res.status(NOT_FOUND_ERROR).send({ message: 'Запрошенная страница не найдена' });
  next(new NotFoundError('Запрошенная страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
