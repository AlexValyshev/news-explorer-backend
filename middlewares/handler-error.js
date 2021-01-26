const { ErrorServer, InvalidData, ConflictEmail } = require('../configs/constants');
const { defineValidationError } = require('../errors/error-validation');

module.exports.handlerErrors = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    defineValidationError(err, res);
  } else if (err.kind === 'ObjectId') {
    const message = `${InvalidData} ${err.path}`;
    const statusCode = 400;
    res.status(statusCode).send({ message });
  } else if (err.code === 11000) {
    const message = ConflictEmail;
    const statusCode = 409;
    res.status(statusCode).send({ message });
  } else {
    const statusCode = err.statusCode || 500;
    const message = err.message || { message: ErrorServer };
    res.status(statusCode).send({ message });
  }
  next();
};
