const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, SECRET_JWT } = process.env;

module.exports.auth = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_JWT : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
