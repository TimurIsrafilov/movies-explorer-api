const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_PROD_SECRET } = process.env;
const { AUTH_REQUIRED, JWT_DEV_SECRET } = require('../utils/constants');

const AuthorizationError = require('../errors/authorization-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError(AUTH_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_PROD_SECRET : JWT_DEV_SECRET,
    );
  } catch (err) {
    return next(new AuthorizationError(AUTH_REQUIRED));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
