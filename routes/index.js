const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const jwtVerify = require('../middlewares/auth');
const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');
const { ResourceNotFound } = require('../configs/constants');
const ErrorNotFound = require('../errors/error-not-found');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { signup, signin } = require('../middlewares/celebrate');

router.use(requestLogger);

router.post('/signin', celebrate(signin), login);
router.post('/signup', celebrate(signup), createUser);

router.use(jwtVerify);
router.use('/', usersRouter);
router.use('/', articlesRouter);
router.use('/*', (req, res, next) => {
  const err = new ErrorNotFound(ResourceNotFound);
  next(err);
});

router.use(errorLogger);

module.exports = router;
