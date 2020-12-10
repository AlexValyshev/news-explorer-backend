const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { errorAuthorization } = require('../configs/constants');
const ErrorAuth = require('../errors/error-auth');

const jwtVerify = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorAuth(errorAuthorization);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    console.log(err);
    throw new ErrorAuth(errorAuthorization);
  }
  req.user = payload;
  next();
};

module.exports = jwtVerify;
