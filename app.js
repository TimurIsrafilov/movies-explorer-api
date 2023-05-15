const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config({ path: './.env' });

const { NODE_ENV, PORT, DB_URL } = process.env;
const app = express();

const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const { limiter } = require('./utils/limiter');
const { commonError } = require('./errors/common-error');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

mongoose.connect(`mongodb://127.0.0.1:27017/${DB_URL}`);

app.use(helmet());

app.use(
  cors({
    origin: [
      'http://movies-explorer-itf.nomoredomains.monster',
      'https://movies-explorer-itf.nomoredomains.monster',
    ],
  }),
);
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
app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(commonError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  if (NODE_ENV !== 'production') {
    console.log('Code run in: dev mode');
  } console.log('Code run in: production mode');
});
