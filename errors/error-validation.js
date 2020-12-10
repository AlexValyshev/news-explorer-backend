const { errorData } = require('../configs/constants');

const defineValidationError = (err, res) => {
  const listErrors = Object.keys(err.errors);
  const messages = listErrors.map((item) => err.errors[item].message);
  return res.status(400).send({ message: `${errorData} ${messages.join(',  ')}` });
};

module.exports = {
  defineValidationError,
};
