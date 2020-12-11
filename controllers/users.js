const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user.js');
const { errorUser, errorRegister } = require('../configs/constants');
const ErrorNotFound = require('../errors/error-not-found');
const ErrorData = require('../errors/error-data');
const ErrorAuth = require('../errors/error-auth');

const getUserMe = (req, res, next) => {
  const userMeId = req.user._id;
  User.findById(userMeId)
    .orFail(() => {
      throw new ErrorNotFound(errorUser);
    })
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorAuth(errorRegister);
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorAuth(errorRegister);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({
              _id: user._id,
            },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' });
            return res.send({ token });
          }
          throw new ErrorAuth(errorRegister);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    throw new ErrorData(errorRegister);
  }
  User.create({ email, password, name })
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUserMe,
  login,
  createUser,
};
