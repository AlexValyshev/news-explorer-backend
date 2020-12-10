const { errorServer, errorData, errorEmail } = require('../configs/constants');
const { defineValidationError } = require('../errors/error-validation');

module.exports.handlerErrors = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    defineValidationError(err, res);
  } else if (err.kind === 'ObjectId') {
    const message = `${errorData} ${err.path}`;
    const statusCode = 400;
    res.status(statusCode).send({ message });
  } else if (err.code === 11000) {
    const message = errorEmail;
    const statusCode = 409;
    res.status(statusCode).send({ message });
  } else {
    const statusCode = err.statusCode || 500;
    const message = err.message || { message: errorServer };
    res.status(statusCode).send({ message });
  }
  next();
};
