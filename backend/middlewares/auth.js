const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'JWT_SECRET');
  } catch (err) {
    return next(new AuthError('jwt token is not valid'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
