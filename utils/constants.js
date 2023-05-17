const NOT_CORRECT_DATA = 'переданы некорректные данные';
const NOT_FOUND_FILM_WITH_ID = 'не найден фильм с указанным id:';
const NOT_FOUND_USER_WITH_ID = 'не найден пользователь с указанным id:';
const USER_EXISTS = 'пользователь существует';
const NO_PERMISSION_FOR_DELETE = 'нельзя удалить чужой фильм';
const WRONG_EMAIL_OR_PASSWORD = 'неправильные почта или пароль';
const SERVER_ERR = 'на сервере произошла ошибка';
const AUTH_REQUIRED = 'необходима авторизация';
const URL_REQUIRED = 'необходимо ввести URL';
const EMAIL_REQUIRED = 'необходимо ввести email';
const NOT_FOUND_PAGE = 'запрошенная страница не найдена';

const LIMITER_ERR = 'Too many request from this IP';

const DB_DEV_URL = 'mongodb://127.0.0.1:27017/diplomadb';
const APP_LISTENS = 'App listening on port';
const DEV_PORT = '3000';
const CODE_RUNS = 'Code run in';
const PROD_MODE = 'production mode';
const DEV_MODE = 'dev mode';
const JWT_DEV_SECRET = 'dev-secret';
const JWT_LIVE_PERIOD = '7d';

const linkPattern = /(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/;

const HTTP_BACK_URL = 'http://movies-explorer-itf.nomoredomains.monster';
const HTTPS_BACK_URL = 'https://movies-explorer-itf.nomoredomains.monster';

module.exports = {
  NOT_CORRECT_DATA,
  NOT_FOUND_FILM_WITH_ID,
  NOT_FOUND_USER_WITH_ID,
  USER_EXISTS,
  NO_PERMISSION_FOR_DELETE,
  WRONG_EMAIL_OR_PASSWORD,
  SERVER_ERR,
  AUTH_REQUIRED,
  URL_REQUIRED,
  EMAIL_REQUIRED,
  NOT_FOUND_PAGE,
  LIMITER_ERR,
  DB_DEV_URL,
  APP_LISTENS,
  DEV_PORT,
  CODE_RUNS,
  PROD_MODE,
  DEV_MODE,
  JWT_DEV_SECRET,
  JWT_LIVE_PERIOD,
  linkPattern,
  HTTP_BACK_URL,
  HTTPS_BACK_URL,
};
