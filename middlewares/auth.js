const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');
const { errorMessages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(errorMessages.authErr);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'placeholder'}`);
  } catch (err) {
    throw new AuthorizationError(errorMessages.authErr);
  }

  req.user = payload;

  next();
};
