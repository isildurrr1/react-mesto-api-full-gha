const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(JWT_SECRET);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Ошибка авторизации1'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log(JWT_SECRET);
  try {
    console.log(JWT_SECRET);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-jwt-token');
  } catch (err) {
    console.log(JWT_SECRET);
    return next(new AuthError('Ошибка авторизации2'));
  }
  req.user = payload;
  return next();
};
