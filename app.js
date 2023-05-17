const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config({ path: './.env' });

const { NODE_ENV, PROD_PORT, DB_PROD_URL } = process.env;

const app = express();

const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  DB_DEV_URL,
  APP_LISTENS,
  DEV_PORT,
  CODE_RUNS,
  PROD_MODE,
  DEV_MODE,
  HTTP_BACK_URL,
  HTTPS_BACK_URL,
} = require('./utils/constants');

const router = require('./routes/index');

const { limiter } = require('./utils/limiter');
const { commonError } = require('./errors/common-error');

mongoose.connect(NODE_ENV === 'production' ? DB_PROD_URL : DB_DEV_URL);

app.use(helmet());
app.use(cors({ origin: [HTTP_BACK_URL, HTTPS_BACK_URL] }));
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(commonError);

app.listen(PROD_PORT, () => {
  console.log(`${APP_LISTENS} ${NODE_ENV === 'production' ? PROD_PORT : DEV_PORT}`);
  console.log(`${CODE_RUNS} ${NODE_ENV === 'production' ? PROD_MODE : DEV_MODE}`);
});
